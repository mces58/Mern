const { User } = require('@src/models');
const {
  encode,
  decode,
  generateToken,
  generateHash,
  jwtSign,
  jwtVerify,
  sendMail,
} = require('@src/utils');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    /* const { file } = req; */
    const user = await User.findOne({ email });

    if (user) return next(new Error('Email already exists'));

    /* const avatar = await uploadAvatar(file); */
    const hashedPassword = await encode(password);

    /* removeLocalImage(file.path); */

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      /* avatar, */
      role,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      user: newUser,
    });

    return Promise.resolve();
  } catch (error) {
    next(error);

    return Promise.reject(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error('Please enter email & password'));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new Error('User not found'));

    const isMatch = await decode(password, user.password);

    if (!isMatch) return next(new Error('Invalid credentials'));

    const token = jwtSign(user._id);

    const cookieOptions = {
      expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
      httpOnly: true,
    };

    res.status(200).cookie('token', token, cookieOptions).json({
      success: true,
      message: 'Login successful',
      user,
      token,
    });

    return Promise.resolve();
  } catch (error) {
    next(error);

    return Promise.reject(error);
  }
};

const logout = (res, next) => {
  try {
    res.status(200).clearCookie('token').json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return next(new Error('Please enter email'));

    const user = await User.findOne({ email });
    if (!user) return next(new Error('User not found'));

    const resetToken = generateToken();
    const resetPasswordToken = generateHash(resetToken);
    const gmt3 = 3 * 60 * 60 * 1000;
    const resetPasswordExpire = Date.now() + gmt3 + 5 * 60 * 1000; // 5 minutes

    await User.findByIdAndUpdate(
      user._id,
      {
        resetPasswordToken,
        resetPasswordExpire,
      },
      { new: true, runValidators: true }
    );

    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/password/reset/${resetToken}`;

    try {
      await sendMail(email, resetUrl);

      res.status(200).json({
        success: true,
        message: 'Email sent successfully',
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new Error('Email could not be sent'));
    }

    return Promise.resolve();
  } catch (error) {
    next(error);

    return Promise.reject(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) return next(new Error('Please enter token & password'));

    const resetPasswordToken = generateHash(token);
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return next(new Error('Invalid token'));

    const hashedPassword = await encode(password);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });

    return Promise.resolve();
  } catch (error) {
    next(error);

    return Promise.reject(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const verified = jwtVerify(token);

    if (!verified) return next(new Error('Login first to access this resource'));

    const user = await User.findById(verified.id);

    if (!user) return next(new Error('User not found'));

    res.status(200).json({
      success: true,
      user,
    });

    return Promise.resolve();
  } catch (error) {
    next(error);

    return Promise.reject(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userProfile,
};
