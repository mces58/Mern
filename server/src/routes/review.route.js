const { Router } = require('express');
const {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} = require('@src/controllers');
const { isAuthenticatedUser } = require('@src/middlewares');

const router = Router();

router.route('/:id').get(getReviews).post(isAuthenticatedUser, createReview);

router
  .route('/:id/:reviewId')
  .get(getReviewById)
  .patch(isAuthenticatedUser, updateReview)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
