// 測試環境變量的簡單 API 端點
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';
    
    res.json({
      hasMongoUri: !!process.env.MONGO_URI,
      mongoUriMasked: mongoUri.replace(/\/\/.*@/, '//***:***@'),
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
