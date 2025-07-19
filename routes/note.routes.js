const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");
const { authenticateToken } = require("../utilities");

router.post("/add-note", authenticateToken, noteController.addNote);
router.put("/edit-note/:noteId", authenticateToken, noteController.editNote);
router.get("/get-all-notes", authenticateToken, noteController.getAllNotes);
router.delete("/delete-note/:noteId", authenticateToken, noteController.deleteNote);
router.put("/update-note-pinned/:noteId", authenticateToken, noteController.updateNotePinned);

module.exports = router;