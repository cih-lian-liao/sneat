const express = require('express');
const router = express.Router();
const SalesStat = require('../models/SalesStat').default;

// GET /api/salesstat  → 取最新一筆
router.get('/', async (req, res) => {
  try {
    const doc = await SalesStat.findOne({}).sort({ asOf: -1 }).lean();
    if (!doc) return res.json({});
    res.json({
      title: doc.title,
      amount: doc.amount,
      changePct: doc.changePct,
      currency: doc.currency || 'USD',
      iconUrl: doc.iconUrl || '',
      asOf: doc.asOf,
      debug: "Data fetched from MongoDB successfully",
      dataCount: 1
    });
  } catch (err) {
    console.error('GET /api/salesstat error', err);
    res.status(500).json({ error: '取得 SalesStat 失敗' });
  }
});

module.exports = router;
