const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 定義新的 Total Revenue 模型
const TotalRevenueSchema = new mongoose.Schema({
  year: { 
    type: Number, 
    required: true,
    unique: true 
  },
  totalRevenue: { 
    type: Number, 
    required: true 
  },
  monthlyRevenue: [{
    month: { 
      type: String, 
      required: true,
      enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    revenue: { 
      type: Number, 
      required: true 
    }
  }],
  growthRate: { 
    type: Number, 
    required: true 
  },
  currency: { 
    type: String, 
    default: 'USD' 
  },
  isProjection: { 
    type: Boolean, 
    default: false 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true,
  collection: 'totalrevenue_new'
});

const TotalRevenue = mongoose.model('TotalRevenue', TotalRevenueSchema);

// GET /api/totalrevenue - 獲取年份對比數據
router.get('/', async (req, res) => {
  try {
    const { year1 = 2025, year2 = 2024 } = req.query;
    
    // 獲取兩個年份的數據
    const [year1Data, year2Data] = await Promise.all([
      TotalRevenue.findOne({ year: parseInt(year1) }).lean(),
      TotalRevenue.findOne({ year: parseInt(year2) }).lean()
    ]);

    if (!year1Data || !year2Data) {
      return res.status(404).json({ 
        error: `數據不存在: ${year1} 或 ${year2} 年份數據未找到` 
      });
    }

    // 計算年度增長百分比
    const growthPercentage = year2Data.totalRevenue > 0 
      ? ((year1Data.totalRevenue - year2Data.totalRevenue) / year2Data.totalRevenue * 100)
      : 0;

    // 格式化月度數據用於圖表
    const formatMonthlyData = (data) => {
      const labels = data.monthlyRevenue.map(item => item.month);
      const revenue = data.monthlyRevenue.map(item => item.revenue);
      return { labels, revenue };
    };

    const year1Formatted = formatMonthlyData(year1Data);
    const year2Formatted = formatMonthlyData(year2Data);

    res.json({
      year1: {
        year: year1Data.year,
        totalRevenue: year1Data.totalRevenue,
        monthlyRevenue: year1Data.monthlyRevenue,
        growthRate: year1Data.growthRate,
        isProjection: year1Data.isProjection,
        ...year1Formatted
      },
      year2: {
        year: year2Data.year,
        totalRevenue: year2Data.totalRevenue,
        monthlyRevenue: year2Data.monthlyRevenue,
        growthRate: year2Data.growthRate,
        isProjection: year2Data.isProjection,
        ...year2Formatted
      },
      growthPercentage: Math.round(growthPercentage * 10) / 10, // 保留一位小數
      currency: 'USD',
      lastUpdated: new Date().toISOString()
    });
  } catch (err) {
    console.error('GET /api/totalrevenue error', err);
    res.status(500).json({ error: '取得 TotalRevenue 失敗: ' + err.message });
  }
});

// GET /api/totalrevenue/years - 獲取可用的年份列表
router.get('/years', async (req, res) => {
  try {
    const years = await TotalRevenue.distinct('year');
    res.json({ 
      years: years.sort((a, b) => b - a), // 降序排列
      availableYears: years.length 
    });
  } catch (err) {
    console.error('GET /api/totalrevenue/years error', err);
    res.status(500).json({ error: '取得年份列表失敗: ' + err.message });
  }
});

module.exports = router;