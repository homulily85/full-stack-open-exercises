const usersRouter = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users)
})

usersRouter.post('/create', async (req, res, next) => {
  const { username, password, name } = req.body
  if (!req.body.password) {
    const e = new Error('Password is missing')
    e.status = 400
    return next(e)
  }

  if (req.body.password.length < 3) {
    const e = new Error('Password must be at least 3 characters long')
    e.status = 400
    return next(e)
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = new User({ username, name, passwordHash, blogs: [] })
  await newUser.save()
  res.status(201).json(newUser)
})

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const passwordCorrect = user === null ? false : (password
    ? await bcrypt.compare(password, user.passwordHash)
    : false)

  if (!passwordCorrect) {
    const e = new Error('Invalid username or password.')
    e.status = 401
    return next(e)
  }

  const userForToken = {
    username, userId: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET,
    { expiresIn: 60 * 60 })

  res.status(200).json({ ...userForToken, token })

})

module.exports = usersRouter