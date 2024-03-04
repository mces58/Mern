const { Product } = require('@src/models');
const { flattenObject } = require('@src/utils');

const getReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new Error(`Product with id ${req.params.id} not found`));

    const { reviews } = product;

    res.status(200).json({
      success: true,
      reviews,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

const getReviewById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new Error(`Product with id ${req.params.id} not found`));

    const { reviews } = product;

    const foundReview = reviews.find((review) => {
      return review._id.toString() === req.params.reviewId.toString();
    });

    if (!foundReview) {
      return next(new Error(`Review with id ${req.params.reviewId} not found`));
    }

    res.status(200).json({
      success: true,
      review: foundReview,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new Error(`Product with id ${req.params.id} not found`));

    const { reviews } = product;
    const { user, rating, comment } = req.body;

    const review = flattenObject({ user, rating, comment });

    product.reviews.push(review);

    const ratingAverage =
      reviews.reduce((acc, item) => {
        return acc + Number(item.rating);
      }, 0) / reviews.length;

    product.rating = ratingAverage.toFixed(1);

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added',
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { reviewId } = req.params;
    const { user, rating, comment } = req.body;

    const product = await Product.findById(productId);

    if (!product) return next(new Error(`Product with id ${productId} not found`));

    const reviewIndex = product.reviews.findIndex((review) => {
      return review._id.toString() === reviewId;
    });

    if (reviewIndex === -1) {
      return next(new Error(`Review with id ${reviewId} not found`));
    }

    const flatReview = flattenObject({ user, rating, comment });

    product.reviews[reviewIndex] = {
      ...product.reviews[reviewIndex],
      ...flatReview,
    };

    const ratingAverage =
      product.reviews.reduce((acc, review) => {
        return acc + Number(review.rating);
      }, 0) / product.reviews.length;

    product.rating = ratingAverage.toFixed(1);

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Review updated',
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { reviewId } = req.params;

    const product = await Product.findById(productId);

    if (!product) return next(new Error(`Product with id ${productId} not found`));

    const reviewIndex = product.reviews.findIndex((review) => {
      return review._id.toString() === reviewId;
    });

    if (reviewIndex === -1) {
      return next(new Error(`Review with id ${reviewId} not found`));
    }

    product.reviews.splice(reviewIndex, 1);

    if (product.reviews.length > 0) {
      const ratingAverage =
        product.reviews.reduce((acc, review) => {
          return acc + Number(review.rating);
        }, 0) / product.reviews.length;

      product.rating = ratingAverage.toFixed(1);
    } else {
      product.rating = 0;
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Review deleted',
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
