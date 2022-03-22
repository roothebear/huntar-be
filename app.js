const express = require('express');
const app = express();
const initialiseDB = require('./connection');
// const mongoose = require('mongoose');

const ENV = process.env.NODE_ENV || 'production';

require('dotenv').config({
  path: `${__dirname}/.env.${ENV}`,
});

initialiseDB();


// mongoose.connect(process.env.DATABASE_URL, () => {
//     console.log('we are here!!!!!!')
//     console.log(process.env.DATABASE_URL)
// })


module.exports = app;