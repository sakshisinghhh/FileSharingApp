const { Config } = require('../config');


const File = require('../modals/MediaFile'); // Adjust path to your File model

// Helper function to convert bytes to a human-readable format
const formatFileSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
};

const ViewFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    // Find the file in the database by ID
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Increment the visit count and save it to the database
    file.visitCount += 1;
    await file.save();

    // Construct the public URL for the file
    const fileUrl = `http://localhost:5000/uploads/${file.filepath}`;
    const humanReadableSize = formatFileSize(file.filesize); // Convert file size



    // Return the file information, including human-readable size
    res.status(200).json({
      filename: file.filename,
      filepath: fileUrl, // Use public URL for the file
      size: humanReadableSize, // Human-readable size
      uploadDate: file.uploadDate || null, // Include upload date if available
      mimeType: file.mimeType || 'unknown', // Include MIME type if available
      visitCount: file.visitCount, // Include visit count
    });
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ message: 'Failed to retrieve file' });
  }
};

module.exports = ViewFile;
