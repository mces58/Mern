const { randomBytes, createHash } = require('crypto');

const generateSalt = (length = 20) => {
  return randomBytes(length).toString('hex');
};

const generateHash = (token) => {
  return createHash('sha256').update(token).digest('hex');
};

module.exports = {
  generateSalt,
  generateHash,
};
