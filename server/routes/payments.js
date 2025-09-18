const express = require('express');
const router = express.Router();
const PaymentBreakdown = require('../models/PaymentBreakdown').default;

// GET /api/payments → list payment methods distribution
router.get('/', async (_req, res) => {
  try {
    const rows = await PaymentBreakdown.find({}).sort({ order: 1, amount: -1 }).lean();
    const labels = rows.map(r => r.method);
    const values = rows.map(r => r.amount);
    const colors = rows.map(r => r.color || '#ccc');
    const currency = rows[0]?.currency || 'USD';
    const total = values.reduce((s, v) => s + (Number(v) || 0), 0);

    res.json({ labels, values, colors, currency, total, count: rows.length });
  } catch (err) {
    console.error('GET /api/payments error', err);
    res.status(500).json({ error: '取得 Payments 失敗' });
  }
});

module.exports = router;


