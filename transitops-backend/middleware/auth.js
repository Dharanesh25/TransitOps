const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token.
 * Looks for 'Authorization: Bearer <token>' header.
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: true, message: "Authorization header is missing" });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
  if (!token) {
    return res.status(401).json({ error: true, message: "Token is missing" });
  }

  try {
    const secret = process.env.JWT_SECRET || 'fb8b94cc218d6f9a0ddb94514ba19dfd56d953cae9cb2b11568285ea9a43a2bc';
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Attaches { id, role, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: true, message: "Invalid or expired token" });
  }
}

/**
 * Middleware to enforce role-based access control.
 * @param {...string} roles - Acceptable roles
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: true, message: "Access forbidden: No user profile found" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: true, 
        message: `Access forbidden: Required role in [${roles.join(', ')}]. Current role: '${req.user.role}'` 
      });
    }

    next();
  };
}

module.exports = {
  verifyToken,
  requireRole
};
