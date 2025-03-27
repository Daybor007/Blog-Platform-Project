const { verifyToken } = require('../utils/jwt.utils')

const User = require('../models/user.model')


const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    try {
      const decoded = verifyToken(token)
      const user = await User.findById(decoded.userId)

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: 'Unauthorized: Insufficient role' })
      }

      req.user = user
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token', error: error.message })
    }
  }
}

module.exports = { checkRole }