const mongoose = require('mongoose');

const TotalRevenuePointSchema = new mongoose.Schema({
  date:     { type: Date,   required: true },
  label:    { type: String, required: true }, // e.g., 'Jan'
  income:   { type: Number, required: true },
  expenses: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
}, { timestamps: true });

// Ensure one point per date
TotalRevenuePointSchema.index({ date: 1 }, { unique: true });

module.exports = mongoose.model('TotalRevenuePoint', TotalRevenuePointSchema, 'totalrevenue');


