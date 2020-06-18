//  Takes the environemnt variables from the env file and defaultConfig to
const env = require("dotenv").config();
const defaultConfig = require("./default");
const messages = require("./messages");
const db = require("./db");
const httpStatus = require("./httpStatus");

module.exports = {
  ...env.parsed,
  ...defaultConfig,
  ...messages,
  ...db,
  ...httpStatus,
};
