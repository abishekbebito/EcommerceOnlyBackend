let express = require("express");
const expressApp = express();
const router = express.Router();
let controller = require("./../controller/auth.controller");
let verifySignUp = require("./../middlewares/verifySignUp");
//CORS - cross origin
expressApp.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token,Origin,Content-Type,Accept"
  );
  next();
});

router.post("/signup", [verifySignUp.checkDuplicateMethod], controller.signup);
router.post("/signin", controller.signin);
module.exports = router;
