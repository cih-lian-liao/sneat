import mongoose from 'mongoose';

const PaymentBreakdownSchema = new mongoose.Schema({
  method:   { type: String, required: true }, // e.g., 'Credit Card'
  amount:   { type: Number, required: true },
  color:    { type: String },                 // optional hex for UI
  order:    { type: Number, default: 0 },     // display order
  currency: { type: String, default: 'USD' },
  asOf:     { type: Date,   default: Date.now },
}, { timestamps: true });

PaymentBreakdownSchema.index({ order: 1 });

export default mongoose.model('PaymentBreakdown', PaymentBreakdownSchema, 'payments');


