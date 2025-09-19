// server/routes/orderchart.js
const express = require('express');
const router = express.Router();
const OrderChartPoint = require('../models/OrderChart').default;

// GET /api/orderchart ：把全部資料依 date 由小到大回傳
router.get('/', async (req, res) => {
  try {
    const rows = await OrderChartPoint.find({}).sort({ date: 1 }).lean();

    // 直接用資料庫裡的 label；若沒填 label 就用日期字串當備用
    const labels = rows.map(r =>
      r.label ?? new Date(r.date).toISOString().slice(0, 10)
    );
    const values = rows.map(r => r.value ?? 0);

    res.json({ 
      labels, 
      values, 
      count: rows.length,
      currency: "USD",
      total: values.reduce((sum, val) => sum + val, 0),
      debug: "Data fetched from MongoDB successfully"
    });
  } catch (err) {
    console.error('GET /api/orderchart error', err);
    res.status(500).json({ error: '取得 OrderChart 失敗' });
  }
});

module.exports = router;
