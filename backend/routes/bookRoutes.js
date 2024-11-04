const router = require("express").Router();
const User = require("../models/user");
const protectRoute = require("../middleware/protectRoute.js");
const Book = require("../models/book");
const checkAdmin = require("../middleware/checkAdmin.js");
const checkBookExists = require("../middleware/checkBookExists.js");

//add book --admin

router.post("/add-book", protectRoute, checkAdmin, async (req, res) => {
  try {
   
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    res.status(200).json({ message: "book added successfully" });
  } catch (err) {
    console.log("error in adding book ", err);
    res.status(500).json({ message: "internal server error", error: err });
  }
});

//update books --admin

router.put(
  "/update-book",
  protectRoute,
  checkAdmin,
  checkBookExists,
  async (req, res) => {
    try {
      const bookId = req.book._id;

      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: "book not found" });
      }
      await Book.findByIdAndUpdate(
        bookId,
        {
          url: req.body.url,
          title: req.body.title,
          author: req.body.author,
          price: req.body.price,
          desc: req.body.desc,
          language: req.body.language,
        },
        { new: true }
      );
      return res.status(200).json({ message: "book updated successfully" });
    } catch (err) {
      console.log("error in updating the book ", err);
      res.status(500).json({ message: "internal server error" });
    }
  }
);


//delete the book
router.delete(
  "/delete-book",
  protectRoute,
  checkAdmin,
  checkBookExists,
  async (req, res) => {
    try {
      const bookId = req.book._id;
      await Book.findByIdAndDelete(bookId);
      return res.status(200).json({ message: "book deleted successfully" });
    } catch (err) {
      console.log("error in deleting the book ", err);
      res.status(401).json({ message: "internal server error" });
    }
  }
);

// get  all books to all user
router.get("/get-all-books" ,protectRoute ,async (req, res) => {
    try{

        const books = await Book.find().sort({createdAt:-1});
        return res.status(200).json({
            status :"success",
            data :books,
        });
        
        

    }catch(err)
    {
        console.log("error in book route", err);
        res.status(500).json({ message: "internal server error", error: err });
    }
  
});

//get recently added books  to all user

router.get("/get-recent-books" ,  async (req, res) => { 

    try{
        const books = await Book.find().sort({createdAt:-1}).limit(4);
        res.status(200).json({
            message:"success",
            data :books,
        });

    }catch(err){
        console.log("error in getting recent books ", err);
        res.status(500).json({error:"internal server  error "})
    }

});


//get data of specific books  to all user

router.get("/get-book-by-id/:id",  async (req, res) => { 

    try{
        const book = await Book.findById(req.params.id);

        return res.status(200).json({
            message :"success",
            data :book,
        })
     }catch(err){
        console.log("error in getting book data ", err);
        res.status(200).json({message :"Internal server error "})
    }
})



module.exports = router;