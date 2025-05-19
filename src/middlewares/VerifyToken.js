const jwt = require("jsonwebtoken");

const verifyjwt = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    const refreshToken = req.cookies?.refreshToken;

    if (!accessToken) {
      if (!refreshToken) {
        // When don't have any access or refresh token
        return res.status(401).json({
          message: "Unauthorized, no tokens provided",
          success: false,
        });
      } else {
        // When have refresh token
        try {
          const refreshData = jwt.verify(
            refreshToken,
            process.env.REFRESHTOKEN
          );

          const newAccessToken = jwt.sign(
            { id: refreshData.id },
            process.env.ACCESSTOKEN,
            { expiresIn: process.env.ACCESSTOKENTIME }
          );

          const Accessoptions = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
          };

          res.cookie("accessToken", newAccessToken, Accessoptions);
          req.user = refreshData;
          return next();
        } catch (refreshError) {
          return res.status(401).json({
            message: "Invalid refresh token",
            success: false,
          });
        }
      }
    } else {
      // When have access token
      try {
        const decoded = jwt.verify(accessToken, process.env.ACCESSTOKEN);
        req.user = decoded;
        return next();
      } catch (tokenError) {
        // If access token invalid but refresh token exists, could redirect to refresh flow
        if (refreshToken) {
          // Recursive call to try the refresh token path
          req.cookies.accessToken = null;
          return verifyjwt(req, res, next);
        }

        return res.status(401).json({
          message: "Invalid access token",
          success: false,
        });
      }
    }
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(500).json({
      message: "Internal server error during authentication",
      success: false,
    });
  }
};

module.exports = { verifyjwt };
