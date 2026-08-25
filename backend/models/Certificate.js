const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  
  certificateType: {
    type: String,
    enum: [
      'building_permit',      // היתר בנייה
      'gas_safety',           // בטיחות גז
      'insurance',            // ביטוח
      'fire_safety',          // אש
      'hmo_license',          // רישיון HMO
      'electrical',           // חשמל
      'plumbing',             // אינסטלציה
      'structural',           // מבנה
      'other'
    ],
    required: true
  },
  
  certificateName: String,
  issueDate: Date,
  expiryDate: Date,
  issuer: String,
  certificateNumber: String,
  
  // Document
  documentUrl: String,
  documentName: String,
  
  // Status
  status: {
    type: String,
    enum: ['valid', 'expiring_soon', 'expired', 'renewal_needed'],
    default: 'valid'
  },
  
  // Alerts
  alertDaysBeforeExpiry: {
    type: Number,
    default: 30
  },
  
  notes: String,
  renewalDate: Date,
  renewalCost: Number,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Check expiry status before saving
certificateSchema.pre('save', function(next) {
  const today = new Date();
  const alertDate = new Date(this.expiryDate);
  alertDate.setDate(alertDate.getDate() - this.alertDaysBeforeExpiry);
  
  if (this.expiryDate < today) {
    this.status = 'expired';
  } else if (today >= alertDate && today < this.expiryDate) {
    this.status = 'expiring_soon';
  } else {
    this.status = 'valid';
  }
  
  next();
});

module.exports = mongoose.model('Certificate', certificateSchema);
