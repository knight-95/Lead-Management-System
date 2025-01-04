import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
// Avoid direct reference to Lead here to prevent circular imports
// Lead will be imported in a separate association file
const CallSchedule = sequelize.define('CallSchedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lead_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Leads',  // Reference table name directly
      key: 'id',
    },
  },
  call_frequency: {
    type: DataTypes.INTEGER, // Frequency in days
    allowNull: false,
  },
  last_call_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  next_call_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true, // Include automatic timestamps (createdAt, updatedAt)
});

export default CallSchedule;
