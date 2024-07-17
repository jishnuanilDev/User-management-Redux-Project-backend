const express = require("express");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../Models/UserSchema");

const SECRET_KEY = "jisd3v";
const adminController = {};

adminController.loginPost = (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const credentials = {
      email: "jishnu@gmail.com",
      password: "jis321",
    };

    if (credentials.email != email) {
      return res.status(400).json({ info: "Admin not found" });
    }
    if (credentials.password != password) {
      return res.status(400).json({ info: "Invalid Password" });
    }

    const adminToken = JWT.sign({ email: credentials.email }, SECRET_KEY, {
      expiresIn: "5d",
    });
    res.status(200).json({ adminToken });
  } catch (error) {
    console.log("An error occured at login", error.message);
    res.status(500).json({ info: "An error occured" });
  }
};

adminController.getUsers = async (req, res) => {
  try {
    console.log("getUsersAdmin here got it");
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log("An error occured at admin dashboard users", error.message);
    res.status(500).json({ info: "An error occured" });
  }
};

adminController.adminEditUser = async (req, res) => {
  try {
    console.log("ethitting", req.params.id);
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ info: "User not available" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log("An error occured at admin edit users", error.message);
    res.status(500).json({ info: "An error occured" });
  }
};

adminController.adminEditUserPost = async (req, res) => {
    try {
      console.log("post edit user-post UserIDDDD", req.params.id);

  console.log('editUserdata...:',req.body)
      const userId = req.params.id;
      if (!userId) {
        return res
          .status(400)
          .json({ info: "User ID is missing in the request" });
      }
  
      const { firstNameEdit,lastNameEdit,emailEdit } = req.body;
  
  const newEmail = emailEdit;
      const existingEmail = await User.findOne({ newEmail });
      if (existingEmail && existingEmail._id.toString() !== userId) {
        return res.status(400).json({ info: "Email already exists" });
      }
  
      // Use { new: true } option to return the modified document
     await User.findByIdAndUpdate(userId, {
       firstName: firstNameEdit,
        LastName:lastNameEdit,
        email:emailEdit,
      });
  
  
      return res.status(200).json({ info: "Updated Successfully" });
    } catch (error) {
      console.log("An error occurred at admin edit users", error.message);
      res.status(500).json({ info: "An error occurred due to edit user" });
    }
  };
  

adminController.adminDeleteUser = async (req, res) => {
  try {
    console.log("ktti ivdee delete id:", req.params.id);
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
  } catch (error) {
    console.log("An error occured at admin dashboard users", error.message);
    res.status(500).json({ info: "An error occured due to delete user" });
  }
};
module.exports = adminController;
