const { getProducts, getProductById } = require('./product.controller');

const {
  getProducts: getUserProducts,
  getProductById: getUserProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./user.controller');

const {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} = require('./review.controller');

const {
  getPromotion,
  createOrUpdatePromotion,
  deletePromotion,
} = require('./promotion.controller');

const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userProfile,
} = require('./auth.controller');

const { getCart, createAndUpdateCart, deleteCart } = require('./cart.controller');

module.exports = {
  getProducts,
  getProductById,
  getUserProducts,
  getUserProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getPromotion,
  createOrUpdatePromotion,
  deletePromotion,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userProfile,
  getCart,
  createAndUpdateCart,
  deleteCart,
};
