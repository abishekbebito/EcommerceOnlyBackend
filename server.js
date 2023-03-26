let express = require("express");
let bodyparser = require("body-parser");
let serverConfig = require("./config/server.config");
const router = require("./routes/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
const dbConnection = require("./config/db.config"); //for {force:true} option  was imported
const category = require("./model/category");
const products = require("./model/product");
const { insertProducts } = require("./controller/product.controller");
const Roles = require("./model/roles");
const relation = require("./model/index");
//
category.hasMany(products);

let expressApp = express();
expressApp.use(bodyparser.json());
expressApp.use(router);
expressApp.use(ErrorHandler);

let init = async () => {
  await dbConnection.sync({ force: true }); //sync will delete and create table everytime for all models imported
  insertCategories();
  insertProducts();
  insertRoles();
};
let insertCategories = async () => {
  await category.bulkCreate([
    {
      name: "fashion",
    },
    {
      name: "mobile",
    },
    {
      name: "electronics",
    },
  ]);
};
let insertRoles = async () => {
  Roles.bulkCreate([
    {
      id: 1,
      name: "user",
    },
    {
      id: 2,
      name: "admin",
    },
  ]);
};

expressApp.listen(serverConfig.PORT, () => {
  console.log("server listening at " + serverConfig.PORT);
  init();
});
