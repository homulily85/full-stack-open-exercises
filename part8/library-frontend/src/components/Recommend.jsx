import { useQuery } from '@apollo/client/react'
import { GET_ALL_BOOKS_OF_A_GENRE, MY_FAVOURITE_GENRE } from '../queries.js'

const Recommend = ({ show }) => {
    const favoriteResult = useQuery(MY_FAVOURITE_GENRE)
    let genre = favoriteResult?.data?.me?.favoriteGenre

    let bookByGenreResult = useQuery(GET_ALL_BOOKS_OF_A_GENRE, {
        variables: { genre },
        skip: !genre,
    })

    if (!show) {
        return null
    }

    if (favoriteResult.loading || bookByGenreResult.loading) {
        return <div>
            Loading...
        </div>

    }

    return <div>
        <h2>recommendation</h2>
        <p>book in your favourite genre <b>{genre}</b></p>
        <table>
            <tbody>
            <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
            </tr>
            {bookByGenreResult.data.allBooks.map((book) => {
                return (
                    <tr key={book.title}>
                        <td>{book.title}</td>
                        <td>{book.author.name}</td>
                        <td>{book.published}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    </div>
}

export default Recommend