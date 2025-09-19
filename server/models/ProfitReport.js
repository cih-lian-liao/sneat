const mongoose = require('mongoose');

// 簡單明瞭的 Profit Report 結構
// 以避免前端出錯，資料扁平、欄位少
const ProfitReportSchema = new mongoose.Schema({
  title: { type: String, required: true, default: 'Profit Report' },
  year: { type: Number, required: true, default: 2025 },
  value: { type: Number, required: true }, // 例如 84686（美元）
  changePct: { type: Number, required: true }, // 例如 68.2
  changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
  // 簡單曲線資料（0-100 百分比高度即可）
  chart: {
    type: [Number],
    default: [10, 65, 25, 55, 50, 90]
  },
  currency: { type: String, default: 'USD' },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true, collection: 'profitreports' });

module.exports = mongoose.model('ProfitReport', ProfitReportSchema);


