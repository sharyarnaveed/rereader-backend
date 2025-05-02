const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  const accessToken = await jwt.sign({ id: id }, process.env.ACCESSTOKEN, {
    expiresIn: process.env.ACCESSTOKENTIME,
  });

  console.log(
    process.env.REFRESHTOKENTIME,
    process.env.ACCESSTOKENTIME,
    "the time"
  );

  const refreshToken = await jwt.sign({ id: id }, process.env.REFRESHTOKEN, {
    expiresIn: process.env.REFRESHTOKENTIME,
  });

  const Accessoptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1 * 60 * 1000, // 1 hour
  };

  const Refreshoptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  console.log(accessToken,refreshToken,"the tokens");

  return { accessToken, refreshToken, Accessoptions, Refreshoptions };
};

module.exports = { generateToken };
