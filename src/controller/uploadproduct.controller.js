const Products = require("../models/product.models");

const uploadProduct = async (req, res) => {
  try {
    const { producttitle, productdescription, saletype, price } = req.body;
    console.log(producttitle, productdescription, saletype, price);
  } catch (error) {
    console.log("error in upload product", error);
  }
};

module.exports = { uploadProduct };
