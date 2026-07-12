const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET environment variable is missing!");
}

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
    const decoded = jwt.verify(token, JWT_SECRET);
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
