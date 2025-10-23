import { useState } from 'react'

const CreateBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return <>
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
  </>
}

export default CreateBlog