const logger = require('./logger')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')) {
    return response.status(400).
      json({ error: 'expected `username` to be unique' })
  }
  if (error.status) {
    return response.status(error.status).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer')) {
    req.token = authorization.replace('Bearer ', '')
  } else {
    const e = new Error('Token missing')
    e.status = 401
    return next(e)
  }
  next()
}

const userExtractor = (req, res, next) => {
  const decodedUser = jwt.verify(req.token, process.env.SECRET)
  if (!decodedUser.userId){
    const e = new Error('Invalid token')
    e.status = 401
    return next(e)
  }
  req.user = decodedUser
  next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }