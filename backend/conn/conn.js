const mongoose = require('mongoose');

const conn = async () => {

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected");
    }catch(err){
        console.log("error in connecting database",err);
    }
};
module.exports = conn;



