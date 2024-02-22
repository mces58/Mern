const { genSalt, hash, compare } = require('bcryptjs');

const encode = async (password) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

const decode = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

module.exports = {
  encode,
  decode,
};
