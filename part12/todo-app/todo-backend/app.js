const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes/index')
const todosRouter = require('./routes/todos')
const { setAsync, getAsync } = require('./redis')

const app = express()

getAsync('added_todos').then(v => {
  if (v === null) {
    setAsync("added_todos",0)
  }
})

app.use(cors())

app.use(logger('dev'))
app.use(express.json())

app.use('/', indexRouter)
app.use('/todos', todosRouter)

module.exports = app
