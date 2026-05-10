const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    console.log("Register Body:", req.body);

    // Check existing user
    const existingUser = await User.findOne({
      email: email.trim(),
    });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await User.create({

      name,

      email: email.trim(),

      password: hashedPassword,

      role,

    });

    res.status(201).json({

      message: "User registered successfully",

      user,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const email = req.body.email?.trim();

    const password = req.body.password;

    console.log("Login Email:", email);

    const user = await User.findOne({
      email: email,
    });

    console.log("User Found:", user);

    if (!user) {

      return res.status(400).json({
        message: "User not found",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password Match:", isMatch);

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password",
      });

    }

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    res.status(200).json({

      message: "Login successful",

      token,

      user,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


// GET ALL USERS
router.get("/users", async (req, res) => {

  try {

    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


module.exports = router;