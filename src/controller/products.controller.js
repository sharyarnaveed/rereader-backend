const products = require("../models/product.models");

const Userproducts = async (req, res) => {
  const userid = req.user.id;
  try {
    const data = await products.findAll(
      {
        raw: true,
      },
      {
        where: {
          userid: userid,
        },
      }
    );

    return res.json({
      success: true,
      Products: data,
    });
  } catch (error) {
    console.log("error in egetting products", error);
    return res.json({
      message: "error in getting products",
      success: false,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { productid } = req.params;
    const userId = req.user.id;
    console.log(productid, status);

    const updateproduct = await products.update(
      {
        status,
      },
      {
        where: {
          productid: productid,
          userid: userId,
        },
      }
    );

    console.log(updateproduct);

    if (updateproduct) {
      return res.json({
        message: "Status Updated",
        success: true,
      });
    } else {
      return res.json({
        message: "Status Not Updated",
        success: false,
      });
    }
  } catch (error) {
    console.log("error in updatig status", error);
    return res.json({
      message: "error in updating status",
      success: false,
    });
  }
};

module.exports = { Userproducts, updateStatus };
