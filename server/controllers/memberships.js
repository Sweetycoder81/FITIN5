const Membership = require('../models/Membership');

// @desc    Get all membership plans
// @route   GET /api/memberships
// @access  Public
exports.getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    
    res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single membership plan
// @route   GET /api/memberships/:id
// @access  Public
exports.getMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (!membership) {
      return res.status(404).json({
        success: false,
        error: 'Membership plan not found'
      });
    }

    res.status(200).json({
      success: true,
      data: membership
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Create new membership plan
// @route   POST /api/memberships
// @access  Private/Admin
exports.createMembership = async (req, res) => {
  try {
    const membership = await Membership.create(req.body);

    res.status(201).json({
      success: true,
      data: membership
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update membership plan
// @route   PUT /api/memberships/:id
// @access  Private/Admin
exports.updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!membership) {
      return res.status(404).json({
        success: false,
        error: 'Membership plan not found'
      });
    }

    res.status(200).json({
      success: true,
      data: membership
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete membership plan
// @route   DELETE /api/memberships/:id
// @access  Private/Admin
exports.deleteMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (!membership) {
      return res.status(404).json({
        success: false,
        error: 'Membership plan not found'
      });
    }

    await membership.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};