const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/conn.js");

const Contactus = sequelize.define(
  "contactus",
  {
    contactid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false
  },
  subject:{
      type:DataTypes.STRING,
    allowNull:false
  },
  message:{
      type:DataTypes.TEXT,
    allowNull:false
  }

  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Contactus;
