const { Schema, model } = require('mongoose');

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    products: [
      {
        _id: false,
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },

        quantity: {
          type: Number,
          min: 1,
          require: true,
        },

        price: {
          type: Number,
          min: 0,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = model('Cart', CartSchema);

module.exports = Cart;
