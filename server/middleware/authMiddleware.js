import { verify } from 'jsonwebtoken';
import User from '../models/userModel';

require('dotenv').config();

class AuthMiddleware {
  // Middleware to verify JWT token
  static async authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    return null;
  }
}

export default AuthMiddleware;
