const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [30, 'Your name cannot exceed 30 characters'],
    },

    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      validate: {
        validator(val) {
          return /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val);
        },
        message: 'Please enter a valid email',
      },
    },

    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [6, 'Your password must be longer than 6 characters'],
      select: false,
    },

    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    role: {
      type: String,
      default: 'user',
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date,
  },
  {
    timestamps: {
      currentTime: () => {
        return new Date(Date.now() + 3 * 60 * 60 * 1000); // GMT+3
      },
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  }
);

const User = model('User', UserSchema);

module.exports = User;
