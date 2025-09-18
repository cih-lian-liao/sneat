const express = require('express');
const router = express.Router();
const TotalRevenuePoint = require('../models/TotalRevenuePoint');

router.get('/', async (_req, res) => {
  try {
    const rows = await TotalRevenuePoint.find({}).sort({ date: 1 }).lean();
    const labels = rows.map(r => r.label ?? new Date(r.date).toISOString().slice(0, 10));
    const income = rows.map(r => r.income ?? 0);
    const expenses = rows.map(r => r.expenses ?? 0);
    const currency = rows[0]?.currency || 'USD';

    const sum = (arr) => arr.reduce((s, v) => s + (Number(v) || 0), 0);
    const totals = {
      income: sum(income),
      expenses: sum(expenses),
      profit: sum(income) - sum(expenses),
    };

    res.json({ labels, income, expenses, currency, totals, count: rows.length });
  } catch (err) {
    console.error('GET /api/totalrevenue error', err);
    res.status(500).json({ error: '取得 Total Revenue 失敗' });
  }
});

module.exports = router;


