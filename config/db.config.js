const sequelize = require("sequelize");
let instance = new sequelize(
    "ecomm_db","root","#12Baby&21",
    {
        host:"localhost",
        dialect:"mysql",
        operatorAliases:0,
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        }
    }
);
module.exports=instance;