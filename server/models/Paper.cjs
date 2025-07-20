const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  authors: [{
    type: String,
    required: true,
    trim: true
  }],
  publicationDate: {
    type: Date,
    required: true
  },
  abstract: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['CV', 'NLP', 'RL', 'ML', 'AI', 'Other']
  },
  summary: {
    problem: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    dataset: {
      type: String,
      required: true
    },
    keyResults: {
      type: String,
      required: true
    },
    takeaway: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
});

// Add text index for search functionality
paperSchema.index({
  title: 'text',
  abstract: 'text',
  'authors': 'text',
  'summary.problem': 'text',
  'summary.method': 'text',
  'summary.takeaway': 'text'
});

module.exports = mongoose.model('Paper', paperSchema);