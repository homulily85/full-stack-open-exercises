const blogRouter = require('express').Router()
const Blog = require('../model/blog.js')
const User = require('../model/user')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', tokenExtractor, userExtractor,
  async (request, response) => {
    const user = request.user

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author || '',
      url: request.body.url,
      likes: request.body.likes,
      user: user.userId,
    })
    const createdBlog = await blog.save()

    const userFromDB = await User.findById(user.userId)

    console.log(userFromDB)
    userFromDB.blogs.push(createdBlog._id)

    await userFromDB.save()

    response.status(201).json(createdBlog)

  })

blogRouter.delete('/:id', tokenExtractor, userExtractor,
  async (req, res, next) => {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      res.status(204).end()
      return
    }

    if (blog.user.toString() !== req.user.userId) {
      const e = new Error('You do not own this blog.')
      e.status = 403
      return next(e)
    }

    await Blog.deleteOne({ _id: req.params.id })

    const userDb = await User.findById(req.user.userId)

    userDb.blogs = userDb.blogs.filter(
      b => b.toString() !== req.params.id,
    )

    await userDb.save()

    res.status(204).end()
  })

blogRouter.put('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    const e = new Error('Requested blog does not exist.')
    e.status = 400
    return next(e)
  }

  if (req.body.title) {
    blog.title = req.body.title
  }

  if (req.body.author) {
    blog.author = req.body.author
  }

  if (req.body.url) {
    blog.url = req.body.url
  }

  if (req.body.likes) {
    blog.likes = req.body.likes
  }

  await blog.save()

  res.json(blog)

})

module.exports = blogRouter