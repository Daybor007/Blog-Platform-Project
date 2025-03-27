const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

exports.register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(404).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user',
    });

    await newUser.save()
    res.status(200).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(404).json({ message: 'Registration failed', error: error.message })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(404).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '20m',
    });

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } })
  } catch (error) {
    res.status(404).json({ message: 'Login failed', error: error.message })
  }
}