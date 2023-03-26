const Categories = require("./../model/category");
const validateReqForCategoryName = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "category name is required",
    });
  }
  if (req.params.id) {
    res.status(400).send({
      message: "dont need the request paramaters",
    });
  }
  next();
};
const validatorReqForCategoryId = async (req, res, next) => {
  let categoryId = req.params.categoryId;
  if (categoryId) {
    let category = await Categories.findByPk(categoryId);
    if (!category) {
      res.status(400).send({
        message: "category id does not exist",
      });
    }
  } else {
    res.status(400).send({
      message: "category id is missing",
    });
  }
};
module.exports = {
  validateReqForCategoryName,
  validatorReqForCategoryId,
};
