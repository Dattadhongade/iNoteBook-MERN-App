const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const logger = require("../config/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "dasddasdasd@zfdf";

// Create a user using POST method - endpoint is "/api/auth/createUser".Doesnt require auth.
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
        return res
          .status(400)
          .json({ error: "User already exits. Please use different Email." });
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
          is: user.id,
        },
      };
      logger.info("User created successfully", { userId: user._id });
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
      // res.json(user);
      logger.info("tocken created succesfully for user", {
        email: req.body.email,
      });
    } catch (error) {
      logger.error("Create user failed", {
        message: error.message,
        stack: error.stack,
      });

      res.status(500).send("Something went wrong");
    }
  }
);
module.exports = router;
