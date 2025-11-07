const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// @route   POST api/payments
// @desc    Process payment
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    res.json({ message: "Payment processed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/payments
// @desc    Get all payments
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    res.json({ message: "Payments route working" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;