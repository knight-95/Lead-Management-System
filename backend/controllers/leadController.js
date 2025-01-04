import Lead from "../models/leadModel.js";
import Contact from "../models/contactModel.js";

// Add new lead
export const addLead = async (req, res) => {
  try {
    const { restaurantName, address, phone, email, leadStatus, contacts } =
      req.body;

    // Create the lead
    const newLead = await Lead.create({
      restaurantName,
      address,
      phone,
      email,
      leadStatus,
    });

    // If there are contacts, associate them with the lead
    if (contacts && contacts.length > 0) {
      // Find all contacts
      const contactInstances = await Contact.findAll({
        where: { id: contacts },
      });

      // Associate the contacts with the new lead
      await newLead.setContacts(contactInstances);
    }

    res.status(201).json({
      message: "Lead created successfully",
      lead: newLead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating lead",
      error: error.message,
    });
  }
};

// Get all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll({
      include: Contact,
    });
    res.status(200).json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching leads",
      error: error.message,
    });
  }
};

// Update lead
export const updateLead = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { restaurantName, address, phone, email, leadStatus, contacts } =
      req.body;

    // Find the lead by ID
    const lead = await Lead.findByPk(leadId);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Update lead details
    await lead.update({ restaurantName, address, phone, email, leadStatus });

    // If there are contacts, associate them with the lead
    if (contacts && contacts.length > 0) {
      // Find or create contacts
      const contactInstances = await Promise.all(
        contacts.map(async (contact) => {
          let existingContact = await Contact.findOne({
            where: { name: contact.name },
          });
          if (!existingContact) {
            existingContact = await Contact.create(contact);
          }
          return existingContact;
        })
      );

      // Associate the contacts with the lead
      await lead.setContacts(contactInstances);
    }

    res.status(200).json({
      message: "Lead updated successfully",
      lead,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating lead",
      error: error.message,
    });
  }
};

// Associate contacts with a lead
export const associateContacts = async (req, res) => {
  try {
    const { leadId } = req.params;
    const { contacts } = req.body;

    // Find the lead by ID
    const lead = await Lead.findByPk(leadId);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Find the contacts by their IDs
    const contactInstances = await Contact.findAll({
      where: { id: contacts },
    });

    // Associate the contacts with the lead
    await lead.setContacts(contactInstances);

    res.status(200).json({
      message: "Contacts associated successfully with the lead",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error associating contacts with the lead",
      error: error.message,
    });
  }
};

export const addLeadWithContacts = async (req, res) => {
  try {
    const { restaurantName, address, phone, email, leadStatus, contacts } =
      req.body;

    const transaction = await Lead.sequelize.transaction();

    try {
      // Create the lead
      const newLead = await Lead.create(
        {
          restaurantName,
          address,
          phone,
          email,
          leadStatus,
        },
        { transaction }
      );

      // If contacts are provided, create and associate them
      if (contacts && contacts.length > 0) {
        const contactInstances = await Promise.all(
          contacts.map((contact) => Contact.create(contact, { transaction }))
        );

        // Associate the contacts with the new lead
        await newLead.setContacts(contactInstances, { transaction });
      }

      // Commit the transaction
      await transaction.commit();

      res.status(201).json({
        message: "Lead created successfully with contacts",
        lead: newLead,
      });
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating lead with contacts",
      error: error.message,
    });
  }
};
