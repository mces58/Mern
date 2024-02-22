const { sign, verify } = require('jsonwebtoken');

const jwtSign = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

const jwtVerify = (token) => {
  return verify(token, process.env.JWT_SECRET);
};

module.exports = {
  jwtSign,
  jwtVerify,
};
