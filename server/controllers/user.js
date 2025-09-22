const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");
const { errorHandler } = require("../errorHandler");

// Register a new user
module.exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Validate name
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters long" });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name.trim(),
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "Registered successfully",
      userId: savedUser._id,
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

// Login a user
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const accessToken = auth.createAccessToken(user);

    return res.status(200).json({
      access: accessToken,
      isAdmin: user.isAdmin,
      userId: user._id,
      name: user.name
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

// Get logged-in user details
module.exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};