import { gql } from '@apollo/client'

export const GET_ALL_AUTHORS = gql`
    query {
        allAuthors {
            name,
            born,
            bookCount,
            id
        }
    }
`

export const GET_ALL_BOOKS = gql`
    query{
        allBooks {
            author {
                name
            }
            title,
            published,
            id,
            genres
        }
    }
`

export const ADD_NEW_BOOK = gql`
    mutation($title: String!, $author: String!, $published: Int!,$genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title,
            author {
                name
            },
            published,
            id,
            genres
        }
    }
`

export const UPDATE_AUTHOR_BIRTHYEAR = gql`
    mutation updateAuthorBirthyear($name:String!, $setBornTo:Int!){
        editAuthor(name: $name, setBornTo: $setBornTo){
            name,
            born,
            bookCount,
            id
        }
    }
`

export const LOGIN = gql`
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const MY_FAVOURITE_GENRE = gql`
    query{
        me {
            favoriteGenre
        }
    }
`

export const GET_ALL_BOOKS_OF_A_GENRE = gql`
    query($genre:String!){
        allBooks(genre: $genre) {
            author {
                name
            }
            title,
            published,
            id,
            genres
        }
    }
`