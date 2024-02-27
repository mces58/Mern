const { connect } = require('mongoose');
const { logger } = require('@src/utils');

const connectDB = async () => {
  try {
    const { MONGO_URI } = process.env;
    const conn = await connect(MONGO_URI);
    logger.log('info', `MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    logger.log('error', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
