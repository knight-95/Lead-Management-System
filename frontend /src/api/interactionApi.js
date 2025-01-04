const BASE_URL = 'http://localhost:3000'; // Update this if your API runs on a different port or URL

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
    return [];
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
