const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author.js')
const Book = require('./models/book.js')
const User = require('./models/user.js')
const { GraphQLError } = require('graphql/error')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI).then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})

const typeDefs =/* GraphQL */ `
    type Book {
        title: String!,
        published: Int!,
        author: Author!,
        id: ID!
        genres: [String!]
    },

    type Author {
        name: String!,
        born: Int,
        id: ID!,
        bookCount:Int!
    },

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    },

    type Query {
        bookCount: Int!,
        authorCount: Int!,
        allBooks(author: String, genre: String): [Book],
        allAuthors: [Author],
        me: User
    },

    type Mutation {
        addBook(title:String!, author:String!, published: Int!, genres: [String!]): Book,
        editAuthor(name: String!, setBornTo:Int!): Author,
        createUser(username: String!,favoriteGenre: String!): User
        login(username: String!,password: String!): Token
    }
`

const resolvers = {
    Author: {
        bookCount: async (root) => {
            return Book.countDocuments({ author: root._id })
        },
    },

    Query: {
        bookCount: async () => {
            return (await Book.find({})).length
        },
        authorCount: async () => {
            return (await Author.find({})).length
        },
        allBooks: async (root, args) => {
            if (!args.author && !args.genre) {
                return Book.find({}).populate('author')
            }

            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author })
                if (!author) {
                    return null
                }
                return Book.find({ author: author._id, genres: args.genre }).
                    populate('author')
            }

            if (args.author) {
                const author = await Author.findOne({ name: args.author })
                if (!author) {
                    return null
                }
                return Book.find({ author: author._id }).populate('author')
            }

            if (args.genre) {
                return Book.find({ genres: args.genre }).populate('author')
            }
        },
        allAuthors: async () => {
            return Author.find({})
        },
        me: (root, arg, { currentUser }) => {
            return currentUser
        },

    },
    Mutation: {
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('use must login to perform this action',
                    {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                        },
                    })
            }

            let author = await Author.findOne({ name: args.author })

            if (!author) {
                author = new Author({ name: args.author })
                try {
                    await author.save()
                } catch (error) {
                    throw new GraphQLError('create new book failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            error,
                        },
                    })
                }
            }

            const newBook = new Book({
                    title: args.title,
                    published: args.published,
                    genres: args.genres,
                },
            )

            newBook.author = author

            try {
                await newBook.save()
            } catch (error) {
                throw new GraphQLError('create new book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        error,
                    },
                })
            }
            return newBook
        },

        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('use must login to perform this action',
                    {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                        },
                    })
            }
            const author = await Author.findOne({ name: args.name })
            if (!author) {
                return null
            }

            author.born = args.setBornTo
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('failed to edit author', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        error,
                    },
                })
            }
            return author
        },
        createUser: async (root, args) => {
            const newUser = new User(
                { username: args.username, favoriteGenre: args.favoriteGenre })
            try {
                await newUser.save()
            } catch (error) {
                throw new GraphQLError('failed to create new user', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        error,
                    },
                })
            }
            return newUser
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'test') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }
            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET,
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})