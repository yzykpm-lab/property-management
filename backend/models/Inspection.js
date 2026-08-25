const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  
  inspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  inspectionDate: Date,
  nextInspectionDate: Date,
  
  // Checklist
  checklist: [{
    item: String,
    checked: Boolean,
    status: String // ok, issue, needs_repair
  }],
  
  // Findings
  findings: [{
    category: String, // electrical, plumbing, structural, cleanliness, etc
    description: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    requiresAction: Boolean
  }],
  
  // Images/Attachments
  attachments: [{
    type: String, // file URLs
    description: String
  }],
  
  // Recommendations
  recommendations: [String],
  estimatedRepairCost: Number,
  
  // Follow-up
  actionItemsCreated: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MaintenanceTask'
  }],
  
  notes: String,
  status: {
    type: String,
    enum: ['completed', 'pending', 'needs_followup'],
    default: 'completed'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inspection', inspectionSchema);
