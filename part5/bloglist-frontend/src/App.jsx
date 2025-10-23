import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blog.js'
import Login from './components/Login.jsx'
import userService from './services/user.js'
import CreateBlog from './components/CreateBlog.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import SuccessMessage from './components/SuccessMessage.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const refToCreateBlogTogglable = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      },
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('logged-user')
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
      userService.setToken(JSON.parse(loggedUser).token)
    }
  }, [])

  const login = async (credentials) => {
    try {
      setUser(await userService.login(credentials))
    } catch (e) {
      setError('wrong username or password')
      setTimeout(() => {setError(null)}, 5000)
    }
  }

  const handleLogout = () => {
    userService.logout()
    setUser(null)
  }

  const createBlog = async (blog) => {
    const newBlog = await blogService.create(blog)
    setBlogs(blogs.concat(newBlog))
    setSuccess(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {setSuccess(null)}, 5000)
    refToCreateBlogTogglable.current.toggleVisibility()
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
    } catch (e) {
      if (e.status === 403) {
        setError('You can not delete other\'s blog')
      } else {
        setError('Unexpected error happens')
      }
      setTimeout(() => {setError(null)}, 5000)
      return
    }
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  return (
    <div>
      <ErrorMessage message={error}></ErrorMessage>
      <SuccessMessage message={success}></SuccessMessage>
      {!user && (
        <Login
          login={login}
        />
      )}

      {user && (
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in <button
            onClick={handleLogout}>logout</button></p>
        </>
      )}

      {user && (
        <>
          {user && (
            <Togglable buttonLabel="create new blog"
                       ref={refToCreateBlogTogglable}>
              <CreateBlog createBlog={createBlog}/>
            </Togglable>
          )}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} removeBlog={removeBlog}/>,
          )}
        </>
      )}


    </div>
  )
}

export default App