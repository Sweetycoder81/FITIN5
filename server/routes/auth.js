const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  logout
} = require('../controllers/auth');

const router = express.Router();

// Import middleware
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;