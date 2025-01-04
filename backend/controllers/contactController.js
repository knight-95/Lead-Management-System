import Contact from "../models/contactModel.js";
import Lead from "../models/leadModel.js";

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
      message: "Contact created successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating contact",
      error: error.message,
    });
  }
};

// Get all contacts with associated leads
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      include: {
        model: Lead, // Include the associated Lead model
        through: {
          attributes: [], // Optionally, you can exclude the 'through' model columns
        },
      },
    });

    // Map through contacts and extract associated leads
    const contactsWithLeads = contacts.map((contact) => {
      const leads = contact.Leads.map((lead) => ({
        id: lead.id,
        name: lead.name, // Add more details as required (e.g., status, email, etc.)
        status: lead.status, // Assuming there's a `status` field in Lead
        createdAt: lead.createdAt, // Optional - can also include other fields like 'createdAt'
        updatedAt: lead.updatedAt, // Optional - can also include other fields like 'updatedAt'
      }));

      return {
        ...contact.toJSON(),
        leads, // Attach the full leads array to each contact
      };
    });

    res.status(200).json(contactsWithLeads);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching contacts",
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

// Associate contact with multiple leads
export const associateContactWithLeads = async (req, res) => {
  try {
    const { contactId } = req.params; // Extract contactId from the request params
    const { leads } = req.body; // Get the array of lead IDs from the request body

    // Step 1: Find the contact by its ID
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Step 2: Find the leads by their IDs
    const leadInstances = await Lead.findAll({
      where: { id: leads },
    });

    // If no leads found, return an error
    if (leadInstances.length !== leads.length) {
      return res.status(404).json({ message: "Some leads not found" });
    }

    // Step 3: Associate the contact with the leads
    await contact.setLeads(leadInstances);

    // Return success response
    res.status(200).json({
      message: "Contact successfully associated with leads",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error associating contact with leads",
      error: error.message,
    });
  }
};
