const db = require("./../model/index");
const sequelize = require("sequelize");
const config = require("./../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = db.user;
const Roles = db.roles;
let signup = async (req, res) => {
  let user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  if (req.body.roles) {
    let roles = await Roles.findAll({
      where: {
        name: {
          [sequelize.Op.or]: req.body.roles,
        },
      },
    });

    await user.setRoles(roles);
    res.status(200).send({
      message: "user registered successfully",
    });
  }
  res.end();
};
let signin = async (req, res) => {
  let password = req.body.password;
  let userName = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!userName) {
    res.status(404).send({
      message: "user not found",
    });
    return;
  }
  let isValidPassword = bcrypt.compareSync(
    req.body.password, //passed in the request body
    userName.password //available in the database
  );
  if (!isValidPassword) {
    res.status(401).json({
      message: "invalid Password",
    });
  }
  var token = jwt.sign(
    { id: userName.id },
    config.secret,
    { expiresIn: 86400 } //this is the milli seconds//60*60*24
  );
  let authorities = [];
  let roles = await userName.getRoles();
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
  }
  res.status(200).send({
    id: userName.id,
    username: userName.userName,
    email: userName.email,
    roles: authorities,
    accessToken: token,
  });
  res.end();
};
module.exports = { signup, signin };
