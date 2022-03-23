const express = require("express");
const app = express();
const initialiseDB = require("./connection");
const apiRouter = require('./routes/apiRoutes')

const ENV = process.env.NODE_ENV || "production";

require("dotenv").config({
  path: `${__dirname}/.env.${ENV}`,
});
initialiseDB();
app.use(express.json())
app.use('/api',apiRouter)

module.exports = app;
