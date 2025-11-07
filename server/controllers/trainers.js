const Trainer = require('../models/Trainer');
const path = require('path');

// @desc    Get all trainers
// @route   GET /api/trainers
// @access  Public
exports.getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    
    res.status(200).json({
      success: true,
      count: trainers.length,
      data: trainers
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single trainer
// @route   GET /api/trainers/:id
// @access  Public
exports.getTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: trainer
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Create new trainer
// @route   POST /api/trainers
// @access  Private/Admin
exports.createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);

    res.status(201).json({
      success: true,
      data: trainer
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Update trainer
// @route   PUT /api/trainers/:id
// @access  Private/Admin
exports.updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: trainer
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Delete trainer
// @route   DELETE /api/trainers/:id
// @access  Private/Admin
exports.deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer not found'
      });
    }

    await trainer.remove();

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

// @desc    Upload trainer photo
// @route   PUT /api/trainers/:id/photo
// @access  Private/Admin
exports.trainerPhotoUpload = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer not found'
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
    file.name = `photo_${trainer._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/trainers/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          error: 'Problem with file upload'
        });
      }

      await Trainer.findByIdAndUpdate(req.params.id, { photo: file.name });

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

// @desc    Update trainer schedule
// @route   PUT /api/trainers/:id/schedule
// @access  Private/Admin
exports.updateSchedule = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        error: 'Trainer not found'
      });
    }

    trainer.schedule = req.body.schedule;
    await trainer.save();

    res.status(200).json({
      success: true,
      data: trainer
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};