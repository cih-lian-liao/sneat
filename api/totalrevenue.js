// api/totalrevenue.js
export const config = {
  runtime: 'nodejs',
};

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
    // 連接 MongoDB
    const { MongoClient } = require('mongodb');
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    
    const db = client.db('mydatas');
    const collection = db.collection('totalrevenue');
    
    const { year1 = new Date().getFullYear(), year2 = new Date().getFullYear() - 1 } = req.query;

    const fetchDataForYear = async (year) => {
      const rows = await collection.find({ year: Number(year) }).sort({ month: 1 }).toArray();
      const labels = rows.map(r => r.label);
      const income = rows.map(r => r.income);
      const expenses = rows.map(r => r.expenses);
      const netRevenue = rows.map(r => r.income - r.expenses);
      const total = netRevenue.reduce((sum, val) => sum + val, 0);
      return { year: Number(year), labels, income, expenses, netRevenue, total };
    };

    const dataYear1 = await fetchDataForYear(year1);
    const dataYear2 = await fetchDataForYear(year2);

    const totalYear1 = dataYear1.netRevenue.reduce((sum, val) => sum + val, 0);
    const totalYear2 = dataYear2.netRevenue.reduce((sum, val) => sum + val, 0);

    let growthPercentage = 0;
    if (totalYear2 !== 0) {
      growthPercentage = ((totalYear1 - totalYear2) / totalYear2) * 100;
    }

    await client.close();

    res.json({
      year1: dataYear1,
      year2: dataYear2,
      growthPercentage: Math.round(growthPercentage),
      currency: dataYear1.currency || 'USD'
    });
  } catch (err) {
    console.error('GET /api/totalrevenue error', err);
    res.status(500).json({ error: '取得 TotalRevenue 失敗: ' + err.message });
  }
}