import express from "express";
import {
  addLead,
  getLeads,
  associateContacts,
  updateLead,
  addLeadWithContacts,
  deleteLead,
} from "../controllers/leadController.js";

const router = express.Router();

// POST route to add a new lead
router.post("/", addLead);

// POST route to add a new lead with optional contacts
router.post("/with-contacts", addLeadWithContacts);

// GET route to fetch all leads
router.get("/", getLeads);

// POST route to associate contacts with a lead
router.post("/:leadId/contacts", associateContacts);

// PUT route to update lead
router.put("/:leadId", updateLead);

// DELETE lead
router.delete('/:leadId', deleteLead);

export default router;
