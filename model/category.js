let sequelize=require("sequelize");
let connection=require("./../config/db.config")
let categoryModel=connection.define("categories",{
    id:{
        primaryKey:true,
        notNull:true,
        type:sequelize.DataTypes.INTEGER,
        autoIncrement:true
    },
    name:{
        notNull :true,
        type:sequelize.DataTypes.STRING
    }
},
{timestamps:false})
module.exports=categoryModel;