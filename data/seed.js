// const testData = require('./test-data.json');
const mongoose = require("mongoose");
const Games = require("../models/games");

const seedDB = (testData) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Games.insertMany(testData);
    })
    .catch((err) => console.log(err));
};


module.exports = seedDB