export const config = { runtime: 'nodejs' };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { card } = req.query;
    
    // 簡單的測試資料
    const testData = {
      orderChart: {
        totalOrders: 1250,
        changePct: 12.5,
        changeType: 'increase',
        values: [200, 250, 300, 275, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250]
      },
      payments: {
        totalAmount: 24580,
        changePct: 12.5,
        changeType: 'increase',
        breakdown: [
          { method: 'Credit Card', amount: 12300, color: '#3b82f6', order: 1 },
          { method: 'PayPal', amount: 8900, color: '#10b981', order: 2 },
          { method: 'Bank Transfer', amount: 3380, color: '#f59e0b', order: 3 }
        ]
      },
      analyticsSalesStats: {
        totalSales: 125000,
        changePct: 8.2,
        changeType: 'increase',
        chartData: [
          { month: 'Jan', sales: 120000 },
          { month: 'Feb', sales: 125000 },
          { month: 'Mar', sales: 130000 },
          { month: 'Apr', sales: 128000 },
          { month: 'May', sales: 135000 },
          { month: 'Jun', sales: 140000 }
        ]
      }
    };

    if (card) {
      const data = testData[card];
      if (data) {
        return res.json(data);
      } else {
        return res.status(404).json({ error: `Card '${card}' not found` });
      }
    }
    
    return res.json(testData);
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
