const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Contact = require('../models/Contact');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required' });
    }

    const created = await Contact.create({ name, email, message });
    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error(err && err.message ? err.message : err);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (err) {
    console.error(err && err.message ? err.message : err);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;