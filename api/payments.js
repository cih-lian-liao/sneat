// api/payments.js
import connectDB from './lib/mongodb.js';
import PaymentBreakdown from '../server/models/PaymentBreakdown.js';

export default async function handler(req, res) {
  // 設定 CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const rows = await PaymentBreakdown.find({}).sort({ order: 1 }).lean();
    
    if (rows.length === 0) {
      return res.status(200).json({
        totalAmount: 0,
        changePct: 0,
        changeType: 'increase',
        currency: 'USD',
        iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png'
      });
    }

    // 使用第一筆記錄的卡片數據
    const cardData = rows[0];
    
    res.status(200).json({
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
}