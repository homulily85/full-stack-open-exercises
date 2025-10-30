import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer.js'
import {
  createNotification,
  removeNotification,
} from '../reducers/notificationReducer.js'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      await dispatch(login({ username, password }))
      setPassword('')
      setUsername('')
    }
    catch (e){
      dispatch(createNotification(
        { content: 'wrong username or password', type: 'error' }))
      setTimeout(() => dispatch(removeNotification()), 5000)
    }
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