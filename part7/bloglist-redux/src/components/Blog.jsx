import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer.js'
import {
  createNotification,
  removeNotification,
} from '../reducers/notificationReducer.js'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const handleIncreaseLike = async () => {
    dispatch(likeBlog(blog))
  }

  const toggleVisibility = ({ target }) => {
    setVisible(!visible)
    target.textContent = !visible ? 'Hide' : 'View'
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(deleteBlog(blog))
        dispatch(createNotification(
          {
            content: `blog ${blog.title} by ${blog.author} removed`,
            type: 'success',
          }))
      } catch (e) {
        if (e.status === 403) {
          dispatch(createNotification(
            { content: 'You can not delete other\'s blog', type: 'error' }))
        } else {
          dispatch(createNotification(
            { content: 'Unexpected error happens', type: 'error' }))
        }
      } finally {
        setTimeout(() => dispatch(removeNotification()), 5000)
      }
    }
  }

  return <>
    <div
      style={blogStyle}>
      <p key={blog.id}><Link to={`/blogs/${blog.id}`}> {blog.title}</Link></p>
      <button onClick={toggleVisibility}>View</button>
      <div style={{ display: visible ? '' : 'None' }}>
        {blog.url}
        <br/>
        likes {blog.likes}
        <button onClick={handleIncreaseLike}>Like</button>
        <br/>
        {blog.user.name}
        <br/>
        <button onClick={handleRemoveBlog}>Remove</button>
      </div>
    </div>
  </>
}

export default Blog