const API_BASE_URL = 'http://localhost:3000';

// Set or update call schedule for a lead
export const setCallSchedule = async (leadId, callFrequency) => {
  try {
    const response = await fetch(`${API_BASE_URL}/call-schedules/${leadId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ call_frequency: callFrequency }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    console.error('Error setting call schedule:', error);
    throw error;
  }
};

// Update call schedule after a call is made
export const updateCallSchedule = async (
  leadId,
  lastCallDate,
  callFrequency = null,
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/call-schedules/${leadId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        last_call_date: lastCallDate,
        call_frequency: callFrequency,
      }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating call schedule:', error);
    throw error;
  }
};

// Get leads requiring calls today
export const getLeadsRequiringCallsToday = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/call-schedules/today`);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching leads requiring calls today:', error);
    throw error;
  }
};

// Get all call schedules
export const getAllCallSchedules = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/call-schedules`);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching all call schedules:', error);
    throw error;
  }
};

// Get all call schedules for a specific lead
export const getCallSchedulesByLeadId = async (leadId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/call-schedules/lead/${leadId}`,
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching call schedules for lead:', error);
    throw error;
  }
};
