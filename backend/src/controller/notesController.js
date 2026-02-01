import Note from '../model/Node.js';

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid note ID format" });
        }
        res.status(500).json({ message: error.message });
    }
};

export const createNotes = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const note = await Note.create({ title, content });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title && !content) {
            return res.status(400).json({ message: "At least title or content must be provided" });
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (content) updateData.content = content;

        const note = await Note.findByIdAndUpdate(id, updateData, { new: true });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid note ID format" });
        }
        res.status(500).json({ message: error.message });
    }
};

export const deleteNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid note ID format" });
        }
        res.status(500).json({ message: error.message });
    }
};
