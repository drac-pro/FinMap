require('dotenv').config();
const jwt = require('jsonwebtoken');

class AuthMiddleware {
  // Middleware to verify JWT token
  static authenticateToken(req, res, next) {
    const token = req.hearder('Authorization')?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    return null;
  }
}

module.exports = AuthMiddleware;
