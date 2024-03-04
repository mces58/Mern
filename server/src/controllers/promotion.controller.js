const { Product } = require('@src/models');
const { flattenObject } = require('@src/utils');

const getPromotion = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new Error(`Product with id ${req.params.id} not found`));

    const { promotion } = product;

    res.status(200).json({
      success: true,
      promotion,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

const createOrUpdatePromotion = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new Error(`Product with id ${req.params.id} not found`));

    const { discount, startDate, endDate } = req.body;

    const promotion = flattenObject({ discount, startDate, endDate });

    product.promotion = promotion;
    await product.save();

    res.status(200).json({
      success: true,
      product,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

const deletePromotion = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new Error(`Product with id ${req.params.id} not found`));

    product.promotion = null;
    await product.save();

    res.status(200).json({
      success: true,
      product,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getPromotion,
  createOrUpdatePromotion,
  deletePromotion,
};
