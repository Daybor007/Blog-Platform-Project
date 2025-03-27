const Comment = require('../models/comment.model')

const BlogPost = require('../models/blogPost.model')

exports.createComment = async (req, res) => {
  const { text } = req.body
  const postId = req.params.postId
  const author = req.user.id

  try {
    const post = await BlogPost.findById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    const newComment = new Comment({ text, author, blogPost: postId })
    await newComment.save()

    res.status(200).json(newComment)
  } catch (error) {
    res.status(404).json({ message: 'Failed to create comment', error: error.message })
  }
}

exports.getCommentsByPostId = async (req, res) => {
  const postId = req.params.postId

  try {
    const comments = await Comment.find({ blogPost: postId }).populate('author', 'username')
    res.json(comments)
  } catch (error) {
    res.status(404).json({ message: 'Failed to fetch comments', error: error.message })
  }
}