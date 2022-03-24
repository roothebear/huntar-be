const seedDB = require('./seed');
const testData = require('./test-data.json');
const productionData = require('./production-data.json');
const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://admin-user:banana123@cluster0.1cbrn.mongodb.net/ScavengeAR?retryWrites=true&w=majority'
  )
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
