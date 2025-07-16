import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Function to handle user registration and store data in the database
async function register(req, res) {
  try {
    const { name, username, password } = req.body;
    const is_user = await User.findOne({ username: username });
    if (is_user)
      return res.status(400).json({ message: "Username is already Exist" });
    const securepassword = await bcrypt.hash(password, 12);
    const user = await User({
      name: name,
      username: username,
      password: securepassword,
    });
    await user.save();
    const token = jwt.sign({ username: username }, process.env.JWT_KEY, {
      expiresIn: "30d",
    });
    res.status(201).json({ message: "Register Successfull", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Try Again Later.." });
  }
}

// Function to handle user login and store data in the database
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const is_user = await User.findOne({ username: username });
    if (!is_user) return res.status(400).json({ message: "Invalid Username" });
    const is_true = await bcrypt.compare(password, is_user.password);
    if (!is_true) return res.status(400).json({ message: "Invalid Password" });
    const token = jwt.sign({ username: username }, process.env.JWT_KEY, {
      expiresIn: "30d",
    });
    res.status(201).json({ message: "Login Successfull", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Try Again Later.." });
  }
}

export default { login, register };
