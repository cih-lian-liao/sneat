export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // 測試數據
    const testData = {
      totalSales: 42820,
      totalOrders: 8258,
      weeklyPercent: 38,
      categories: [
        { name: 'Electronic', description: 'Mobile, Earbuds, TV', value: 82500, icon: '📱' },
        { name: 'Fashion', description: 'Tshirt, Jeans, Shoes', value: 23800, icon: '👕' },
        { name: 'Decor', description: 'Fine Art, Dining', value: 849, icon: '🏠' },
        { name: 'Sports', description: 'Football, Cricket Kit', value: 99, icon: '⚽' }
      ]
    };

    res.json({
      success: true,
      message: 'Test API working',
      data: testData,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ 
      error: 'Test API failed: ' + err.message,
      timestamp: new Date().toISOString()
    });
  }
}
