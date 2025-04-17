const User = require("../models/user.models.js");
const jwt =require("jsonwebtoken");
const { generateNUmber } = require("../utility/generateopt.js");


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

    console.log(process.env.SECRET_KEY);
    
const hashedpassword=await jwt.sign(password, process.env.HASHEDPASSWORD)

console.log(hashedpassword);

const save=await User.create({
  firstname,
  lastname,
  email,
  password:hashedpassword,
  phonenumber,
  address,
  city,
  state,
  zipcode:zip,

})

console.log(save);

const id=generateNUmber();
console.log("otp",id);
res.json("successfully signed up")


  } catch (error) {
    // console.log("error in sign up",error);
    console.log(error.errors[0].message);
    
    res.json({
      success: false,
      message: error.errors[0].message,
    });
  }
};

module.exports = { signup };
