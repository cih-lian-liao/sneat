export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { card } = req.query;
  
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
      changeType: 'increase'
    },
    analyticsSalesStats: {
      totalSales: 125000,
      changePct: 8.2,
      changeType: 'increase'
    }
  };

  if (card && testData[card]) {
    return res.json(testData[card]);
  }
  
  return res.json(testData);
}
