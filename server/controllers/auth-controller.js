const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const express = require("express");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the home page again");
  } catch (error) {
    console.log("Error: ", error);
  }
};

// Registration process
const register = async (req, res) => {
  try {
    // check if the email is existing

    const {username, email, password, phone} = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).send({ message: "Email already exists" });

    // To hash the password

    const hash_password = await bcrypt.hash(password, 10);

    const userCreated = await User.create({ username, email, password:hash_password, phone });

    res
      .status(201)
      .json({
        message: "User registered successfully",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString()
        
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};


// User login logic for 

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) return res.status(400).send({ message: "Invalid password" });

    res
     .status(200)
     .json({
        message: "User logged in successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString()
    });

  } catch (error) {
    console.log("Error: ", error);
  }
}

module.exports = { home, register, login };
