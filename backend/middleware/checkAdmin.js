const express = require("express");
const router = express.Router();
const User = require("../models/user");

const protectRoute = require("../middleware/protectRoute.js");

// Middleware to check if the user is an admin
const checkAdmin = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(401).json({ message: "unauthorized access" });
    }
    next();
  } catch (err) {
    console.log("Error in admin check middleware:", err);
    res.status(500).json({ message: "internal server error", error: err });
  }
};
module.exports = checkAdmin;


// Middleware to check if the bookId is valid and if the book exists
