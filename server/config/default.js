// Supplies env for the server, overridden by process.env

/* eslint no-undef: 0 */ // For allowing process.env

module.exports = {
  appPort: process.env.APIPORT || "5000",
  appName:process.env.APP_Name||"Resume Builder",
  SECRET_KEY: process.env.SECRET_KEY,
  appEnv:process.env.ENV||'Development'
};
