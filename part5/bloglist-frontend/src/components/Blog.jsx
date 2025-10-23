import { useState } from 'react'
import blogService from '../services/blog.js'

const Blog = ({ blog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const increaseLike = async () => {
    blog.likes += 1
    setLikes(blog.likes)
    await blogService.update(blog)
  }

  const toggleVisibility = ({ target }) => {
    setVisible(!visible)
    target.textContent = !visible ? 'Hide' : 'View'
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }

  return <>
    <div
      style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>View</button>
      <div style={{ display: visible ? '' : 'None' }}>
        {blog.url}
        <br/>
        likes {likes}
        <button onClick={increaseLike}>Like</button>
        <br/>
        {blog.user.name}
        <br/>
        <button onClick={handleRemoveBlog}>Remove</button>
      </div>
    </div>
  </>
}

export default Blog