const { Product } = require('@src/models');
const { ProductFilter } = require('@src/utils');

const getProducts = async (req, res, next) => {
  try {
    const resultsPerPage = 10;
    const productsCount = await Product.countDocuments();
    const apiFeatures = new ProductFilter(
      Product.find().populate('seller', 'name email -_id'),
      req.query
    )
      .search()
      .sort()
      .limitFields()
      .filter()
      .paginate(resultsPerPage);
    const products = await apiFeatures.query;

    res.json({
      success: true,
      productsCount,
      resultsPerPage,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'seller',
      'name email -_id'
    );

    if (!product) return next(new Error(`Product with id ${req.params.id} not found`));

    res.json({
      success: true,
      product,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
};
