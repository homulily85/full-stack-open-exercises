import { useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login.jsx'
import CreateBlog from './components/CreateBlog.jsx'
import Notification from './components/Notification.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer.js'
import { initUser, logout } from './reducers/userReducer.js'
import { Link, Route, Routes } from 'react-router-dom'
import Users from './components/Users.jsx'
import IndividualUser from './components/IndividualUser.jsx'
import IndividualBlogView from './components/IndividualBlogView.jsx'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  return (
    <>
      <Notification/>
      {!user && (
        <Login/>
      )}

      {user && (
        <>
          <p><Link to='/'>blogs</Link> <Link to='/users'>users</Link> {user.name} logged in <button
            onClick={() => {dispatch(logout())}}>logout</button></p>
          <h2>blogs</h2>
        </>
      )}

      <Routes>
        <Route path="/" element={
          user && (
            <>
              <CreateBlog/>
              {Array.isArray(blogs) && blogs.map(blog => (
                <Blog key={blog.id} blog={blog}/>
              ))}
            </>
          )
        }/>
        <Route path="/users/" element={<Users/>}/>
        <Route path="/users/:id" element={<IndividualUser/>}/>
        <Route path="/blogs/:id" element={<IndividualBlogView/>}/>
      </Routes>
    </>
  )
}

export default App