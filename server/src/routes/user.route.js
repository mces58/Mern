const { Router } = require('express');
const {
  getUserProducts,
  getUserProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('@src/controllers');
const { isAuthenticatedUser, authorizeRoles } = require('@src/middlewares');

const router = Router();

router
  .route('/')
  .get(isAuthenticatedUser, getUserProducts)
  .post(isAuthenticatedUser, authorizeRoles('seller'), createProduct);

router
  .route('/:id')
  .get(isAuthenticatedUser, getUserProductById)
  .patch(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
