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
      <label>
        title
        <input type="text" required value={title}
               onChange={({ target }) => setTitle(target.value)}/>
        <br/>
        author
        <input type="text" value={author}
               onChange={({ target }) => setAuthor(target.value)}/>
        <br/>
        url
        <input type="text" required value={url}
               onChange={({ target }) => setUrl(target.value)}/>
        <br/>
        <button type="submit">create</button>
      </label>
    </form>
  </>
}

export default CreateBlog