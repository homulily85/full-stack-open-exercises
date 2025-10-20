const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const config = require('./utils/config')
const blogsRouter = require('./controller/blog')
const usersRouter = require('./controller/user')
const logger = require('./utils/logger')
const { errorHandler } = require('./utils/middleware')

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl).then(() => {
  logger.info('connected to MongoDB')
}).catch(error => {
  logger.info('error connecting to MongoDB:', error.message)
})

app.use(express.json())

morgan.token('post-info', function (req) {
  if (req.method === 'POST') {
    return `${JSON.stringify(req.body)}`
  } else {
    return ''
  }
})

app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :post-info', {
    skip: function (req) {
      return req.method !== 'POST'
    },
  }))

app.use(morgan('tiny', {
  skip: function (req) {
    return req.method === 'POST'
  },
}))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)

module.exports = app