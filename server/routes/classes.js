const express = require('express');
const {
  getClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
  classPhotoUpload,
  updateRoutine
} = require('../controllers/classes');

const router = express.Router();

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.route('/').get(getClasses);
router.route('/:id').get(getClass);

// Admin only routes
router.use(protect, authorize('admin'));
router.route('/')
  .post(createClass);

router.route('/:id')
  .put(updateClass)
  .delete(deleteClass);

router.route('/:id/photo').put(classPhotoUpload);
router.route('/:id/routine').put(updateRoutine);

module.exports = router;