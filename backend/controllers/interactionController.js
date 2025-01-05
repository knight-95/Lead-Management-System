import Interaction from "../models/interactionModel.js";

// Add a new interaction
export const addInteraction = async (req, res) => {
  try {
    const { lead_id, interaction_type, interaction_date, details } = req.body;

    const newInteraction = await Interaction.create({
      lead_id,
      interaction_type,
      interaction_date,
      details,
    });

    res.status(201).json({
      message: "Interaction created successfully",
      interaction: newInteraction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating interaction",
      error: error.message,
    });
  }
};

// Get all interactions for a specific lead
export const getInteractionsByLead = async (req, res) => {
  try {
    const { leadId } = req.params;

    const interactions = await Interaction.findAll({
      where: { lead_id: leadId },
    });

    res.status(200).json(interactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching interactions",
      error: error.message,
    });
  }
};

// Controller to get all interactions
export const getAllInteractions = async (req, res) => {
  try {
    // Retrieve all interactions from the database
    const interactions = await Interaction.findAll();

    // Send the interactions as a response
    return res.status(200).json({
      success: true,
      message: "All interactions fetched successfully.",
      data: interactions,
    });
  } catch (error) {
    console.error("Error fetching all interactions:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching interactions.",
      error: error.message,
    });
  }
};
