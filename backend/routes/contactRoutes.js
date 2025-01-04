import express from "express";
import {
    addContact,
    getContacts,
    updateContact,
  } from "../controllers/contactController.js";

const router = express.Router();

// POST route to add a new contact
router.post("/", addContact);

// GET route to fetch all contacts
router.get("/", getContacts);

// PUT route to update Contact
router.put('/:contactId', updateContact);

export default router;
