const express = require('express')
const { PORT } = require('./utils/config.js')
const { connectToDatabase } = require('./utils/db.js')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const authorsRouter = require('./controllers/authors')
const errorHandler = require('./middlewares/errorHandling')

const app = express()

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/authors', authorsRouter)

app.use(errorHandler)
const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()