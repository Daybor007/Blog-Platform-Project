const express = require('express')

const router = express.Router()

const { authenticateToken } = require('../middleware/auth.middleware')

const commentController = require('../controllers/comment.controller')

router.post('/:postId/comments', authenticateToken, commentController.createComment)

router.get('/:postId/comments', commentController.getCommentsByPostId)

module.exports = router