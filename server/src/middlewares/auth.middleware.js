const { User } = require('@src/models');
const { jwtVerify, removeLocalImage } = require('@src/utils');

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: 'Login first to access this resource.',
      });
    }

    const verified = jwtVerify(token);

    if (!verified) {
      return res.status(401).json({
        message: 'Login first to access this resource.',
      });
    }

    const user = await User.findById(verified.id);

    if (!user) {
      return res.status(401).json({
        message: 'User not found.',
      });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const { files } = req;
      files.forEach((file) => {
        return removeLocalImage(file.path);
      });
      return res.status(401).json({
        message: 'Session expired. Login again.',
      });
    }
    next(err);
  }

  return null;
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) is not allowed to access this resource.`,
      });
    }

    next();

    return null;
  };
};

module.exports = { isAuthenticatedUser, authorizeRoles };
