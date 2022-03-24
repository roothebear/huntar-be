const seedDB = require('./seed');
const testData = require('./test-data.json');
const productionData = require('./production-data.json');
const mongoose = require('mongoose');

require('dotenv').config({
  path: `${__dirname}/../.env.production`,
});

mongoose
  .connect(process.env.DB_URI)

  .then(() => {
    return seedDB(productionData);
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log(`successfully disconnected`);
  })
  .catch((err) => console.log(err));
