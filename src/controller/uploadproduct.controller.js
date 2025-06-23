const Products = require("../models/product.models");

const uploadProduct = async (req, res) => {
  try {
    const { producttitle, productdescription, saletype, category, price } =
      req.body;

    const image1 = req.file.path;
    const userid = req.user.id;

    const save = await Products.create({
      userid,
      producname: producttitle,
      saletype,
      price,
      description: productdescription,
      category,
      image1,
      isNew: true,
    });

    if (save) {
      return res.json({
        success: true,
        message: "Product saved Successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Product Not saved",
      });
    }
  } catch (error) {
    console.log("error in upload product", error);
    return res.json({
      success: false,
      message: "Product Not saved",
    });
  }
};

module.exports = { uploadProduct };
