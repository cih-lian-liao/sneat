// api/admin/update-data.js - 管理員數據更新 API
import connectDB from '../lib/mongodb.js';
import OrderChartPoint from '../../server/models/OrderChart.js';
import PaymentBreakdown from '../../server/models/PaymentBreakdown.js';
import SalesStat from '../../server/models/SalesStat.js';
import TotalRevenuePoint from '../../server/models/TotalRevenuePoint.js';

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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const { dataType, data } = req.body;

    if (!dataType || !data) {
      return res.status(400).json({ error: 'Missing dataType or data' });
    }

    let result;
    
    switch (dataType) {
      case 'ordercharts':
        await OrderChartPoint.deleteMany({});
        result = await OrderChartPoint.insertMany(data);
        break;
      case 'payments':
        await PaymentBreakdown.deleteMany({});
        result = await PaymentBreakdown.insertMany(data);
        break;
      case 'salesstats':
        await SalesStat.deleteMany({});
        result = await SalesStat.insertMany(data);
        break;
      case 'totalrevenue':
        await TotalRevenuePoint.deleteMany({});
        result = await TotalRevenuePoint.insertMany(data);
        break;
      default:
        return res.status(400).json({ error: 'Invalid dataType' });
    }

    res.status(200).json({ 
      success: true, 
      message: `${dataType} 數據更新成功`,
      count: result.length 
    });

  } catch (err) {
    console.error('Update data error', err);
    res.status(500).json({ error: '數據更新失敗' });
  }
}
