const express = require("express");
const User = require("../Models/UserSchema");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const multer = require('multer');
const fileUpload = require('express-fileupload');
const SECRET_KEY = 'jisd3v'
const router = express.Router();
router.use(fileUpload())
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
   cb(null, Date.now() + path.extname(file.originalname));
  }
});


let userController = {};

userController.userSignIn = (req, res) => {
  res.send("Router is working well");
};

userController.userSignInPost = async (req, res) => {
  try {
    console.log('authh',req.headers.authorization)
    console.log("reached login post:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ info: 'User not available, Please signup' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ info: 'Incorrect Password' });
    }

    const userToken = JWT.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "5d",
    });


    // localStorage.setItem("token", token);
    res.status(200).json({ userToken, user })
  } catch (error) {
    console.log("An error occured at login", error.message);
        res.status(500).json({ info: 'An error occured' })
  }
};



userController.userSignUpPost = async (req, res) => {
  console.log("reached post");
  console.log(req.body);
  try {
    const { firstName, lastName, email, password} = req.body;
    const user = await User.findOne({ email }); //check soon

    if (user) {
      console.log("user exist");
      return res.status(400).json({ info: 'Email already exists!' })
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    console.log("success");
    res.json({ signUp: true });
  } catch (error) {
    console.log("An error occured at signup", error.message);
        res.status(500).json({ info: 'An error occured' })
  }
};


userController.fetchUser = async (req, res) => {
  try {

      const user = req.user
      console.log('requested user:',user);
      res.status(200).json({ user })
  } catch (error) {
      console.log("An error occured at fetch User", error.message);
      res.status(500).json({ info: 'An error occured' })
  }

}


userController.editUserProfile =  async (req, res) => {
  try {
      const userId = req.user.id
      console.log('last profile id:',userId)

      const { firstName, lastName, email,selectedPhoto} = req.body;
      const exisitingUser = await User.findOne({ email: email })
      if (exisitingUser && exisitingUser._id.toString() !== userId) {
          return res.status(400).json({ info: 'Email already exists' })
      }
     
      const update = {};
      if (firstName !== 'null') {
          update.firstName = firstName;
      }
      if (lastName !== 'null') {
        update.lastName = lastName;
    }
      if (email !== 'null') {
          update.email = email;
      }
  

      const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true });
      res.status(200).json({info: 'SuccessFully Edited'});
  } catch (error) {
      console.log("An error occured at editProfile", error.message);
      res.status(500).json({ info: 'An error occured while editing profile' })
  }
}


module.exports = userController;
