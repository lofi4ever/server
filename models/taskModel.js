const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  description: String,
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Task', schema);