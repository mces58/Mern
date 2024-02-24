const fs = require('fs');
const { logger } = require('./logger.util');

module.exports = (path) => {
  fs.unlink(path, (err) => {
    if (err) logger.log('error', err);
  });
};
