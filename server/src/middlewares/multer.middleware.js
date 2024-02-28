const multer = require('multer');
const { extname } = require('path');

const commonFilter = (file, cb) => {
  if (file.mimetype.startsWith('image')) {
    return cb(null, true);
  }
  return cb(new Error('Not an image! Please upload an image.'), false);
};

const storage = multer.diskStorage({
  destination: (cb) => {
    cb(null, 'assets');
  },

  filename: (file, cb) => {
    return cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`);
  },
});

const uploadMulterImages = multer({
  storage,
  fileFilter: commonFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
}).array('images', 5);

const uploadMulterAvatar = multer({
  storage,
  fileFilter: commonFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
}).single('avatar');

module.exports = { uploadMulterImages, uploadMulterAvatar };
