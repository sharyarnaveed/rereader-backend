const User = require("../models/user.models.js");
const jwt = require("jsonwebtoken");
const { generateNUmber } = require("../utility/generateopt.js");
const { sendopt } = require("../services/sendOpt.js");
const { encrypt } = require("../utility/urlhashing.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../services/GenerateToken.js");

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

    const emailExist = await User.findOne({
      where: {
        email: email,
      },
    });
    if (emailExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const salt=await bcrypt.genSalt(12)

    const hashedpassword = await bcrypt.hash(password,salt);
    const TheOpt = generateNUmber();
    const save = await User.create({
      firstname,
      lastname,
      email,
      password: hashedpassword,
      phonenumber,
      address,
      city,
      state,
      zipcode: zip,
      otp: TheOpt,
    });

    if (!save) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to save user" });
    }

    const Sendmail = await sendopt(TheOpt, email);
    if (!Sendmail) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to send OTP" });
    }

    const encrptedUrlId = await encrypt(save.id.toString());
    console.log(encrptedUrlId);

    return res.json({
      success: true,
      message:
        "A verification mail has been sent to your email, please verify it",
      data: encrptedUrlId,
    });
  } catch (error) {
    console.log("error in sign up", error);
    console.log(error.errors[0].message);

    res.json({
      success: false,
      message: error.errors[0].message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const searchMail = await User.findOne({
      where: {
        email: email,
      },
    });
    
    if (!searchMail) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    try {
    
      const isPasswordValid = await bcrypt.compare(password,searchMail.dataValues.password)
      
      if (isPasswordValid) {
        const token = await generateToken(searchMail.dataValues.id);
        res
        .cookie("accessToken", token.accessToken, token.Accessoptions)
        .cookie("refreshToken", token.refreshToken, token.Refreshoptions);

        
        return res.json({
          success: true,
          message: "Signed in successfully",
        
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid password",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.log("error in sign in", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during sign in",
    });
  }
};

module.exports = { signup, signin };
