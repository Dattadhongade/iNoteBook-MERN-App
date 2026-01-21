const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const logger = require("../config/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getuser = require("../middleware/getuser");
const Users = require("../models/Users");

const JWT_SECRET = "dasddasdasd@zfdf";

// ===================================================================================//

// Route 1: Create a user using POST method - endpoint is "/api/auth/createUser".Doesnt require auth.
router.post(
  "/createUser",
  [
    body("name").trim().notEmpty().withMessage("Name is require"),
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 digit"),
  ],
  async (req, res) => {
    let succes = false;
    const errors = validationResult(req);
    // return bad request if error accured
    if (!errors.isEmpty()) {
      logger.warn("vallidation faild", { errors: errors.array() });
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      logger.info("Checking duplicate user", { email: req.body.email });
      // logic to check duplicate user
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        logger.warn("Duplicate user found", { email: req.body.email });
        success = false;
        return res.status(400).json({
          success,
          error: "User already exits. Please use different Email.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      logger.info("User created successfully", { userId: user._id });

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
      // res.json(user);
      logger.info("tocken created succesfully for user", {
        email: req.body.email,
      });
    } catch (error) {
      logger.error("Create user failed", {
        message: error.message,
        stack: error.stack,
      });
      res.status(500).send("Internal server error ");
    }
  },
);

// =======================================================================================//

// Route 2: authenticate a user using POST method - endpoint is "/api/auth/loginUser".Doesnt require auth.
router.post(
  "/loginUser",
  [
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 digit"),
  ],

  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // return bad request if error accured
    if (!errors.isEmpty()) {
      logger.warn("vallidation faild", { errors: errors.array() });
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      // Find user
      let user = await User.findOne({ email });
      if (!user) {
        logger.warn("Invalid login attempt", { email });
        return res
          .status(400)
          .json({ error: "Please enter correct credentials" });
      }

      // Compare password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        logger.warn("password mismatch", { userId: user._id });
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please enter correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      logger.info("User found successfully", { userId: user._id });
      // Generate JWT
      const authToken = jwt.sign(
        { id: user._id }, // payload
        JWT_SECRET,
      );
      // Send response
      success = true;
      res.status(200).json({
        message: "Login Successfull",
        success,
        authToken,
      });
      // res.json({ authToken });
    } catch (error) {
      logger.error("Create user failed", {
        message: error.message,
        stack: error.stack,
      });
      res.status(500).send("Internal server error ");
    }
  },
);

// =======================================================================================//

// Route 3 : get a user details  using POST method - endpoint is "/api/auth/getUser".login require .

router.get("/getUser", getuser, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    logger.error("Get user failed", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).send("Internal server error");
  }
});
// Route 4: GET /api/auth/fetchAllUsers
// Login required
router.get("/fetchAllUsers", getuser, async (req, res) => {
  try {
    const users = await Users.find().select("-password");
    res.json(users);
  } catch (error) {
    logger.error("Get user failed", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
