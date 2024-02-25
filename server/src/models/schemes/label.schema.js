const { Schema } = require('mongoose');

const LabelSchema = new Schema({
  _id: false,
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
    maxlength: [50, 'Brand can not be more than 50 characters'],
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true,
    maxlength: [50, 'Model can not be more than 50 characters'],
  },
});

module.exports = LabelSchema;
