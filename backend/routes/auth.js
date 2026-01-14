const express = require("express");
const User = require("../models/Users");
const router = express.Router();

// Create a user using POST method - endpoint is "/api/auth/".Doesnt require auth.
router.post("/", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  user.save();

  res.json(req.body);
});
module.exports = router;
