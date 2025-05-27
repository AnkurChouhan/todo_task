const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ['Urgent', 'High', 'Low'], default: 'Low' }
});

module.exports = mongoose.model('Task', taskSchema);
