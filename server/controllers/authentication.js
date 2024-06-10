const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateToken = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // If no token, return Unauthorized status

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) return res.sendStatus(404); // If user doesn't exist, return Not Found status

    res.json({
      message: "Token validated successfully.",
      user: {
        _id: user._id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Wishlist: user.Wishlist,
        Orders: user.Orders,
        Address: user.Address,
      },
    });
  } catch (ex) {
    console.log(ex);
    res.status(403).send("Forbidden"); // If token verification fails, return Forbidden status
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid credentials.");
    console.log("====================================");
    console.log(email);
    console.log("====================================");
    const validPassword = await bcrypt.compare(password, user.Password);
    if (!validPassword) return res.status(400).send("Invalid credentials.");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.send({ token });
  } catch (ex) {
    console.log(ex);
    res.status(500).send("Server error.");
  }
};
const Logout = (req, res) => {
  res.clearCookie("jwt");
  res.send("Logged out successfully.");
};

const Register = async (req, res) => {
  const { email, password, FirstName, LastName } = req.body;
  try {
    console.log("====================================");
    console.log(email);
    console.log("====================================");
    let user = await User.findOne({ Email: email });
    if (user) {
      console.log(user);
      return res.status(400).send("User already registered.");
    }

    const newUser = new User({
      FirstName,
      LastName,
      Email: email,
      Password: password,
      Wishlist: [],
      Orders: [],
      Address: [],
    });

    const salt = await bcrypt.genSalt(10);
    newUser.Password = await bcrypt.hash(newUser.Password, salt);
    console.log(newUser);
    // Save the user
    await newUser.save();
    res.status(201).send("User registered successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error.");
  }
};

module.exports = { Login, Register, Logout, validateToken };
