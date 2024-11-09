const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateTokenAndSetCookie = require("../utils/generateToken.js");
const protectRoute = require("../middleware/protectRoute.js");

//signup

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    //password and username length should more than 4
    if (username.length < 4 || password.length < 4) {
      return res
        .status(400)
        .json({ message: "username and password must have 4 character" });
    }

    //check username already exists ?
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "username already exists" });
    }
    ///email already exists
    const existingMail = await User.findOne({ email: email });

    if (existingMail) {
      return res.status(400).json({ message: "email already exists" });
    }
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
      address: address,
    });
    await newUser.save();
    console.log(newUser);
    res.status(200).json({ message: "SignUp Successful" });
  } catch (err) {
    console.log("error in signup", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);

    const userResponse = { ...user.toObject(), password: undefined };

    console.log("sign-in sucessfull");
    res.status(200).send(userResponse);
  } catch (err) {
    console.log("error in sign-in", err);
  }
});

//updating user address
router.put("/update-address", protectRoute, async (req, res) => {
  try {
    let user = req.user;
    const updateAddress = req.body.address;
    console.log(updateAddress);
    user = await User.findByIdAndUpdate(
      user._id,
      { address: updateAddress },
      { new: true }
    );
    console.log(user);
    res.status(200).json({ message: "address updated" });
  } catch (err) {
    console.log("error in update address", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/logout" , async (req, res) => {
    try {
      res.clearCookie("jwt" , { httpOnly: true, sameSite: "strict" });
      res.cookie("jwt", " ", { maxAge: 0  ,httpOnly: true, sameSite: "strict" });
      res.status(200).json({ message: "Logged out successfully" });
      console.log("Logged out successfully");
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
