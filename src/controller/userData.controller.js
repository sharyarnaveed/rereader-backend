const userData = async (req, res) => {
  try {
  } catch (error) {
    console.log("error in userData controller", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { userData };
