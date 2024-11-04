const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const protectRoute = require("../middleware/protectRoute.js");

const checkBookExists = async (req, res, next) => {
    try {
      const bookId = req.headers.bookid || req.params.bookid;
      if (!bookId) {
        return res.status(400).json({ message: "bookId is required" });
      }
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: "book not found" });
      }
      req.book = book; 
      next();
    } catch (err) {
      console.log("Error in book existence check middleware:", err);
      res.status(500).json({ message: "internal server error", error: err });
    }
  };
  module.exports = checkBookExists;
  