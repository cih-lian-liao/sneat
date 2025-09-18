import mongoose from 'mongoose';

const TotalRevenuePointSchema = new mongoose.Schema({
  date:     { type: Date,   required: true },
  label:    { type: String, required: true }, // e.g., 'Jan'
  income:   { type: Number, required: true },
  expenses: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  year:     { type: Number, required: true },   // 新增年份字段
  month:    { type: Number, required: true },  // 新增月份字段 (1-12)
}, { timestamps: true });

// 確保每個年份每個月只有一筆記錄
TotalRevenuePointSchema.index({ year: 1, month: 1 }, { unique: true });

export default mongoose.model('TotalRevenuePoint', TotalRevenuePointSchema, 'totalrevenue');


