// api/totalrevenue.js
export const config = {
  runtime: 'nodejs',
};

// 在模組頂層定義模型，避免重複定義
const mongoose = require('mongoose');

// 定義 Schema（只定義一次）
const TotalRevenuePointSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  label: { type: String, required: true },
  income: { type: Number, required: true },
  expenses: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
});

// 檢查模型是否已存在，如果不存在則創建
let TotalRevenuePoint;
try {
  TotalRevenuePoint = mongoose.model('TotalRevenuePoint');
} catch (error) {
  TotalRevenuePoint = mongoose.model('TotalRevenuePoint', TotalRevenuePointSchema, 'totalrevenue');
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
    
    const { year1 = new Date().getFullYear(), year2 = new Date().getFullYear() - 1 } = req.query;

    const fetchDataForYear = async (year) => {
      const rows = await TotalRevenuePoint.find({ year: Number(year) }).sort({ month: 1 }).lean();
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

    res.json({
      year1: dataYear1,
      year2: dataYear2,
      growthPercentage: Math.round(growthPercentage),
      currency: dataYear1.currency || 'USD',
      debug: 'Data fetched from MongoDB successfully'
    });
  } catch (err) {
    console.error('GET /api/totalrevenue error', err);
    res.status(500).json({ error: '取得 TotalRevenue 失敗: ' + err.message });
  }
}