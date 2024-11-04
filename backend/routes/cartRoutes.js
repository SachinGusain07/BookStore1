const router = require("express").Router();
const User = require("../models/user");
const protectRoute = require("../middleware/protectRoute.js");
const checkBookExists = require("../middleware/checkBookExists.js");

//put book to cart 
router.put("/add-to-cart" , protectRoute , checkBookExists , async (req, res) => {
    try{
        const bookId = req.book._id
        const userId = req.user._id
        const isBookInCart = req.user.cart.includes(bookId);
        if (isBookInCart){
        return res.status(400).json({ message: "book already in cart" });
    }


        const user =  await User.findByIdAndUpdate(userId ,{ $push : {cart : bookId}}).select("-password"); 
        res.status(200).json({
        message :"book added to cart",
     });
    }catch (err){
        console.log("error in adding book to cart" , err);
        res.status(500).json({message :"internal server error"});
    }
       

});

//remove book from cart------------------------

router.put ("/remove-from-cart/:bookid" , protectRoute ,checkBookExists , async (req, res) => {
    try{ 
        const bookId = req.params.bookid;
        const bookInCart = req.user.cart.includes(bookId);

        if(!bookInCart){
            return res.status(400).json({message :"book not in cart"});
        }
        await User.findByIdAndUpdate(req.user._id ,{ $pull : {cart : bookId}}).select("-password");
        res.status(200).json({message :"book removed from cart",
            
        });

    }
    catch(err){
        console.log("error in removing book from cart" , err);
        res.status(500).json({message :"internal server error"});
    }
});



//get-all-brook-from cart
router.get("/get-user-cart" , protectRoute , async (req, res) => {
    try{
        const userId = req.user._id;
        const userData =  await User.findById(userId).populate("cart");
        const cart = userData.cart.reverse();
        res.status(200).json({
            message :"success",
            user:cart, 
        })
    }catch(err){
        console.log("error in getting the books added in cart " , err)
        res.status(500).json({message :"internal server error"});
    }
})
module.exports = router;
