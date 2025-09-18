// api/test-mongo.js
export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
      return res.status(500).json({ 
        error: 'MONGO_URI not set',
        hasEnvVar: false
      });
    }

    // 測試 MongoDB 連接
    const mongoose = require('mongoose');
    
    // 嘗試連接
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });

    // 測試數據庫操作
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    await mongoose.disconnect();

    res.status(200).json({
      success: true,
      message: 'MongoDB connection successful',
      hasEnvVar: true,
      mongoUriLength: process.env.MONGO_URI.length,
      collections: collections.map(c => c.name),
      connectionState: 'Connected and disconnected successfully'
    });
  } catch (err) {
    res.status(500).json({
      error: 'MongoDB connection failed',
      errorMessage: err.message,
      errorType: err.name,
      hasEnvVar: !!process.env.MONGO_URI,
      mongoUriLength: process.env.MONGO_URI ? process.env.MONGO_URI.length : 0
    });
  }
}
