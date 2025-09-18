import mongoose from 'mongoose';

const OrderChartPointSchema = new mongoose.Schema({
  date:  { type: Date, required: true },
  label: { type: String, required: true },
  value: { type: Number, required: true },
}, { timestamps: true });

// 建議：讓「一天一筆」不重複（如果你就是這樣設計）
OrderChartPointSchema.index({ date: 1 }, { unique: true });

export default mongoose.model('OrderChartPoint', OrderChartPointSchema, 'ordercharts');


