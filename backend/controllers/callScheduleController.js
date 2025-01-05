import CallSchedule from "../models/callScheduleModel.js";
import Lead from "../models/leadModel.js"; // Import the Lead model

export const addOrUpdateCallSchedule = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { call_frequency, last_call_date } = req.body;

    // Ensure the last_call_date is valid
    const parsedLastCallDate = new Date(last_call_date);
    if (isNaN(parsedLastCallDate)) {
      return res.status(400).json({
        message: "Invalid last_call_date format",
      });
    }

    // Calculate the next call date
    const nextCallDate = new Date(
      parsedLastCallDate.getTime() + call_frequency * 24 * 60 * 60 * 1000
    ); // Add frequency in days (converted to milliseconds)

    // Check if a call schedule already exists for this lead
    let callSchedule = await CallSchedule.findOne({
      where: { lead_id: leadId },
      include: Lead, // Include the associated Lead fields
    });

    if (!callSchedule) {
      // If no existing schedule, create a new one
      callSchedule = await CallSchedule.create({
        lead_id: leadId,
        call_frequency,
        last_call_date: parsedLastCallDate,
        next_call_date: nextCallDate,
      });

      // Fetch the lead associated with the newly created call schedule
      const lead = await Lead.findByPk(leadId);

      return res.status(201).json({
        message: "Call schedule created successfully",
        callSchedule,
        lead, // Send the associated lead data in the response
      });
    } else {
      // If there's an existing schedule, update it
      callSchedule.call_frequency = call_frequency;
      callSchedule.last_call_date = parsedLastCallDate;
      callSchedule.next_call_date = nextCallDate;

      await callSchedule.save();

      // Fetch the lead associated with the updated call schedule
      const lead = await Lead.findByPk(leadId);

      return res.status(200).json({
        message: "Call schedule updated successfully",
        callSchedule,
        lead, // Send the associated lead data in the response
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error adding or updating call schedule",
      error: error.message,
    });
  }
};

export const updateCallSchedule = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { call_frequency, last_call_date } = req.body;

    const callSchedule = await CallSchedule.findOne({
      where: { lead_id: leadId },
      include: Lead, // Include the associated Lead fields
    });

    if (!callSchedule) {
      return res
        .status(404)
        .json({ message: "Call schedule not found for this lead" });
    }

    // Ensure the last_call_date is valid
    const parsedLastCallDate = new Date(last_call_date);
    if (isNaN(parsedLastCallDate)) {
      return res.status(400).json({
        message: "Invalid last_call_date format",
      });
    }

    // Calculate the next call date
    const nextCallDate = new Date(
      parsedLastCallDate.getTime() + call_frequency * 24 * 60 * 60 * 1000
    ); // Add frequency in days (converted to milliseconds)

    // Update the call schedule fields that are provided
    if (call_frequency !== undefined) {
      callSchedule.call_frequency = call_frequency;
    }

    if (last_call_date) {
      callSchedule.last_call_date = last_call_date;
    }

    // Ensure that nextCallDate is correct and set it
    callSchedule.next_call_date = nextCallDate;

    // Save the updated schedule
    await callSchedule.save();

    res.status(200).json({
      message: "Call schedule updated successfully",
      callSchedule,
      lead: callSchedule.Lead, // The Lead is already included in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating call schedule",
      error: error.message,
    });
  }
};

export const getAllCallSchedules = async (req, res) => {
  try {
    const callSchedules = await CallSchedule.findAll({
      include: Lead, // Include the associated Lead fields
    });

    if (callSchedules.length === 0) {
      return res.status(404).json({ message: "No call schedules found" });
    }

    res.status(200).json(callSchedules); // The Lead fields will be included in each CallSchedule
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching call schedules",
      error: error.message,
    });
  }
};

export const getCallSchedulesByLeadId = async (req, res) => {
  try {
    const { leadId } = req.params;

    const callSchedules = await CallSchedule.findAll({
      where: { lead_id: leadId },
      include: Lead, // Include the associated Lead fields
    });

    if (!callSchedules || callSchedules.length === 0) {
      return res
        .status(404)
        .json({ message: "No call schedules found for this lead" });
    }

    res.status(200).json(callSchedules); // The Lead fields will be included in each CallSchedule
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching call schedules for this lead",
      error: error.message,
    });
  }
};
