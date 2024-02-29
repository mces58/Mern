const { Cart } = require('@src/models');

const getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cart retrieved successfully',
      cart,
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

const createAndUpdateCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) cart = new Cart({ userId, products: [] });

    const newProduct = { productId, quantity };
    const existingProductIndex = cart.products.findIndex((product) => {
      return product.productId.toString() === productId.toString();
    });

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push(newProduct);
    }

    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Cart created successfully',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return next(new Error('Cart not found'));
    }

    const existingProductIndex = cart.products.findIndex((product) => {
      return product.productId.toString() === productId.toString();
    });

    if (existingProductIndex === -1) {
      return next(new Error('Product not found'));
    }

    cart.products.splice(existingProductIndex, 1);

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart deleted successfully',
    });

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCart,
  createAndUpdateCart,
  deleteCart,
};
