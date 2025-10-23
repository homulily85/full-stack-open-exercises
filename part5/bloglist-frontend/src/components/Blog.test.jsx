import { render, screen } from '@testing-library/react'
import Blog from './Blog.jsx'
import { userEvent } from '@testing-library/user-event'

const blog = {
  title: 'dsdadasdasd',
  author: 'dasdsdsad',
  likes: '0',
  url: 'dadsadasdasd',
  user: {
    name: 'dasdsadd',
  },
}

const removeBlog = vi.fn()
const increaseLike = vi.fn()

describe('<Blog/>', () => {
  beforeEach(() => {
    render(<Blog blog={blog} removeBlog={removeBlog}
                 increaseLike={increaseLike}></Blog>)
  })

  test(
    'a blog renders the blog\'s title and author, but does not render its URL or number of likes by default',
    () => {

      const blogTitleAndAuthor = screen.getByText(
        `${blog.title} ${blog.author}`,
        { exact: false })
      expect(blogTitleAndAuthor).toBeVisible()

      const blogLikes = screen.getByText(`likes ${blog.likes}`,
        { exact: false })
      expect(blogLikes).not.toBeVisible()

      const blogUrl = screen.getByText(`${blog.url}`, { exact: false })
      expect(blogUrl).not.toBeVisible()
    })

  test(
    'the blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked',
    async () => {
      const showButton = screen.getByText('View', { exact: false })
      const user = userEvent.setup()
      await user.click(showButton)

      const blogLikes = screen.getByText(`likes ${blog.likes}`,
        { exact: false })
      expect(blogLikes).toBeVisible()

      const blogUrl = screen.getByText(`${blog.url}`, { exact: false })
      expect(blogUrl).toBeVisible()
    })

  test(
    'if the like button is clicked twice, the event handler the component received as props is called twice',
    async () => {
      const user = userEvent.setup()
      const showButton = screen.getByText('View', { exact: false })
      await user.click(showButton)
      const likeButton = screen.getByText('Like')
      await user.click(likeButton)
      await user.click(likeButton)

      expect(increaseLike.mock.calls).toHaveLength(2)
    })
})

