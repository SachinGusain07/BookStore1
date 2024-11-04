 const router = require("express").Router();
 const User = require ('../models/user');
 const protectRoute = require("../middleware/protectRoute.js");
 const checkBookExists = require("../middleware/checkBookExists.js");

 //add  book to favourites

 router.put("/add-book-to-favourites" , protectRoute , checkBookExists , async (req, res) => {
     try{
        const bookId = req.book._id;
        let user = req.user;
        const userId = req.user._id;
        const isBookfavourite = req.user.favourites.includes(bookId);
        if(isBookfavourite) {
            return res.status(400).json({ message: "book already added to favourites" });
        }

        user =  await User.findByIdAndUpdate(userId ,{ $push : {favourites : bookId}}).select("-password");
        console.log(user);
       

        res.status(200).json({
            message: "book added to favourites",
            user :user,
            
         });
        

     }
     catch(err){
         console.log("error in adding book to favourites", err);
         res.status(500).json({ message: "internal server error", error: err });
     }
     
 });



 // delete the  book from favourites

 router.delete("/remove-book-from-favourites" , protectRoute , checkBookExists , async (req, res) => {

    try{ 
        const bookId = req.book._id;
        const userId =req.user._id;

        const user =  await User.findByIdAndUpdate(userId ,{ $pull : {favourites : bookId}}).select("-password");
        res.status(200).json({
            message: "book removed from favourites",
            user :user,
            
         });

    }
    catch(err){
        console.log("error in removing book from favourites", err);
        res.status(500).json({message :"internal server error"});
    }
 })

 //get favourites book

 router.get("/get-favourites-books" , protectRoute , async (req, res) => {
     try{
        const  userId = req.user._id;

        const userData =  await User.findById(userId).populate("favourites");
        console.log(userData);
        return res.json ({
            status :"success",
            data :userData.favourites}); 
     }
     catch(err){
        console.log("error in getting favourites books", err);
        res.status(500).json({error :"internal server error"});
     }
 })
 module.exports = router;