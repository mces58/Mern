const { Router } = require('express');
const { getCart, createAndUpdateCart, deleteCart } = require('@src/controllers');

const router = Router();

router.route('/:userId').get(getCart).post(createAndUpdateCart).delete(deleteCart);

module.exports = router;
