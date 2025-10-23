import { render, screen } from '@testing-library/react'
import CreateBlog from './CreateBlog.jsx'
import { userEvent } from '@testing-library/user-event'

describe('<CreateBlog/>', () => {
  test(
    'the form calls the event handler it received as props with the right details when a new blog is created.',
    async () => {
      const createBlog = vi.fn()
      render(<CreateBlog createBlog={createBlog}></CreateBlog>)

      const blog = {
        title: 'dsdadasdasd',
        author: 'dasdsdsad',
        url: 'dadsadasdasd',
      }
      const user = userEvent.setup()
      const titleField = screen.getByLabelText('title', { exact: false })
      const authorField = screen.getByLabelText('author', { exact: false })
      const urlField = screen.getByLabelText('url', { exact: false })
      const submitButton = screen.getByText('create')

      await user.type(titleField, blog.title)
      await user.type(authorField, blog.author)
      await user.type(urlField, blog.url)
      await user.click(submitButton)

      expect(createBlog).toHaveBeenCalledTimes(1)
      expect(createBlog).toHaveBeenCalledWith(blog)

    })
})
