const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/conn.js");

const products = sequelize.define("product", {
  productid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userid:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  producname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isNew: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  discount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  image1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    timestamps:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,

});

module.exports = products;