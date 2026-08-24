const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  
  transactionType: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  
  // Income
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant'
  },
  rentAmount: Number,
  invoiceNumber: String,
  
  // Expense
  expenseCategory: {
    type: String,
    enum: ['maintenance', 'repairs', 'utilities', 'insurance', 'taxes', 'cleaning', 'other'],
    default: 'maintenance'
  },
  expenseDescription: String,
  expenseAmount: Number,
  vendor: String,
  
  // Common Fields
  amount: Number,
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  },
  paymentDate: Date,
  paymentMethod: String, // cash, check, transfer, card
  
  // References
  invoiceUrl: String,
  receiptUrl: String,
  
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

module.exports = mongoose.model('Finance', financeSchema);
