const express = require('express')

const router = express.Router()

const BlogPost = require('../models/blogPost.model')

const { authenticateToken } = require('../middleware/auth.middleware')

const { checkRole } = require('../middleware/role.middleware')

router.post('/', authenticateToken, checkRole('admin'), async (req, res) => {
  
})
router.put('/:id', authenticateToken, async (req, res) => {
  const postId = req.params.id
  const { title, content } = req.body

  try {
    const post = await BlogPost.findById(postId)

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    if (req.user.role !== 'admin' && post.author.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Unauthorized' })
    }

    post.title = title || post.title
    post.content = content || post.content
    await post.save()
    res.json(post)
  } catch (error) {
    res.status(404).json({ message: 'Failed to update post', error: error.message })
  }
})
module.exports = router