const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  // Personal Info
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  idNumber: String,
  phone: String,
  email: String,
  
  // Rental Info
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  unit: String,
  leaseStartDate: Date,
  leaseEndDate: Date,
  monthlyRent: Number,
  securityDeposit: Number,
  
  // Payment Status
  paymentStatus: {
    type: String,
    enum: ['paid', 'partial', 'overdue', 'unpaid'],
    default: 'paid'
  },
  amountOwed: {
    type: Number,
    default: 0
  },
  
  // Tenant Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'eviction'],
    default: 'active'
  },
  
  // Issues
  issues: [{
    description: String,
    reportedDate: Date,
    resolved: Boolean,
    resolvedDate: Date
  }],
  
  // Contact Log
  contactLog: [{
    date: Date,
    method: String, // email, phone, inperson
    subject: String,
    notes: String
  }],
  
  notes: String,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tenant', tenantSchema);
