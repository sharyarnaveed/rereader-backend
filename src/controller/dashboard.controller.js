const { where } = require("sequelize");
const products = require("../models/product.models");

const dashbaordcount = async (req, res) => {
  try {
    const userid = req.user.id;
    const totalproducts = await products.count({
      where: {
        userid: userid,
      },
    });

    const totalsold = await products.count({
      where: { userid: userid, status: "sold" },
    });

    const totalsum = await products.sum("price", {
      where: {
        userid: userid,
        status: "sold",
      },
    });

    const productlist = await products.findAll({
      limit: 4,
      order: [["created_at", "DESC"]],
      raw: true,
    });

    console.log(productlist);

    return res.json({
      totalproducts: totalproducts,
      totalsold: totalsold,
      totalmade: totalsum,
      lastestProducts: productlist,
    });
  } catch (error) {
    console.log("error in getting dashboard data", error);
  }
};

module.exports = { dashbaordcount };
