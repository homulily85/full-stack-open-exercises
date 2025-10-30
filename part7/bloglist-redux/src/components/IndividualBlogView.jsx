import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer.js'

const IndividualBlogView = () => {
  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const dispatch = useDispatch()
  const handleIncreaseLike = async () => {
    dispatch(likeBlog(blog))
  }

  if (!blog) {
    return null
  }
  return <>
    <h1>{blog.title}</h1>
    <a href={blog.url}> {blog.url}</a>
    <p>{blog.likes} likes <button onClick={handleIncreaseLike}>like</button></p>
    <p>added by {blog.user.name}</p>
  </>
}

export default IndividualBlogView