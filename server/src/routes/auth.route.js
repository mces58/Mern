const { Router } = require('express');
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userProfile,
} = require('@src/controllers');
const { isAuthenticatedUser } = require('@src/middlewares');

const router = Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, userProfile);

module.exports = router;
