// api/salesstat.js
export const config = {
  runtime: 'nodejs',
};

// 在模組頂層定義模型，避免重複定義
const mongoose = require('mongoose');

// 定義 Schema（只定義一次）
const SalesStatSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  label: { type: String, required: true },
  value: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
});

// 檢查模型是否已存在，如果不存在則創建
let SalesStat;
try {
  SalesStat = mongoose.model('SalesStat');
} catch (error) {
  SalesStat = mongoose.model('SalesStat', SalesStatSchema, 'salesstats');
}

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
    // 如果已經連接，直接使用
    if (mongoose.connection.readyState === 1) {
      console.log('Using existing MongoDB connection');
    } else {
      // 建立新連接
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
      });
      console.log('Connected to MongoDB Atlas');
    }
    
    const rows = await SalesStat.find({}).sort({ date: 1 }).lean();
    const labels = rows.map(r => r.label);
    const values = rows.map(r => r.value);
    const currency = rows[0]?.currency || 'USD';
    const total = values.reduce((s, v) => s + (Number(v) || 0), 0);

    res.json({ 
      labels, 
      values, 
      currency, 
      total, 
      count: rows.length,
      debug: 'Data fetched from MongoDB successfully'
    });
  } catch (err) {
    console.error('GET /api/salesstat error', err);
    res.status(500).json({ error: '取得 SalesStat 失敗: ' + err.message });
  }
}