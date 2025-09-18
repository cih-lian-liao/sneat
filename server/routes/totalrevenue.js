const express = require('express');
const router = express.Router();
const TotalRevenuePoint = require('../models/TotalRevenuePoint').default;

// GET /api/totalrevenue - 獲取年份對比數據
router.get('/', async (req, res) => {
  try {
    const { year1 = 2024, year2 = 2023 } = req.query;
    
    // 獲取兩個年份的數據
    const [year1Data, year2Data] = await Promise.all([
      TotalRevenuePoint.find({ year: parseInt(year1) }).sort({ month: 1 }).lean(),
      TotalRevenuePoint.find({ year: parseInt(year2) }).sort({ month: 1 }).lean()
    ]);

    // 處理數據格式
    const processYearData = (data) => {
      const labels = data.map(item => item.label);
      const income = data.map(item => item.income || 0);
      const expenses = data.map(item => item.expenses || 0);
      const netRevenue = income.map((inc, i) => inc - expenses[i]);
      return { labels, income, expenses, netRevenue };
    };

    const year1Processed = processYearData(year1Data);
    const year2Processed = processYearData(year2Data);

    // 計算總收入
    const year1Total = year1Processed.income.reduce((sum, val) => sum + val, 0);
    const year2Total = year2Processed.income.reduce((sum, val) => sum + val, 0);
    
    // 計算增長百分比
    const growthPercentage = year2Total > 0 ? ((year1Total - year2Total) / year2Total * 100) : 0;

    res.json({
      year1: {
        year: parseInt(year1),
        ...year1Processed,
        total: year1Total
      },
      year2: {
        year: parseInt(year2),
        ...year2Processed,
        total: year2Total
      },
      growthPercentage: Math.round(growthPercentage),
      currency: 'USD'
    });
  } catch (err) {
    console.error('GET /api/totalrevenue error', err);
    res.status(500).json({ error: '取得 TotalRevenue 失敗' });
  }
});

// GET /api/totalrevenue/years - 獲取可用的年份列表
router.get('/years', async (req, res) => {
  try {
    const years = await TotalRevenuePoint.distinct('year');
    res.json({ years: years.sort((a, b) => b - a) }); // 降序排列
  } catch (err) {
    console.error('GET /api/totalrevenue/years error', err);
    res.status(500).json({ error: '取得年份列表失敗' });
  }
});

module.exports = router;