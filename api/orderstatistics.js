export const config = { runtime: 'nodejs' };

const mongoose = require('mongoose');

const OrderStatisticsSchema = new mongoose.Schema({
  totalSales: { type: Number, required: true, default: 42820 },
  totalOrders: { type: Number, required: true, default: 8258 },
  weeklyPercent: { type: Number, required: true, default: 38 },
  categories: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true }
  }]
}, { timestamps: true, collection: 'orderstatistics' });

let OrderStatistics;
try { 
  OrderStatistics = mongoose.model('OrderStatistics'); 
} catch { 
  OrderStatistics = mongoose.model('OrderStatistics', OrderStatisticsSchema, 'orderstatistics'); 
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
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
    console.log('MongoDB doc:', doc);
    
    if (!doc) {
      const fallbackData = {
        totalSales: 42820,
        totalOrders: 8258,
        weeklyPercent: 38,
        categories: [
          { name: 'Electronic', description: 'Mobile, Earbuds, TV', value: 82500 },
          { name: 'Fashion', description: 'Tshirt, Jeans, Shoes', value: 23800 },
          { name: 'Decor', description: 'Fine Art, Dining', value: 849 },
          { name: 'Sports', description: 'Football, Cricket Kit', value: 99 }
        ]
      };
      console.log('Using fallback data:', fallbackData);
      return res.json(fallbackData);
    }
    
    console.log('Returning MongoDB data:', doc);
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: '取得 OrderStatistics 失敗: ' + err.message });
  }
}
