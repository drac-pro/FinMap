import { sign } from 'jsonwebtoken';
import User from '../models/userModel';

require('dotenv').config();

const generateToken = (id) => sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});

class AuthController {
  // register
  static async register(req, res) {
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

      const token = generateToken(user._id);

      return res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ Error: 'Server error ' });
    }
  }

  // login
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      user.lastLogin = Date.now();
      await user.save();

      const token = generateToken(user._id);
      return res.json({ message: 'Logged in successfully', token });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default AuthController;
