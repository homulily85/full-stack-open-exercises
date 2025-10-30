import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer.js'
import {
  createNotification,
  removeNotification,
} from '../reducers/notificationReducer.js'
import Togglable from './Togglable.jsx'

const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const refToCreateBlogTogglable = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createBlog({ title, author, url }))
    dispatch(createNotification(
      {
        content: `a new blog ${title} by ${author} added`,
        type: 'success',
      }))
    setTimeout(() => dispatch(removeNotification()), 5000)
    refToCreateBlogTogglable.current.toggleVisibility()
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return <>
    <Togglable buttonLabel="create new blog"
               ref={refToCreateBlogTogglable}>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input id="title" type="text" required value={title}
                 onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input id="author" type="text" value={author}
                 onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input id="url" type="text" required value={url}
                 onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  </>
}

export default CreateBlog