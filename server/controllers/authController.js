require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

class AuthController {
  // register
  async register(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ error: 'User already exists' });

      user = new User({
        firstName, lastName, email, password,
      });
      await user.save();

      const token = this.generateToken(user._id);

      return res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ Error: 'Server error ' });
    }
  }

  // login
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne(email);
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      user.lastLogin = Date.now();
      const token = this.generateToken(user._id);
      return res.json({ message: 'Logged in successfully', token });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  static generateToken(id) {
    jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  }
}

module.exports = AuthController;
