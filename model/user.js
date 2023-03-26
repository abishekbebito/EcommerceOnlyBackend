let sequelize = require("sequelize");
let dbConnection = require("./../config/db.config");
const User = dbConnection.define("users", {
  username: {
    type: sequelize.STRING,
  },
  email: {
    type: sequelize.STRING,
  },
  password: {
    type: sequelize.STRING,
  },
});
module.exports = User;
