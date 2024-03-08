const { Router } = require('express');
const {
  getPromotion,
  createOrUpdatePromotion,
  deletePromotion,
} = require('@src/controllers');
const { isAuthenticatedUser } = require('@src/middlewares');

const router = Router();

router
  .route('/:id')
  .get(getPromotion)
  .post(isAuthenticatedUser, createOrUpdatePromotion)
  .patch(isAuthenticatedUser, createOrUpdatePromotion)
  .delete(isAuthenticatedUser, deletePromotion);

module.exports = router;
