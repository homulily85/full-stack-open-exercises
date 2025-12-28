import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries.js'
import { useState } from 'react'

const Login = ({ show, setToken, setPage }) => {
    const [login] = useMutation(LOGIN)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    if (!show) {
        return null
    }

    const submit = async (e) => {
        e.preventDefault()
        const result = await login({ variables: { username, password } })
        if (result.data) {
            localStorage.setItem('token', result.data.login.value)
            setToken(result.data.login.value)
            setPage('books')
        }
    }

    return <>
        <form onSubmit={submit}>
            <label htmlFor="username">username</label>
            <input type="text" name="username" id="username" value={username}
                   onChange={({ target }) => setUsername(target.value)}/>
            <br/>
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password"
                   value={password}
                   onChange={({ target }) => setPassword(target.value)}/>
            <br/>
            <button type={'submit'}>Submit</button>
        </form>
    </>
}

export default Login