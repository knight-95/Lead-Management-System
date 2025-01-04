import { Op } from 'sequelize';
import CallSchedule from '../models/callScheduleModel.js';
import Lead from '../models/leadModel.js';

// Set call frequency and create/update the schedule
export const setCallSchedule = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { call_frequency } = req.body;

    const lead = await Lead.findByPk(leadId);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Check if the lead already has a call schedule
    let callSchedule = await CallSchedule.findOne({ where: { lead_id: leadId } });

    if (!callSchedule) {
      // If no existing schedule, create a new one
      const nextCallDate = new Date();
      nextCallDate.setDate(nextCallDate.getDate() + call_frequency); // Schedule the first call based on frequency

      callSchedule = await CallSchedule.create({
        lead_id: leadId,
        call_frequency,
        last_call_date: null,  // No last call initially
        next_call_date: nextCallDate,
      });
    } else {
      // If there's an existing schedule, update it
      const nextCallDate = new Date();
      nextCallDate.setDate(nextCallDate.getDate() + call_frequency);

      callSchedule.call_frequency = call_frequency;
      callSchedule.next_call_date = nextCallDate;
      await callSchedule.save();
    }

    res.status(200).json({ message: 'Call schedule set successfully', callSchedule });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error setting call schedule',
      error: error.message,
    });
  }
};

// Update the call schedule after a call is made
export const updateCallSchedule = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { last_call_date, call_frequency } = req.body;
    const callSchedule = await CallSchedule.findOne({ where: { lead_id: leadId } });
    if (!callSchedule) {
      return res.status(404).json({ message: 'Call schedule not found' });
    }

    // Update last call date
    callSchedule.last_call_date = last_call_date || new Date();

    // Update call frequency if provided
    if (call_frequency) {
      callSchedule.call_frequency = call_frequency;
    }

    // Calculate next call date based on frequency
    const nextCallDate = new Date(callSchedule.last_call_date);
    nextCallDate.setDate(nextCallDate.getDate() + callSchedule.call_frequency);
    callSchedule.next_call_date = nextCallDate;

    await callSchedule.save();

    res.status(200).json({ message: 'Call schedule updated successfully', callSchedule });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error updating call schedule',
      error: error.message,
    });
  }
};

// Get leads requiring calls today
export const getLeadsRequiringCallsToday = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format

    const leads = await CallSchedule.findAll({
      where: {
        next_call_date: {
          [Op.lte]: today,  // Leads whose next call date is today or earlier
        },
      },
      include: [
        {
          model: Lead,
          required: true, // Join with the Lead model to get lead information
        },
      ],
    });

    res.status(200).json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching leads requiring calls today',
      error: error.message,
    });
  }
};

// Get all call schedules
export const getAllCallSchedules = async (req, res) => {
  try {
    const callSchedules = await CallSchedule.findAll({
      include: [Lead],
    });

    res.status(200).json(callSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching call schedules',
      error: error.message,
    });
  }
};

// Get all call schedules for a specific lead
export const getCallSchedulesByLeadId = async (req, res) => {
  try {
    const { leadId } = req.params;
    const callSchedules = await CallSchedule.findAll({
      where: { lead_id: leadId },
      include: [Lead],
    });

    if (callSchedules.length === 0) {
      return res.status(404).json({ message: 'No call schedules found for this lead' });
    }

    res.status(200).json(callSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching call schedules for lead',
      error: error.message,
    });
  }
};
