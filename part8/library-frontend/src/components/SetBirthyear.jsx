import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { UPDATE_AUTHOR_BIRTHYEAR } from '../queries.js'

const SetBirthyear = ({ authors }) => {
    const [name, setName] = useState(authors[0].name)
    const [born, setBorn] = useState('')
    const [setBirthyear] = useMutation(UPDATE_AUTHOR_BIRTHYEAR)

    const submit = (e) => {
        e.preventDefault()
        setBirthyear(
            { variables: { name: name.trim(), setBornTo: Number(born) } })
        setBorn('')
        setName('')
    }

    return <>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
            <label htmlFor="name">Name</label>
            {/*<input type="text" name="name" id="name" value={name}*/}
            {/*       onChange={({ target }) => setName(target.value)}/>*/}
            {/*<br/>*/}
            <select name="name" id="name"
                    onChange={({ target }) => setName(target.value)}>
                {authors.map((author) => {
                    return <option name={author.name} value={author.name}
                                   key={author.id}>{author.name} </option>
                })}
            </select>
            <br/>
            <label htmlFor="born">born</label>
            <input type="number" name="born" id="born" value={born}
                   onChange={({ target }) => setBorn(target.value)}/>
            <br/>
            <button>update author</button>
        </form>
    </>
}

export default SetBirthyear