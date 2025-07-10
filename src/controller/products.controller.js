

const { where } = require("sequelize");
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

const deleteProduct = async (req, res) => {
  try {
    const { productid } = req.params;
    const userid = req.user.id;

    console.log(productid, userid);

    const deleteproduct = await products.destroy({
      where: {
        productid,
        userid,
      },
    });

    if (deleteProduct) {
      return res.json({
        message: "Product Deleted ",
        success: true,
      });
    } else {
      return res.json({
        message: "Product Not Deleted ",
        success: false,
      });
    }
  } catch (error) {
    console.log("error in deleting", error);
    return res.json({
      message: "error in deleting",
      success: false,
    });
  }
};


const getallprodcts=async(req,res)=>
{
  try {
    
const product=await products.findAll({
  raw:true
},{
  where:{
    status:"unsold"
  }
})

return res.json({
  productdata:product,
  success:true
})

  } catch (error) {
    console.log("error in getting all products",error);

    
  }
}
module.exports = { Userproducts, updateStatus, deleteProduct,getallprodcts };
