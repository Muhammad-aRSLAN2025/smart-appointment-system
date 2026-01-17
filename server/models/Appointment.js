const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceName: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, default: 'pending' }
});
module.exports = mongoose.model('Appointment', AppointmentSchema);