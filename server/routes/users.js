const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateProfile,
  enrollClass,
  getMyClasses
} = require('../controllers/users');

const router = express.Router();

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// Routes for admin access
router.use(protect);
router.route('/profile').put(updateProfile);
router.route('/enroll/:classId').put(enrollClass);
router.route('/me/classes').get(getMyClasses);

// Admin only routes
router.use(authorize('admin'));
router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;