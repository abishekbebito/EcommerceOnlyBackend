let categories = require("./../model/category");
let sequelizeInstance = require("./../config/db.config");
let express = require("express");
const { json } = require("body-parser");
let expressApp = express();

// let createTable= async()=>{
//     await sequelizeInstance.sync({force:true});
//     insertCategories();

// //sync() will create the table
// //and if force:true is given it will drop the existing
// //table and create a new one
// }

// let insertCategories = async () => {
//   await categories.bulkCreate([
//     {
//       name: "fashion",
//     },
//     {
//       name: "mobile",
//     },
//     {
//       name: "electronics",
//     },
//   ]);
// };
// createTable();
//insert table was given inside the create table function

let getAllCategories = async (req, res, next) => {
  let c = await categories.findAll();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(c));
};

let getCategoriesById = async (req, res, next) => {
  //for get api
  let id = req.params.categoryId;
  if (!id) {
    res.status(400).send("id was not found");
  }
  let c = await categories.findAll({ where: { id: id } });
  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify(c));
  res.end();
};
let addNewcategory = async (req, res, next) => {
  //for post api
  //validator code was written in the controller.router file
  try {
    let categoryToAdd = req.body;

    await categories.create({
      name: categoryToAdd.name,
    });
    res.status(201).send("data added");
    /*for post call need to put value for api..
    if html error appears and 
    also check the route file 
    if route is right or wrong*/
  } catch (err) {
    console.log("error coming");
  } finally {
    res.end();
  }
};
let deleteCategoryById = async (req, res, next) => {
  //for delete api

  try {
    let id = req.params;
    if (!id) {
      throw new error("category not given");
    }
    await categories.destroy({
      where: {
        categoryId: id,
      },
    });
    res.status(200).send("category deleted");
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
};
let updateCategoryById = async (req, res, next) => {
  //for put api
  try {
    let id = req.params.categoryId; //
    if (!id) {
      throw new error("please pass the categoryid");
    }

    let categoryToUpdate = {
      name: req.body.name,
    };
    await categories.update(categoryToUpdate, {
      where: {
        /*this id is found in the table column or model  -> */ id: id,
      },
    });
    //findByPk gives the row of that primary key
    let updatedCategory = await categories.findByPk(id);
    res.status(200).send(updatedCategory);
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
};
module.exports = {
  getAllCategories,
  getCategoriesById,
  addNewcategory,
  deleteCategoryById,
  updateCategoryById,
};
