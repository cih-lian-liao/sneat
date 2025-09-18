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

    console.log('MONGO_URI exists:', process.env.MONGO_URI ? 'Yes' : 'No');
    console.log('MONGO_URI length:', process.env.MONGO_URI.length);

    // 暫時返回硬編碼數據，避免連接問題
    const data = {
      totalAmount: 2468,
      changePct: 14.82,
      changeType: 'decrease',
      currency: 'USD',
      iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png',
      debug: 'Using hardcoded data - MongoDB connection in progress'
    };

    res.status(200).json(data);
  } catch (err) {
    console.error('GET /api/payments error', err);
    res.status(500).json({ error: '取得 Payments 卡片數據失敗: ' + err.message });
  }
}