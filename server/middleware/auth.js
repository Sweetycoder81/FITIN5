const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    const isAdminBase = req.user && typeof req.user.roleBase === 'number' && req.user.roleBase === 1;
    const isRoleAllowed = roles.includes(req.user.role);
    if (!(isRoleAllowed || (roles.includes('admin') && isAdminBase))) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} (base:${req.user.roleBase ?? 'n/a'}) is not authorized to access this route`
      });
    }
    next();
  };
};