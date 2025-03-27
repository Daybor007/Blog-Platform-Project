// // server.js
// const express = require('express');
// const cookieParser = require('cookie-parser');
// require('dotenv').config();

// const connectDB = require('./config/db');
// const userRoutes = require('./routes/auth.routes');
// const blogRoutes = require('./routes/blog.routes');
// const commentRoutes = require('./routes/comment.routes');

// const app = express();

// // Middleware
// app.use(express.json()); // Parse JSON data
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
// app.use(cookieParser());

// // Routes
// app.use('/api/auth', userRoutes);
// app.use('/api/blog', blogRoutes);
// app.use('/api/blog/:postId/comments', commentRoutes);

// // Start server
// const PORT = process.env.PORT || 1000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require('express')

// const cookieParser = require('cookie-parser')

// const cors = require('cors')

// require('dotenv').config()


// const connectDB = require('./config/db')

// const userRoutes = require('./routes/auth.routes')

// const blogRoutes = require('./routes/blog.routes')

// const commentRoutes = require('./routes/comment.routes')

// const app = express()

// const PORT = process.env.PORT || 1000

// // Connect to Database
// connectDB();

// // Middleware
// app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())

// // Routes
// app.use('/api/auth', userRoutes)
// app.use('/api/blog', blogRoutes)
// app.use('/api/blog/:postId/comments', commentRoutes)

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' })
// })

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// }).on('error', (err) => {
//   console.error('Server startup error:', err)
// })

// server.js
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