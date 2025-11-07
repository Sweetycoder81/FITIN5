const express = require('express');
const {
  getTrainers,
  getTrainer,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  trainerPhotoUpload,
  updateSchedule
} = require('../controllers/trainers');

const router = express.Router();

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.route('/').get(getTrainers);
router.route('/:id').get(getTrainer);

// Admin only routes
router.use(protect, authorize('admin'));
router.route('/')
  .post(createTrainer);

router.route('/:id')
  .put(updateTrainer)
  .delete(deleteTrainer);

router.route('/:id/photo').put(trainerPhotoUpload);
router.route('/:id/schedule').put(updateSchedule);

module.exports = router;