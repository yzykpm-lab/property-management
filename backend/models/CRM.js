const mongoose = require('mongoose');

const crmSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant'
  },
  
  // Contact Type
  type: {
    type: String,
    enum: ['email', 'phone', 'inperson', 'legal', 'maintenance_request', 'complaint', 'other'],
    required: true
  },
  
  // Subject & Details
  subject: {
    type: String,
    required: true
  },
  
  description: String,
  
  // Contact Info
  contactName: String,
  contactMethod: String, // email/phone
  
  // Follow-up
  followUpRequired: Boolean,
  followUpDate: Date,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Resolution
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open'
  },
  resolutionDate: Date,
  resolutionNotes: String,
  
  // Legal Cases
  legalCase: {
    type: {
      type: String,
      enum: ['eviction', 'payment_collection', 'property_damage', 'other']
    },
    caseNumber: String,
    court: String,
    hearingDate: Date,
    outcome: String
  },
  
  // Attachments
  attachments: [{
    type: String,
    description: String
  }],
  
  // Assigned To
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

module.exports = mongoose.model('CRM', crmSchema);
