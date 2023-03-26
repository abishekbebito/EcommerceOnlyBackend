let express = require("express");
let router = express.Router();
let categorycontroller = require("./../controller/category.controller");
let requestValidator = require("./../middlewares/RequestValidator");
router.get("/", categorycontroller.getAllCategories);
router.get("/:categoryId", categorycontroller.getCategoriesById);

router.post(
  "/",
  [requestValidator.validateReqForCategoryName],
  categorycontroller.addNewcategory
);
router.delete("/:categoryId", categorycontroller.deleteCategoryById);
router.put(
  "/:categoryId",
  [
    requestValidator.validateReqForCategoryName,
    requestValidator.validatorReqForCategoryId,
  ],
  categorycontroller.updateCategoryById
);
module.exports = router;
