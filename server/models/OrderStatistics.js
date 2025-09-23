const mongoose = require('mongoose');

const OrderStatisticsSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    default: 'Order Statistics' 
  },
  totalSales: { 
    type: Number, 
    required: true 
  },
  totalOrders: { 
    type: Number, 
    required: true 
  },
  weeklyPercentage: { 
    type: Number, 
    required: true 
  },
  categories: [{
    name: { type: String, required: true },
    icon: { type: String, required: true },
    items: { type: String, required: true },
    sales: { type: Number, required: true }
  }],
  currency: { 
    type: String, 
    default: 'USD' 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true, 
  collection: 'orderstatistics' 
});

module.exports = mongoose.model('OrderStatistics', OrderStatisticsSchema);
