import { useQuery } from '@apollo/client/react'
import { GET_ALL_AUTHORS } from '../queries.js'
import SetBirthyear from './SetBirthyear.jsx'

const Authors = (props) => {
    let authors = []
    const result = useQuery(GET_ALL_AUTHORS)
    if (result.loading) {
        return <div>
            Loading...
        </div>
    }

    if (result.data) {
        authors = result.data.allAuthors
    }

    if (!props.show) {
        return null

    }
    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>born</th>
                    <th>books</th>
                </tr>
                {authors.map((a) => (
                    <tr key={a.id}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {(props.token && <SetBirthyear authors={authors}/>)}
        </div>
    )
}

export default Authors
