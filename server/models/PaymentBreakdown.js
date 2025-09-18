import mongoose from 'mongoose';

const PaymentBreakdownSchema = new mongoose.Schema({
  method:   { type: String, required: true }, // e.g., 'Credit Card'
  amount:   { type: Number, required: true },
  color:    { type: String },                 // optional hex for UI
  order:    { type: Number, default: 0 },     // display order
  currency: { type: String, default: 'USD' },
  asOf:     { type: Date,   default: Date.now },
  // 新增字段用於卡片顯示
  totalAmount: { type: Number, required: true }, // 總金額
  changePct:   { type: Number, required: true }, // 變化百分比
  changeType:  { type: String, enum: ['increase', 'decrease'], required: true }, // 變化類型
}, { timestamps: true });

PaymentBreakdownSchema.index({ order: 1 });

export default mongoose.model('PaymentBreakdown', PaymentBreakdownSchema, 'payments');


