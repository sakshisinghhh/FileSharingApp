// models/mediaFile.js
const mongoose = require('mongoose');

// Define the schema for MediaFile
const mediaFileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true, // Make filename required
  },
  filesize: {
    type: Number,
    required: true, // Make filesize required
  },
  filepath: {
    type: String,
    required: true, // Make filepath required
  },
  visitCount: {
    type: Number,
    default: 0, // Default value for visitCount
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the model from the schema
const MediaFile = mongoose.model('MediaFile', mediaFileSchema);

// Export the model
module.exports = MediaFile;
