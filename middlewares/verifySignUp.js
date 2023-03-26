const db = require("../model/index");
const Roles = db.roles; //const and not the roles model
const User = db.user;
let checkDuplicateMethod = async (req, res, next) => {
  let isExist = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (isExist) {
    res.status(400).json({
      message: "user already exist",
    });
    return; //dont goes to controler file
  }
  next();
};

module.exports = { checkDuplicateMethod };
