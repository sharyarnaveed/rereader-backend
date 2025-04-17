const User = require("../models/user.models.js");
const jwt =require("jsonwebtoken");
const { generateNUmber } = require("../utility/generateopt.js");
const { sendopt } = require("../services/sendOpt.js");


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

const TheOpt=generateNUmber();
console.log("otp",TheOpt);

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
otp:TheOpt
})

if (!save) {
  return res.status(400).json({ message: "Failed to save user" });
  
}


const Sendmail=await sendopt(TheOpt, email);
if(!Sendmail) {
  return res.status(400).json({ message: "Failed to send OTP" });
}
console.log("otp sent successfully");
res.json("successfully signed up")


  } catch (error) {
    console.log("error in sign up",error);
    console.log(error.errors[0].message);
    
    res.json({
      success: false,
      message: error.errors[0].message,
    });
  }
};

module.exports = { signup };
