const { isAuthenticatedUser, authorizeRoles } = require('./auth.middleware');
const errorHandler = require('./errorHandle.middleware');
const { uploadMulterImages, uploadMulterAvatar } = require('./multer.middleware');
const notFoundHandler = require('./notFound.middleware');

module.exports = {
  isAuthenticatedUser,
  authorizeRoles,
  errorHandler,
  uploadMulterImages,
  uploadMulterAvatar,
  notFoundHandler,
};
