const Class = require('../models/Class');
const path = require('path');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Public
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('trainer');
    
    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single class
// @route   GET /api/classes/:id
// @access  Public
exports.getClass = async (req, res) => {
  try {
    const fitnessClass = await Class.findById(req.params.id).populate('trainer');

    if (!fitnessClass) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }

    res.status(200).json({
      success: true,
      data: fitnessClass
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Create new class
// @route   POST /api/classes
// @access  Private/Admin
exports.createClass = async (req, res) => {
  try {
    const fitnessClass = await Class.create(req.body);

    res.status(201).json({
      success: true,
      data: fitnessClass
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Private/Admin
exports.updateClass = async (req, res) => {
  try {
    const fitnessClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!fitnessClass) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }

    res.status(200).json({
      success: true,
      data: fitnessClass
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Private/Admin
exports.deleteClass = async (req, res) => {
  try {
    const fitnessClass = await Class.findById(req.params.id);

    if (!fitnessClass) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }

    await fitnessClass.remove();

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

// @desc    Upload class image
// @route   PUT /api/classes/:id/photo
// @access  Private/Admin
exports.classPhotoUpload = async (req, res) => {
  try {
    const fitnessClass = await Class.findById(req.params.id);

    if (!fitnessClass) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }

    if (!req.files) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a file'
      });
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image file'
      });
    }

    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return res.status(400).json({
        success: false,
        error: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`
      });
    }

    // Create custom filename
    file.name = `photo_${fitnessClass._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/classes/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          error: 'Problem with file upload'
        });
      }

      await Class.findByIdAndUpdate(req.params.id, { image: file.name });

      res.status(200).json({
        success: true,
        data: file.name
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update class routine
// @route   PUT /api/classes/:id/routine
// @access  Private/Admin
exports.updateRoutine = async (req, res) => {
  try {
    const fitnessClass = await Class.findById(req.params.id);

    if (!fitnessClass) {
      return res.status(404).json({
        success: false,
        error: 'Class not found'
      });
    }

    fitnessClass.routine = req.body.routine;
    await fitnessClass.save();

    res.status(200).json({
      success: true,
      data: fitnessClass
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};