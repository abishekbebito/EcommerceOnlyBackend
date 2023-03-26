let db = {}; //this db object was created for that last
// exporting line which make easy to export

db.roles = require("./roles");
db.user = require("./user");
db.roles.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
db.Roles = ["user", "admin"];
module.exports = db;
