const Note = require("../models/note.model");

exports.addNote = async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) return res.status(400).json({ error: true, message: "Title is required" });
    if (!content) return res.status(400).json({ error: true, message: "Content is required" });

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({ error: false, note, message: "Note added successfully" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

exports.editNote = async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags && isPinned === undefined) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) return res.status(404).json({ error: true, message: "Note not found" });

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned !== undefined) note.isPinned = isPinned;

        await note.save();

        return res.json({ error: false, note, message: "Note updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

exports.getAllNotes = async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
        return res.json({ error: false, notes, message: "All notes retrieved successfully" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

exports.deleteNote = async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) return res.status(404).json({ error: true, message: "Note not found" });

        await Note.deleteOne({ _id: noteId, userId: user._id });
        return res.json({ error: false, message: "Note deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

exports.updateNotePinned = async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) return res.status(404).json({ error: true, message: "Note not found" });

        note.isPinned = isPinned;
        await note.save();

        return res.json({ error: false, note, message: "Note updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};