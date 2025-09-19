const express = require('express');
const router = express.Router();
const PaymentBreakdown = require('../models/PaymentBreakdown').default;

// GET /api/payments → 獲取卡片顯示數據（與 Vercel 保持一致）
router.get('/', async (_req, res) => {
  try {
    const rows = await PaymentBreakdown.find({}).sort({ order: 1 }).lean();
    
    if (rows.length === 0) {
      return res.json({
        totalAmount: 0,
        changePct: 0,
        changeType: 'increase',
        currency: 'USD',
        iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png'
      });
    }

    // 使用第一筆記錄的卡片數據
    const cardData = rows[0];
    
    res.json({
      totalAmount: cardData.totalAmount || 0,
      changePct: cardData.changePct || 0,
      changeType: cardData.changeType || 'increase',
      currency: cardData.currency || 'USD',
      iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png'
    });
  } catch (err) {
    console.error('GET /api/payments error', err);
    res.status(500).json({ error: '取得 Payments 卡片數據失敗' });
  }
});

// GET /api/payments/card → 獲取卡片顯示數據
router.get('/card', async (_req, res) => {
  try {
    const rows = await PaymentBreakdown.find({}).sort({ order: 1 }).lean();
    
    if (rows.length === 0) {
      return res.json({
        totalAmount: 0,
        changePct: 0,
        changeType: 'increase',
        currency: 'USD',
        iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png'
      });
    }

    // 使用第一筆記錄的卡片數據
    const cardData = rows[0];
    
    res.json({
      totalAmount: cardData.totalAmount || 0,
      changePct: cardData.changePct || 0,
      changeType: cardData.changeType || 'increase',
      currency: cardData.currency || 'USD',
      iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png'
    });
  } catch (err) {
    console.error('GET /api/payments/card error', err);
    res.status(500).json({ error: '取得 Payments 卡片數據失敗' });
  }
});

module.exports = router;


