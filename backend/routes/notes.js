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
    res.status(500).send("Internal server error ");
  }
});

// Route 2 : add new notes using POST method - endpoint is "/api/notes/addNote".require auth.
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
      // add new note
      const note = await new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
      logger.info("Note added Succesfully", { note: note._id });
    } catch (error) {
      res.status(500).send("Internal server error ");
    }
  },
);

// Route 3 : Update existing note using PUT method - endpoint is "/api/notes/updateNote". require auth.

router.put("/updateNote/:id", getuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Notes.findById(req.params.id);

    // f note not found return a bad request
    if (!note) {
      return res.status(404).send("Note not found ");
    }
    // Check loged in user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }
    // update noote by id
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true },
    );
    res.json({ note });
    logger.info("Note updated Succesfully", { note: note._id });
  } catch (error) {
    logger.error("Create user failed", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).send("Internal server error ");
  }
});

// Route 4 : Delete an  existing note using DELETE method - endpoint is "/api/notes/deleteNote". require auth.

router.delete("/deleteNote/:id", getuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    // f note not found return a bad request
    if (!note) {
      return res.status(404).send("Note not found ");
    }
    // Check loged in user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }
    // delete noote by id
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note hass been deleted", note: note });
    logger.info("Note deleted Succesfully", { note: note._id });
  } catch (error) {
    res.status(500).send("Internal server error ");
  }
});
module.exports = router;
