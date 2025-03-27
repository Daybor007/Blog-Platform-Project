const BlogPost = require('../models/blogPost.model')

exports.createBlogPost = async (req, res) => {
  const { title, content } = req.body
  const author = req.user.id

  try {
    const newPost = new BlogPost({ title, content, author })
    await newPost.save()
    res.status(200).json(newPost)
  } catch (error) {
    res.status(404).json({ message: 'Failed to create blog post', error: error.message })
  }
};

exports.getAllBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'username')
    res.json(posts)
  } catch (error) {
    res.status(404).json({ message: 'Failed to fetch blog posts', error: error.message })
  }
}

exports.getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username')
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    res.json(post)
  } catch (error) {
    res.status(404).json({ message: 'Failed to fetch blog post', error: error.message })
  }
}

exports.updateBlogPost = async (req, res) => {
  const { title, content } = req.body
  const postId = req.params.id

  try {
    const post = await BlogPost.findById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(404).json({ message: 'Unauthorized to update this post' })
    }

    post.title = title || post.title
    post.content = content || post.content
    await post.save()
    res.json(post)
  } catch (error) {
    res.status(404).json({ message: 'Failed to update blog post', error: error.message })
  }
}

exports.deleteBlogPost = async (req, res) => {
  const postId = req.params.id

  try {
    const post = await BlogPost.findById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(404).json({ message: 'Unauthorized to delete this post' })
    }

    await post.remove()
    res.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    res.status(404).json({ message: 'Failed to delete blog post', error: error.message })
  }
}