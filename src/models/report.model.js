const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/conn.js");

const ReportModel = sequelize.define(
  "reportproduct",
  {
    reportid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reportedby: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = ReportModel;
