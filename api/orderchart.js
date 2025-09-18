// api/orderchart.js
import connectDB from './lib/mongodb.js';
import OrderChartPoint from '../server/models/OrderChart.js';

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
    
    const rows = await OrderChartPoint.find({}).sort({ date: 1 }).lean();

    const labels = rows.map(r =>
      r.label ?? new Date(r.date).toISOString().slice(0, 10)
    );
    const values = rows.map(r => r.value ?? 0);

    res.status(200).json({ labels, values, count: rows.length });
  } catch (err) {
    console.error('GET /api/orderchart error', err);
    res.status(500).json({ error: '取得 OrderChart 失敗' });
  }
}
