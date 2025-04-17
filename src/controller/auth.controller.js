const User = require("../models/user.models.js");
const jwt =require("jsonwebtoken")
const signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      address,
      city,
      state,
      zip,
      password,
    } = req.body;

const hashedpassword=await jwt.sign(password, process.env.SECRET_KEY)
console.log(hashedpassword);




  } catch (error) {
    console.log("error in sign up");
    res.json({
      success: false,
      message: "error in sign up",
    });
  }
};

module.exports = { signup };
