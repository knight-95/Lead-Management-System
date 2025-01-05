import express from "express";
import {
  addOrUpdateCallSchedule,
  getAllCallSchedules,
  updateCallSchedule
} from "../controllers/callScheduleController.js";

const router = express.Router();

// Add or update call schedule for a lead
router.post("/:leadId", addOrUpdateCallSchedule);

// Update the call schedule after a call is made
router.put("/:leadId", updateCallSchedule);

// Get all call schedules
router.get("/", getAllCallSchedules);

export default router;
