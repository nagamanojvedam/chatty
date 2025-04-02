const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token)
      return res.status(400).json({
        status: "error",
        message: "Invalid or Expired token",
      });

    const decoded = jwt.verify(toke, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(400).json({
        status: "error",
        message: "Invalid or Expired token",
      });

    const user = await User.findOne(decoded.userId).select("-password");

    if (!user)
      return res.status(400).json({
        status: "error",
        message: "User not found",
      });

    req.user = user;
    next();
  } catch (err) {
    console.error(`Error in protect Route middleware: ${err.message}`);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
