const BASE_URL = 'http://13.61.169.166:3000';

// Add or update call schedule
export const addOrUpdateCallSchedule = async (
  leadId,
  callFrequency,
  lastCallDate,
) => {
  try {
    const response = await fetch(`${BASE_URL}/call-schedules/${leadId}`, {
      method: 'POST', // Use 'PUT' if you're updating
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        call_frequency: callFrequency,
        last_call_date: lastCallDate,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add or update call schedule');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding or updating call schedule:', error);
    throw error;
  }
};

// Update call schedule
export const updateCallSchedule = async (
  leadId,
  callFrequency,
  lastCallDate,
) => {
  try {
    const response = await fetch(`${BASE_URL}/call-schedules/${leadId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        call_frequency: callFrequency,
        last_call_date: lastCallDate,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update call schedule');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating call schedule:', error);
    throw error;
  }
};

// Get all call schedules
export const getAllCallSchedules = async () => {
  try {
    const response = await fetch(`${BASE_URL}/call-schedules`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch call schedules');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all call schedules:', error);
    throw error;
  }
};

// Get call schedules by lead ID
export const getCallSchedulesByLeadId = async (leadId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/call-schedules/lead/${leadId}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch call schedules for this lead');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching call schedules by lead ID:', error);
    throw error;
  }
};
