import Lead from './leadModel.js';
import CallSchedule from './callScheduleModel.js';

// Define associations
Lead.hasMany(CallSchedule, { foreignKey: 'lead_id' });
CallSchedule.belongsTo(Lead, { foreignKey: 'lead_id' });

export { Lead, CallSchedule };


