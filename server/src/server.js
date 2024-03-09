const express = require('express');
const startApp = require('@src/app');
const { logger } = require('@src/utils');

const app = express();

const PORT = process.env.PORT || 5000;

startApp(app);

app.listen(PORT, () => {
  logger.log('info', `Server is running on port ${PORT}`);
});
