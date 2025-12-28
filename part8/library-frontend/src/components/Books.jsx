import { useQuery } from '@apollo/client/react'
import { GET_ALL_BOOKS } from '../queries.js'
import { useState } from 'react'

const Books = (props) => {
    const result = useQuery(GET_ALL_BOOKS)
    const [genre, setGenre] = useState('all')
    const genres = new Set()

    let books = []

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>
            Loading...
        </div>
    }

    if (result.data) {
        books = result.data.allBooks
        books.forEach((book) => {
            if (book.genres) {
                book.genres.forEach((g) => genres.add(g))
            }
        })
    }

    return (
        <div>
            <h2>books</h2>
            {genre === 'all' ? '' : <p>in genre <b>{genre}</b></p>}
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {genre !== 'all' ? books.filter(
                    (book) => !book.genres ? false : book.genres.includes(
                        genre)).map((a) => (
                    <tr key={a.id}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                )) : books.map((a) => (
                    <tr key={a.id}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {[...genres].map(
                (g) => (
                    <button key={g} onClick={() => setGenre(g)}>{g}</button>))}
            <button key={'all'} onClick={() => setGenre('all')}>all</button>
        </div>
    )
}

export default Books
