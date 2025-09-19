const express = require('express');
const router = express.Router();
const ProfitReport = require('../models/ProfitReport');

// GET /api/profitreport → 單筆資料（最簡單）
router.get('/', async (_req, res) => {
  try {
    const doc = await ProfitReport.findOne({}).lean();
    if (!doc) {
      return res.json({
        title: 'Profit Report',
        year: 2025,
        value: 0,
        changePct: 0,
        changeType: 'increase',
        chart: [10, 50, 20, 60, 55, 90],
        currency: 'USD',
        debug: 'No data found, using default'
      });
    }
    res.json({
      title: doc.title,
      year: doc.year,
      value: doc.value,
      changePct: doc.changePct,
      changeType: doc.changeType,
      chart: doc.chart,
      currency: doc.currency,
      debug: 'Data fetched from MongoDB successfully'
    });
  } catch (err) {
    console.error('GET /api/profitreport error', err);
    res.status(500).json({ error: '取得 ProfitReport 失敗' });
  }
});

module.exports = router;


