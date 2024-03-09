const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { connectDB } = require('@src/configs');
const {
  uploadMulterImages,
  uploadMulterAvatar,
  errorHandler,
  notFoundHandler,
} = require('@src/middlewares');
const {
  productRoutes,
  userRoutes,
  reviewRoutes,
  promotionRoutes,
  authRoutes,
  cartRoutes,
} = require('@src/routes');

dotenvExpand.expand(dotenv.config());
connectDB();

module.exports = (app) => {
  app.use(cors());

  app.use(bodyParser.json({ limit: '30mb', extended: true }));
  app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

  app.use(cookieParser());

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    })
  );

  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/admin', uploadMulterImages, userRoutes);
  app.use('/api/v1/reviews', reviewRoutes);
  app.use('/api/v1/promotions', promotionRoutes);
  app.use('/api/v1/auth', uploadMulterAvatar, authRoutes);
  app.use('/api/v1/carts', cartRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);
};
