import express from 'express';
import { getNotes, getNote, updateNotes, createNotes, deleteNotes } from '../controller/notesController.js';

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;