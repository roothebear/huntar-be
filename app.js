const express = require("express");
const app = express();
const initialiseDB = require("./connection");

const ENV = process.env.NODE_ENV || "production";

require("dotenv").config({
  path: `${__dirname}/.env.${ENV}`,
});
initialiseDB();

module.exports = app;
