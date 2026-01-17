const express = require("express");
const router = express.Router();
const getuser = require("../middleware/getuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const logger = require("../config/logger");

// Route 1 : fetch all notes using get method - endpoint is "/api/notes/fetchAllNotes".Doesnt require auth.
router.get("/fetchAllNotes", getuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    logger.error("Create user failed", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).send("Internal server error ");
  }
});

// Route 2 : add new notes using POST method - endpoint is "/api/notes/addNote".Doesnt require auth.
router.post(
  "/addNote",
  getuser,
  [
    body("title")
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("title is require"),
    body("description")
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("description is require"),
  ],
  async (req, res) => {
    try {
      // used destructuring for short code
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      // return bad request if error accured
      if (!errors.isEmpty()) {
        logger.warn("vallidation faild", { errors: errors.array() });
        return res.status(400).json({ errors: errors.array() });
      }

      const note = await new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      logger.error("Create user failed", {
        message: error.message,
        stack: error.stack,
      });
      res.status(500).send("Internal server error ");
    }
  }
);

module.exports = router;
