const { Schema } = require('mongoose');

const PromotionSchema = new Schema({
  _id: false,
  discount: {
    type: Number,
    min: [0, 'Discount can not be less than 0'],
    max: [100, 'Discount can not be more than 100'],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

module.exports = PromotionSchema;
