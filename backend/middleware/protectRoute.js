const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protectRoute = async (req, res, next) => {

  try {
    const token = req.cookies.jwt;

    if (!token) {

      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided " });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - invalid token " });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "user not found " });
    }
    req.user = user;
    console.log("User authenticated:", user._id);

    next();
  } catch (error) {
    console.log("error in protectroute middleware ", error.message);

    res.status(500).json({
      error: "internal serveer error : in middleware",
    });
  }
};
module.exports = protectRoute;
