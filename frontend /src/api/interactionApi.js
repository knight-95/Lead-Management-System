import interactionsByLead from "data/interactionByLead";
import interactionsData from "data/interactionData";

const BASE_URL = 'http://13.61.169.166:3000';

// Fetch all interactions
export const fetchAllInteractions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/interactions`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Return all interactions
  } catch (error) {
    console.error('Failed to fetch all interactions:', error);
    return interactionsData; // Return an empty array in case of an error
  }
};

// Fetch all interactions for a specific lead
export const fetchInteractionsByLead = async (leadId) => {
  try {
    const response = await fetch(`${BASE_URL}/interactions/lead/${leadId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch interactions:', error);
    return interactionsByLead;
    // return [];
  }
};

// Add a new interaction
export const addInteraction = async (interactionData) => {
  try {
    const response = await fetch(`${BASE_URL}/interactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interactionData),
    });

    if (!response.ok) {
      throw new Error('Failed to add interaction');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding interaction:', error);
    throw error;
  }
};
