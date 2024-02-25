const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const {
  CategorySchema,
  LabelSchema,
  PromotionSchema,
  ReviewSchema,
  StockSchema,
} = require('./schemes');

const ProductSchema = new Schema(
  {
    serialCode: {
      type: String,
      unique: [true, 'Serial code must be unique'],
      trim: true,
      default: () => {
        return uuidv4().substring(0, 18);
      },
    },

    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      trim: true,
      min: 0,
      max: 9999,
      validate: {
        validator(value) {
          if (value === undefined || !value.toString().includes('.')) {
            this.price = value;
          } else {
            const beforeDot = value.toString().split('.')[0];
            const afterDot = value.toString().split('.')[1].substring(0, 2);
            const temp = `${beforeDot}.${afterDot}`;
            this.price = Number(temp);
          }
        },
        message: 'Invalid price format',
      },
    },

    images: [
      {
        _id: false,
        public_id: {
          type: String,
          required: [true, 'Public id is required'],
        },
        url: {
          type: String,
          required: [true, 'Url is required'],
        },
      },
    ],

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    warranty: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seller is required'],
    },
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

ProductSchema.add({
  label: {
    type: LabelSchema,
    required: [true, 'Label is required'],
  },

  category: {
    type: CategorySchema,
    required: [true, 'Category is required'],
  },

  stock: {
    type: StockSchema,
    required: [true, 'Stock is required'],
  },

  promotion: {
    type: PromotionSchema,
    default: null,
  },

  reviews: {
    type: [ReviewSchema],
    default: [],
  },
});

ProductSchema.index({ name: 'text', description: 'text' });

const Product = model('Product', ProductSchema);

module.exports = Product;
