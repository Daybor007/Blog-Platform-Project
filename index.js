const express = require('express')

const cookieParser = require('cookie-parser')

require('dotenv').config()

const connectDB = require('./config/db')


const userRoutes = require('./routes/auth.routes')
const blogRoutes = require('./routes/blog.routes')
const commentRoutes = require('./routes/comment.routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

connectDB()

app.use('/api/auth', userRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/blog/:postId/comments', commentRoutes)


const PORT = process.env.PORT || 1000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
