const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads/' folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// File filter (optional - only images)
const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith('image/');
  cb(null, isImage);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
