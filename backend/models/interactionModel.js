import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Interaction = sequelize.define('Interaction', {
  interaction_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  lead_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  interaction_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interaction_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
});

export default Interaction;
