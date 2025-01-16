import contactData from "data/contactData";

const BASE_URL = 'http://13.61.169.166:3000';

export const fetchContacts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/contacts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return contactData;
  }
};

export const addContact = async (contactData) => {
  try {
    const response = await fetch(`${BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      throw new Error('Failed to add contact');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

export const updateContact = async (contactId, contactData) => {
  const response = await fetch(`${BASE_URL}/contacts/${contactId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    throw new Error('Failed to update contact');
  }

  return response.json();
};

// Associate multiple leads with a contact
export const associateLeadsWithContact = async (contactId, selectedLeadIds) => {
  try {
    const response = await fetch(`${BASE_URL}/contacts/${contactId}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leads: selectedLeadIds }),
    });

    if (!response.ok) {
      throw new Error('Error associating leads');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error associating leads with contact:', error);
    throw error;
  }
};
