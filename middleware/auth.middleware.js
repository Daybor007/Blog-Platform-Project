const { verifyToken } = require('../utils/jwt.utils')

const User = require('../models/user.model')


const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(404).json({ message: 'No token provided' })
  }

  try {
    const decoded = verifyToken(token); 
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    req.user = user; 
    next();
  } catch (error) {
    res.status(404).json({ message: 'Invalid token', error: error.message })
  }
};

module.exports = { authenticateToken }