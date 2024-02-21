const express = require('express');
const startApp = require('@src/app');

const app = express();

startApp(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
