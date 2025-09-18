const mongoose = require('mongoose');

const SalesStatSchema = new mongoose.Schema({
  title:     { type: String, required: true },   // 'Sales'
  amount:    { type: Number, required: true },   // 4679
  changePct: { type: Number, required: true },   // 28.14
  currency:  { type: String, default: 'USD' },   // 'USD'
  iconUrl:   { type: String },                   // 圖示 URL
  asOf:      { type: Date,   default: Date.now } // 資料時間
}, { timestamps: true });

SalesStatSchema.index({ asOf: -1 });

module.exports = mongoose.model('SalesStat', SalesStatSchema, 'salesstats');
