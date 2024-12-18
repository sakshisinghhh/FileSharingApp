const { Config } = require('../config');
const MediaFile = require('../modals/MediaFile'); // Update with actual model path
const express = require("express");
const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;
  const uniqueName = Date.now() + '-' + uploadedFile.name;
  const uploadPath = `${Config.BASE_DIR}/uploads/${uniqueName}`;

  try {
    await uploadedFile.mv(uploadPath);

    const mediaFile = new MediaFile({
      filename: uploadedFile.name,
      filesize: uploadedFile.size,
      filepath: uniqueName,
      visitCount: 0,
    });

    let f = await mediaFile.save();
    res.json({fileId:f._id});
  } catch (error) {
    console.error('Error saving file information:', error);
    res.status(500).send('Error saving file information to database.');
  }
});

module.exports = router;  