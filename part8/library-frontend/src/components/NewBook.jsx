import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ADD_NEW_BOOK, GET_ALL_AUTHORS, GET_ALL_BOOKS } from '../queries.js'

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [addNewBook] = useMutation(ADD_NEW_BOOK, {
        update: (cache, { data }) => {
            cache.updateQuery({ query: GET_ALL_BOOKS }, ({ allBooks }) => {
                return {
                    allBooks: allBooks.concat(data.addBook),
                }
            })

            cache.updateQuery({ query: GET_ALL_AUTHORS }, ({ allAuthors }) => {
                return {
                    allAuthors: allAuthors.map(author =>
                        author.name === data.addBook.author.name
                            ? { ...author, bookCount: author.bookCount + 1 }
                            : author
                    ),
                }
            })

        },
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        addNewBook({
            variables: {
                title,
                author,
                published: Number(published),
                genres,
            },
        })
        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook
