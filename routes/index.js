let express = require("express");
let router = express.Router();
let categoryRoutes = require("./category.routes");
let productRoutes = require("./product.routes");
const authRoute = require("./auth.route");
router.get("/", (req, res, next) => {
  res.write("this is the base page");
  res.end();
});
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/auth", authRoute);
module.exports = router;
