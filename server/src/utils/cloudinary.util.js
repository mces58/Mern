const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

dotenvExpand.expand(dotenv.config());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImages = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const { path } = file;
    const newPath = await cloudinary.uploader.upload(path, {
      folder: 'products',
      transformation: [{ height: 500, crop: 'pad' }, { quality: 'auto' }],
    });

    return {
      url: newPath.secure_url,
      public_id: newPath.public_id,
    };
  });

  return Promise.all(uploadPromises);
};

const deleteImages = async (publicIds) => {
  const deletePromises = publicIds.map(async (publicId) => {
    await cloudinary.uploader.destroy(publicId);
  });

  return Promise.all(deletePromises);
};

const uploadAvatar = async (file) => {
  const { path } = file;
  const newPath = await cloudinary.uploader.upload(path, {
    folder: 'avatars',
    transformation: [{ width: 150, height: 150, crop: 'fill' }],
  });

  return {
    url: newPath.secure_url,
    public_id: newPath.public_id,
  };
};

const deleteAvatar = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId);

  return result;
};

module.exports = {
  uploadImages,
  deleteImages,
  uploadAvatar,
  deleteAvatar,
};
