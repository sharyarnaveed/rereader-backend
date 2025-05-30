const Products = require("../models/product.models");

const uploadProduct = async (req, res) => {
  try {
    const { producttitle, productdescription, saletype, category,price } = req.body;
    console.log(producttitle, productdescription, saletype,category, price);

const userid=req.user.id
console.log(userid);


const save=await Products.create({
userid,
producname:producttitle,
saletype,
price,
description:productdescription,
category,
isNew:true
})

console.log(save);


  } catch (error) {
    console.log("error in upload product", error);
  }
};

module.exports = { uploadProduct };
