// api/payments.js
export const config = {
  runtime: 'nodejs',
};

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
    // 檢查環境變數
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI not set');
      return res.status(500).json({ 
        error: 'MongoDB connection string not configured',
        debug: 'MONGO_URI environment variable is missing'
      });
    }

    // 使用 Mongoose 連接 MongoDB，正確配置 SSL/TLS
    const mongoose = require('mongoose');
    
    // 如果已經連接，直接使用
    if (mongoose.connection.readyState === 1) {
      console.log('Using existing MongoDB connection');
    } else {
      // 建立新連接，正確配置 SSL/TLS
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        sslValidate: true,
        sslCA: undefined, // 使用默認 CA
        bufferCommands: false,
        bufferMaxEntries: 0,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4 // 強制使用 IPv4
      });
      console.log('Connected to MongoDB with SSL/TLS');
    }
    
    // 定義 Schema
    const PaymentBreakdownSchema = new mongoose.Schema({
      method: { type: String, required: true },
      amount: { type: Number, required: true },
      color: { type: String },
      order: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
      totalAmount: { type: Number, required: true },
      changePct: { type: Number, required: true },
      changeType: { type: String, enum: ['increase', 'decrease'], required: true },
    });
    
    const PaymentBreakdown = mongoose.model('PaymentBreakdown', PaymentBreakdownSchema, 'payments');
    
    const rows = await PaymentBreakdown.find({}).sort({ order: 1 }).lean();
    
    if (rows.length === 0) {
      return res.status(200).json({
        totalAmount: 0,
        changePct: 0,
        changeType: 'increase',
        currency: 'USD',
        iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png',
        debug: 'No data found in MongoDB'
      });
    }

    // 使用第一筆記錄的卡片數據
    const cardData = rows[0];
    
    res.status(200).json({
      totalAmount: cardData.totalAmount || 0,
      changePct: cardData.changePct || 0,
      changeType: cardData.changeType || 'increase',
      currency: cardData.currency || 'USD',
      iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png',
      debug: 'Data fetched from MongoDB successfully'
    });
  } catch (err) {
    console.error('GET /api/payments error', err);
    res.status(500).json({ 
      error: '取得 Payments 卡片數據失敗: ' + err.message,
      debug: 'MongoDB connection failed',
      errorType: err.name
    });
  }
}