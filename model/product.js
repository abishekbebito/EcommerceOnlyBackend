let sequelize = require("sequelize");
let connection = require("./../config/db.config");
let productModel = connection.define(
  "products",
  {
    id: {
      primaryKey: true,
      notNull: true,
      type: sequelize.DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      notNull: true,
      type: sequelize.DataTypes.STRING,
    },
    price: {
      notNull: true,
      type: sequelize.DataTypes.BIGINT,
    },
  },
  { timestamps: false }
);
module.exports = productModel;
