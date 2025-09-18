// api/salesstat.js
export const config = {
  runtime: 'nodejs',
};

// 在模組頂層定義模型，避免重複定義
const mongoose = require('mongoose');

// 定義 Schema（只定義一次）- 根據實際數據結構調整
const SalesStatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  changePct: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  iconUrl: { type: String },
  asOf: { type: Date, default: Date.now },
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
    
    const rows = await SalesStat.find({}).lean();
    
    if (rows.length === 0) {
      return res.json({
        title: 'Sales',
        amount: 0,
        changePct: 0,
        currency: 'USD',
        iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png',
        debug: 'No data found in MongoDB'
      });
    }

    // 使用第一筆記錄
    const salesData = rows[0];
    
    res.json({
      title: salesData.title || 'Sales',
      amount: salesData.amount || 0,
      changePct: salesData.changePct || 0,
      currency: salesData.currency || 'USD',
      iconUrl: salesData.iconUrl || 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png',
      debug: 'Data fetched from MongoDB successfully',
      dataCount: rows.length
    });
  } catch (err) {
    console.error('GET /api/salesstat error', err);
    res.status(500).json({ error: '取得 SalesStat 失敗: ' + err.message });
  }
}