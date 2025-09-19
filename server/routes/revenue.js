const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 定義 Revenue 模型
const RevenueSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    default: 'Revenue'
  },
  totalRevenue: { 
    type: Number, 
    required: true 
  },
  weeklyData: [{
    day: { 
      type: String, 
      required: true,
      enum: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    },
    revenue: { 
      type: Number, 
      required: true 
    },
    isHighlighted: { 
      type: Boolean, 
      default: false 
    }
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
  collection: 'revenue' 
});

const Revenue = mongoose.model('Revenue', RevenueSchema);

// GET /api/revenue - 獲取 Revenue 數據
router.get('/', async (req, res) => {
  try {
    const data = await Revenue.findOne({}).sort({ lastUpdated: -1 }).lean();
    
    if (!data) {
      return res.json({
        title: "Revenue",
        totalRevenue: 425000,
        weeklyData: [
          { day: "M", revenue: 45000, isHighlighted: false },
          { day: "T", revenue: 62000, isHighlighted: false },
          { day: "W", revenue: 58000, isHighlighted: false },
          { day: "T", revenue: 41000, isHighlighted: false },
          { day: "F", revenue: 89000, isHighlighted: true },
          { day: "S", revenue: 38000, isHighlighted: false },
          { day: "S", revenue: 52000, isHighlighted: false }
        ],
        currency: "USD",
        debug: 'No data found, using default values'
      });
    }

    res.json({
      title: data.title,
      totalRevenue: data.totalRevenue,
      weeklyData: data.weeklyData,
      currency: data.currency,
      lastUpdated: data.lastUpdated,
      debug: "Data fetched from MongoDB successfully"
    });
  } catch (err) {
    console.error('GET /api/revenue error', err);
    res.status(500).json({ error: '取得 Revenue 數據失敗: ' + err.message });
  }
});

module.exports = router;
