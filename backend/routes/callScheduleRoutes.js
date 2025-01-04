import express from "express";
import {
  setCallSchedule,
  updateCallSchedule,
  getLeadsRequiringCallsToday,
  getAllCallSchedules,
  getCallSchedulesByLeadId,
} from "../controllers/callScheduleController.js";

const router = express.Router();

// Set call schedule for a lead
router.put("/:leadId/call-schedule", setCallSchedule);

// Update the call schedule after a call is made
router.put("/:leadId/update-call", updateCallSchedule);

// Get all leads requiring calls today
router.get("/calls-today", getLeadsRequiringCallsToday);

// Get all call schedules
router.get("/", getAllCallSchedules);

// Get all call schedules for a specific lead
router.get("/lead/:leadId", getCallSchedulesByLeadId);

export default router;
