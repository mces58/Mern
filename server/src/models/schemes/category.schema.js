const { Schema } = require('mongoose');

const CategorySchema = new Schema({
  _id: false,
  mainCategory: {
    type: String,
    required: [true, 'Main category is required'],
    trim: true,
    maxlength: [50, 'Main category can not be more than 50 characters'],
  },
  subCategory: {
    type: String,
    required: [true, 'Sub category is required'],
    trim: true,
    maxlength: [50, 'Sub category can not be more than 50 characters'],
  },
});

module.exports = CategorySchema;
