const router = require('express').Router();
const Book = require('../models/book');
const order = require('../models/order');
const protectRoute = require('../middleware/protectRoute');
const checkAdmin = require('../middleware/checkAdmin');

//place order 
router.post('/place-order', protectRoute ,async (req, res) => { 

    try{ 
        const userId= req.user_id;
        const {order} = req.body;
        
        for (const orderData of order){
            const newOrder = new order({user :userId , book : orderData._id});
            const orderDataFromDb = await newOrder.save(); // saving order into user model
            
            await UserActivation.findByIdAndUpdate(userId , {
                $push:{order : orderDataFromDb._id}
            });

            //clearing cart
            await User.findByIdAndUpdate(id , {
                $pull:{order :orderDataFromDb._id},
            });
            return res.status(200).json({
                status : 'success',
                message :"order placed successfully",
            });      
        }

    }catch(err){
        console.log("error in ordering the product");
        res.status(500).json({message:"internal server error"});

    }

  })


  //get order history of the particular user 
  router.get ("/get-order-history" , protectRoute , async (req, res) => {

    try{ 
        const userId = req.user._id;
        const userData = await User.findById(userId).populate({
            path:"order",
            populate: {
                path:"book"
            }
        });
        const ordersData = userData.order.reverse();
        res.status(200).json({
            message:"success",
            user: ordersData,

        })
 
        
    }catch(err){
        console.log("error in getting the order history");
        res.status(500).json({message: "internal server error"})
    }
  });

  //get -all-orders -----admin

  router.get("/get-all-orders" , protectRoute ,checkAdmin, async (req, res) => {

    try{
        
        const userData = await order.find()
        .populate({
            path :"book",
        }).populate({
            path :"user",
        })
        .sort({createdAt :-1}) ;
        return res.status(200).json({
            status :"success",
            data:userData,
        })

    }catch(err){
        console.log("error in getting all orders --admin" , err);
        res.status(500).json({message :"internal server error"});
    }
  })

  // update order --admin

  router.put("/update-status/:id", protectRoute , checkAdmin, async (req, res) => {

    try{ 
        const {id}  = req.params;
        await order.findByIdAndUpdate(id , {
            $set : {status : req.body.status}
        });
        return res.status(200).json({
            status : 'success',
            message :"status of order updated successfully",
        });
     
    }catch(err){
        console.log("error in updating the order --admin" , err);
        res.status(500).json({message :"internal server error "})
    }
  })

  module.exports = router