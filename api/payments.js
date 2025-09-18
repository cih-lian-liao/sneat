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

    res.status(200).json(rows);
  } catch (err) {
    console.error('GET /api/payments error', err);
    res.status(500).json({ error: '取得 Payments 失敗' });
  }
}
