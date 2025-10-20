const blogRouter = require('express').Router()
const Blog = require('../model/blog.js')

blogRouter.get('/', (request, response, next) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  }).catch(e => next(e))
})

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  }).catch(e => next(e))
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.deleteOne({ _id: req.params.id })
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    res.status(404).end()
    return
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