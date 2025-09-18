// api/test-connection.js
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
    // 使用正確的連接字符串
    const mongoUri = 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';
    
    // 測試 MongoDB 連接
    const mongoose = require('mongoose');
    
    // 嘗試連接
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });

    // 測試數據庫操作
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    // 測試 payments 集合
    const paymentsCollection = db.collection('payments');
    const paymentsCount = await paymentsCollection.countDocuments();
    
    await mongoose.disconnect();

    res.status(200).json({
      success: true,
      message: 'MongoDB connection successful with correct credentials',
      collections: collections.map(c => c.name),
      paymentsCount: paymentsCount,
      connectionState: 'Connected and disconnected successfully'
    });
  } catch (err) {
    res.status(500).json({
      error: 'MongoDB connection failed',
      errorMessage: err.message,
      errorType: err.name,
      connectionString: 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas'
    });
  }
}
