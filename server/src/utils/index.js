const { encode, decode } = require('./bcryptjs.util');
const {
  uploadImages,
  deleteImages,
  uploadAvatar,
  deleteAvatar,
} = require('./cloudinary.util');
const { generateToken, generateHash } = require('./jwt.util');
const flattenObject = require('./flattenObject.util');
const { jwtSign, jwtVerify } = require('./jwt.util');
const logger = require('./logger.util');
const ProductFilter = require('./ProductFilter.util');
const removeLocalImage = require('./removeLocalImage.util');
const sendMail = require('./sendMail.util');

module.exports = {
  encode,
  decode,
  uploadImages,
  deleteImages,
  uploadAvatar,
  deleteAvatar,
  generateToken,
  generateHash,
  flattenObject,
  jwtSign,
  jwtVerify,
  logger,
  ProductFilter,
  removeLocalImage,
  sendMail,
};
