const { Schema } = require('mongoose');

const StockSchema = new Schema({
  _id: false,
  body: [
    {
      _id: false,
      size: {
        type: String,
        required: [true, 'Size is required'],
        trim: true,
        min: [1, 'Size can not be less than 1'],
        max: [50, 'Size can not be more than 50 characters'],
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity can not be less than 1'],
        max: [1000, 'Quantity can not be more than 1000'],
      },
    },
  ],
  color: {
    type: String,
    required: [true, 'Color is required'],
    trim: true,
    maxlength: [50, 'Color can not be more than 50 characters'],
  },
});

module.exports = StockSchema;
