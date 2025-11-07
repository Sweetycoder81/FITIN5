const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// @route   GET api/feedback
// @desc    Get all feedback
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    // Fetch feedback from database
    const feedback = [];
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/feedback
// @desc    Submit feedback
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    res.json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;