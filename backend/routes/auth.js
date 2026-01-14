const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Create a user using POST method - endpoint is "/api/auth/".Doesnt require auth.
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is require"),
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 digit"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then((User) => res.json(User));
    // res.send(req.body);
    // res.json({ Message: "User registered successfully" });
  }
);
module.exports = router;
