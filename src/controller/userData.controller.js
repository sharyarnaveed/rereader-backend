const User = require("../models/user.models");

const userData = async (req, res) => {
  try {
    const userid = req.user.id;
    console.log(userid);

    const data = await User.findByPk(userid, {
      raw: true,
    });

    return res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log("error in userData controller", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const updateUser = async (req, res) => {
  try {
    const userid = req.user.id;

    const {
      firstname,
      lastname,
      email,
      phonenumber,
      address,
      city,
      state,
      zipcode,
    } = req.body;

    console.log(
      firstname,
      lastname,
      email,
      phonenumber,
      address,
      city,
      state,
      zipcode
    );

    const updateinfo = await User.update(
      {
        firstname,
        lastname,
        email,
        phonenumber,
        address,
        city,
        state,
        zipcode,
      },
      {
        where: {
          id: userid,
        },
      }
    );

    if (updateinfo) {
      return res.json({
        message: "Info Updated",
        success: true,
      });
    }
    return res.json({
      message: "Error in Updating info",
      success: false,
    });
  } catch (error) {
    console.log("error in userData controller", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { userData, updateUser };
