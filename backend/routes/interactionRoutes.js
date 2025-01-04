import express from 'express';
import { addInteraction, getInteractionsByLead } from '../controllers/interactionController.js';

const router = express.Router();

// Route to add a new interaction
router.post('/', addInteraction);

// Route to get all interactions for a specific lead
router.get('/lead/:leadId', getInteractionsByLead);

export default router;
