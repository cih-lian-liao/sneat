export const config = { runtime: 'nodejs' };

const mongoose = require('mongoose');

const OrderStatisticsSchema = new mongoose.Schema({
  title: { type: String, default: 'Order Statistics' },
  totalSales: { type: Number, required: true },
  totalOrders: { type: Number, required: true },
  weeklyPercentage: { type: Number, required: true },
  categories: [{
    name: { type: String, required: true },
    icon: { type: String, required: true },
    items: { type: String, required: true },
    sales: { type: Number, required: true }
  }],
  currency: { type: String, default: 'USD' },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true, collection: 'orderstatistics' });

let OrderStatistics;
try { 
  OrderStatistics = mongoose.model('OrderStatistics'); 
} catch { 
  OrderStatistics = mongoose.model('OrderStatistics', OrderStatisticsSchema, 'orderstatistics'); 
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
    
    const doc = await OrderStatistics.findOne({}).lean();
    if (!doc) {
      return res.json({
        title: 'Order Statistics',
        totalSales: 42820,
        totalOrders: 8258,
        weeklyPercentage: 38,
        categories: [
          { name: 'Electronic', icon: '📱', items: 'Mobile, Earbuds, TV', sales: 82500 },
          { name: 'Fashion', icon: '👕', items: 'Tshirt, Jeans, Shoes', sales: 23800 },
          { name: 'Decor', icon: '🏠', items: 'Fine Art, Dining', sales: 849 },
          { name: 'Sports', icon: '⚽', items: 'Football, Cricket Kit', sales: 99 }
        ],
        currency: 'USD',
        debug: 'No data found, using default'
      });
    }
    
    res.json({ ...doc, debug: 'Data fetched from MongoDB successfully' });
  } catch (err) {
    res.status(500).json({ error: '取得 OrderStatistics 失敗: ' + err.message });
  }
}
