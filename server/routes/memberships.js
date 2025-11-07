const express = require('express');
const {
  getMemberships,
  getMembership,
  createMembership,
  updateMembership,
  deleteMembership
} = require('../controllers/memberships');

const router = express.Router();

// Import middleware
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.route('/').get(getMemberships);
router.route('/:id').get(getMembership);

// Admin only routes
router.use(protect, authorize('admin'));
router.route('/')
  .post(createMembership);

router.route('/:id')
  .put(updateMembership)
  .delete(deleteMembership);

module.exports = router;