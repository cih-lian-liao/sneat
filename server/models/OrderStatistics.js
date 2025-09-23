const mongoose = require('mongoose');

const OrderStatisticsSchema = new mongoose.Schema({
  totalSales: { 
    type: Number, 
    required: true,
    default: 42820
  },
  totalOrders: { 
    type: Number, 
    required: true,
    default: 8258
  },
  weeklyPercent: { 
    type: Number, 
    required: true,
    default: 38
  },
  categories: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    icon: { type: String, required: true }
  }]
}, { 
  timestamps: true, 
  collection: 'orderstatistics' 
});

module.exports = mongoose.model('OrderStatistics', OrderStatisticsSchema);
