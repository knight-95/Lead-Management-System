import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Contact from "./contactModel.js";

const Lead = sequelize.define(
  "Lead",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurantName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    leadStatus: {
      type: DataTypes.ENUM("New", "Contacted", "Converted", "FollowUp"),
      defaultValue: "New",
    },
  },
  {
    timestamps: true,
  }
);

// Many-to-Many relationship between Lead and Contact
Lead.belongsToMany(Contact, {
  through: "LeadContacts",
  timestamps: false,
  onDelete: "CASCADE",
});
Contact.belongsToMany(Lead, {
  through: "LeadContacts",
  timestamps: false,
  onDelete: "CASCADE",
});

export default Lead;
