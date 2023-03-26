let products = require("./../model/product");
const { Op } = require("sequelize");
let sequelizeInstance = require("./../config/db.config");
// let createTable = async () => {
//   await sequelizeInstance.sync({ force: true });
//   insertProducts();
// };

// createTable();
let insertProducts = async () => {
  await products.bulkCreate([
    {
      name: "Samsung Galaxy Note",
      categoryId: 1,
      price: 18000,
    },
    {
      name: "Iphone 13",
      categoryId: 1,
      price: 60000,
    },
    {
      name: "Sony bravia",
      categoryId: 2,
      price: 40000,
    },
    {
      name: "Boat Rugged",
      categoryId: 3,
      price: 4000,
    },
    {
      name: "JBL Storm",
      categoryId: 3,
      price: 9000,
    },
    {
      name: "Vu 5",
      categoryId: 2,
      price: 32000,
    },
  ]);
};

async function getAllProducts(req, res, next) {
  let categoryId = req.query.categoryId;
  let minPrice = req.query.minPrice;
  let maxPrice = req.query.maxPrice;
  let p = [];
  //this filter is done by query written in
  //the parameter of request likee"?categoryId&minPrice&maxPrice"
  //here the ? somewhat means to where condition
  //like in the sql query
  if (Object.keys(req.query).length == 0) {
    p = await products.findAll();
  }
  if (categoryId && !(minPrice && maxPrice)) {
    p = await filterByCategory(categoryId);
  } else if (!categoryId && (minPrice || maxPrice)) {
    p = await filterByPrice(minPrice, maxPrice);
  } else {
    p = await products.findAll({
      where: {
        categoryId: categoryId,
        price: {
          [Op.gte]: minPrice,
          [Op.lte]: maxPrice,
        },
      },
    });
  }
  res.write(JSON.stringify(p));
  res.end();
}
let filterByCategory = async (categoryId) => {
  let filtered = await products.findAll({
    where: {
      categoryId: categoryId,
    },
  });
  return filtered;
};
let filterByPrice = async (minPrice, maxPrice) => {
  p = await products.findAll({
    where: {
      price: {
        [Op.gte]: minPrice,
        [Op.lte]: maxPrice,
      },
    },
  });
  return p;
};
let getProductsById = async (req, res, next) => {
  let id = req.params.productId;
  if (!id) {
    res.status(400).send("ID not Passed");
  }
  let p = await products.findAll({
    where: { id: id },
  });
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(p));
  res.status(200);
  res.end();
};

let addNewProduct = async (req, res, next) => {
  //for post api

  try {
    let productToAdd = req.body;
    //for get use params
    //for post put use body
    // body->data in postman body tab that need to be update or insert
    //params->parameter in the request box ----used for fetch or delete
    if (!productToAdd) {
      throw new error("post api doesnt need api in request");
    }
    await products.create({
      name: productToAdd.name,
      price: productToAdd.price,
      categoryId: productToAdd.categoryId,
    });
    res.status(201).send("product added");
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
let deleteProductById = async (req, res, next) => {
  try {
    let id = req.params.productId;
    if (!id) {
      throw new error("id not given");
    }

    await products.destroy({
      where: {
        id: id,
      },
    });
    //res. priority->res.status...res.writeHead...res.write...res.send...res.end
    //res.send->means res.write +res.end
    //res.status was always first
    res.status(200);
    res.write("product deleted");
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
};
let updateProductById = async (req, res, next) => {
  try {
    let id = req.params.productId;
    if (!id) {
      throw new error("id not provided");
    }
    let productToAdd = {
      name: req.body.name,
    };

    await products.update(productToAdd, {
      where: {
        id: id,
      },
    });
    let updated = await products.findByPk(id);
    res.status(200);
  } catch (err) {
    next(err);
  } finally {
    res.end();
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  addNewProduct,
  deleteProductById,
  updateProductById,
  insertProducts,
};
