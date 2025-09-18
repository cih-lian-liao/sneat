// api/totalrevenue.js
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
    // 返回硬編碼的 TotalRevenue 數據
    return res.status(200).json({
      year1: {
        year: 2024,
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        income: [17000, 5000, 12000, 8000, 15000, 9000],
        expenses: [5000, 2000, 4000, 3000, 6000, 3500],
        netRevenue: [12000, 3000, 8000, 5000, 9000, 5500],
        total: 43000
      },
      year2: {
        year: 2023,
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        income: [12000, 8000, 10000, 7000, 13000, 8500],
        expenses: [8000, 6000, 5000, 4000, 7000, 4500],
        netRevenue: [4000, 2000, 5000, 3000, 6000, 4000],
        total: 24000
      },
      growthPercentage: 79,
      currency: 'USD'
    });
  } catch (err) {
    console.error('GET /api/totalrevenue error', err);
    res.status(500).json({ error: '取得 TotalRevenue 失敗' });
  }
}