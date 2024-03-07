const { Router } = require('express');
const { getProducts, getProductById } = require('@src/controllers');

const router = Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProductById);

module.exports = router;
