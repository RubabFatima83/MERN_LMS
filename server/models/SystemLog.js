const mongoose = require('mongoose')

const systemLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  level: { // e.g., info, warning, error
    type: String,
    enum: ['info', 'warning', 'error'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  user: { // optional ref to user who caused the event
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // default: null
  },
  meta: { // any extra info
    type: Object,
    default: {}
  }
})

module.exports = mongoose.model('SystemLog', systemLogSchema)
