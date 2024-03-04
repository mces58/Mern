const { Product } = require('@src/models');
const {
  flattenObject,
  uploadImages,
  deleteImages,
  removeLocalImage,
  logger,
} = require('@src/utils');

const getProducts = async (res, next) => {
  try {
    const resultsPerPage = 10;
    const productsCount = await Product.countDocuments();
    const products = await Product.find().populate('seller').limit(resultsPerPage);

    res.status(200).json({
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
    const product = await Product.findById(req.params.id).populate('seller');

    if (!product) return next(new Error(`Product with id ${req.params.id} not found`));

    res.status(200).json({
      success: true,
      product,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  const {
    label: { brand, model },
    category: { mainCategory, subCategory },
    stock: { body, color },
    ...restOfData
  } = req.body;

  const { files } = req;

  const images = await uploadImages(files);

  try {
    files.forEach((file) => {
      return removeLocalImage(file.path);
    });

    /*    const stockData = size.map((_, index) => ({
      size: Number(size[index]),
      quantity: Number(quantity[index]),
      color: color[index],
    }));
*/
    const productData = {
      ...restOfData,
      label: { brand, model },
      category: { mainCategory, subCategory },
      stock: { body, color },
      images,
    };

    res.status(201).json({
      success: true,
      product: await Product.create(productData),
    });

    return next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      req.files.forEach((file) => {
        return removeLocalImage(file.path);
      });
      await deleteImages(
        images.map((image) => {
          return image.public_id;
        })
      );
      const messages = Object.values(error.errors).map((value) => {
        return value.message;
      });
      return next(new Error(messages));
    }
    logger.log('error', error);

    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new Error(`Product with id ${req.params.id} not found`));

    const updateData = req.body;
    const flattenedUpdates = flattenObject(updateData);

    if (req.files) {
      await deleteImages(
        product.images.map((image) => {
          return image.public_id;
        })
      );
      const { files } = req;
      const images = await uploadImages(files);
      files.forEach((file) => {
        return removeLocalImage(file.path);
      });
      flattenedUpdates.images = images;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      flattenedUpdates,
      { new: true }
    );

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return next(new Error(`Product with id ${req.params.id} not found`));

    await deleteImages(
      product.images.map((image) => {
        return image.public_id;
      })
    );
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: `Product with id ${req.params.id} deleted`,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
