import { verify } from 'jsonwebtoken';

require('dotenv').config();

class AuthMiddleware {
  // Middleware to verify JWT token
  static authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    return null;
  }
}

export default AuthMiddleware;
