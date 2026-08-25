const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  // Basic Info
  propertyName: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  propertyType: {
    type: String,
    enum: ['residential', 'commercial', 'office', 'mixed'],
    default: 'residential'
  },
  units: [{
    unitNumber: String,
    size: Number, // sqm
    bedrooms: Number,
    bathrooms: Number
  }],
  
  // Owner Info
  ownerName: String,
  ownerPhone: String,
  ownerEmail: String,
  
  // Financial
  purchasePrice: Number,
  purchaseDate: Date,
  monthlyIncome: Number,
  
  // Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  
  // Assigned Inspector
  assignedInspector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Documents
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadedAt: Date
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

module.exports = mongoose.model('Property', propertySchema);
