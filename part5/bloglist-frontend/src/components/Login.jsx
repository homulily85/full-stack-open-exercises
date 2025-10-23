import { useState } from 'react'

const Login = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    login({ username, password })
    setPassword('')
    setUsername('')
  }

  return <>
    <h1>log in to application</h1>
    <form onSubmit={handleLogin}>
      <label>
        username
        <input type="text" required value={username}
               onChange={({ target }) => setUsername(target.value)}/>
      </label>
      <br/>
      <label>
        password
        <input type="password" required value={password}
               onChange={({ target }) => setPassword(target.value)}/>
      </label>
      <br/>
      <button type="submit">login</button>
    </form>
  </>
}

export default Login