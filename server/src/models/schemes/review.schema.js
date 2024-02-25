const { Schema } = require('mongoose');

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: {
    type: Number,
    min: [1, 'Rating can not be less than 1'],
    max: [5, 'Rating can not be more than 5'],
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Comment can not be more than 500 characters'],
  },
  createdAt: {
    type: Date,
    default: () => {
      return new Date(Date.now() + 3 * 60 * 60 * 1000); // GMT+3
    },
  },
});

module.exports = ReviewSchema;
