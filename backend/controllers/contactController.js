import Contact from '../models/contactModel.js';

// Add new contact
export const addContact = async (req, res) => {
  try {
    const { name, role, phone, email } = req.body;

    // Create the contact
    const newContact = await Contact.create({
      name,
      role,
      phone,
      email,
    });

    res.status(201).json({
      message: 'Contact created successfully',
      contact: newContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating contact',
      error: error.message,
    });
  }
};

// Get all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching contacts',
      error: error.message,
    });
  }
};

// Update contact
export const updateContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { name, role, phone, email } = req.body;

    // Find the contact by ID
    const contact = await Contact.findByPk(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Update contact details
    await contact.update({ name, role, phone, email });

    res.status(200).json({
      message: "Contact updated successfully",
      contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating contact",
      error: error.message,
    });
  }
};

