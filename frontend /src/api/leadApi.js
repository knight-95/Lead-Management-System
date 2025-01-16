import leadData from "data/leadData";

const BASE_URL = 'http://13.61.169.166:3000';

export const fetchLeads = async () => {
  try {
    const response = await fetch(`${BASE_URL}/leads`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return leadData;
  }
};

export const updateLead = async (leadId, updatedLead) => {
  try {
    const response = await fetch(`${BASE_URL}/leads/${leadId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLead),
    });
    return response.json();
  } catch (error) {
    console.error('Failed to update lead:', error);
  }
};

export const addLead = async (newLead) => {
  try {
    const response = await fetch(`${BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLead),
    });
    return response.json();
  } catch (error) {
    console.error('Failed to add lead:', error);
    throw error; // Let the caller handle the error
  }
};

// Add a lead with optional contacts
export const addLeadWithContacts = async (leadWithContacts) => {
  try {
    const response = await fetch(`${BASE_URL}/leads/with-contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadWithContacts),
    });
    if (!response.ok) {
      throw new Error('Failed to add lead with contacts');
    }
    const newLead = await response.json();
    return newLead;
  } catch (error) {
    console.error('Failed to add lead with contacts:', error);
    throw error;
  }
};

// Delete a lead
export const deleteLead = async (leadId) => {
  try {
    const response = await fetch(`${BASE_URL}/leads/${leadId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete lead');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to delete lead:', error);
    throw error;
  }
};
