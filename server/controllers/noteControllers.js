const Note = require("../models/Note");

const createNote = async (req, res) => {
  const projectId = req.params.projectId;
  if (!projectId) {
    return res.status(400).json({ message: "ProjectId is required" });
  }
  try {
    const userId = req.user.id;
    const { title, content } = req.body;
    const note = await Note.create({
      author: userId,
      title: title.trim(),
      content: content.trim,
    });
    return res.status(201).json(note);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to create note", error: err.message });
  }
};

const getProjectNotes = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const notes = await Note.find({ projectId });
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({
      message: "Could not fetch notes for the given project",
      error: err.message,
    });
  }
};

const getNoteById = async (req, res) => {
  const { projectId, noteId } = req.params;
  if (!projectId || !noteId) {
    return res
      .status(400)
      .json({ message: "projectId and noteId are required" });
  }
  try {
    const note = Note.findById(noteId);
    if (note.length < 1) {
      return res
        .status(400)
        .json({ message: "Could not find note with given id" });
    }
    return res.status(200).json(note[0]);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not get note", error: err.message });
  }
};

const getUserNotes = async (req, res) => {
  const userId = req.user.id;
  try {
    const notes = await Note.find({ author: userId }).populate(
      "author",
      "name email"
    );
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({
      message: "Could not fetch notes for the given user",
      error: err.message,
    });
  }
};

const updateNote = async (req, res) => {
  const noteId = req.params.noteId;
  try {
    const { content, title } = req.body;
    const updatedNote = await Note.updateOne(
      { _id: noteId },
      { title, content }
    );
    if (updatedNote.matchedCount === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json(updatedNote);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ message: "Could not update note", error: err.message });
  }
};

module.exports = {
  createNote,
  getProjectNotes,
  getNoteById,
  getUserNotes,
  updateNote,
};
