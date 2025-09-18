// api/payments.js
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
    // 檢查是否是卡片端點請求
    if (req.url && req.url.includes('/card')) {
      return res.status(200).json({
        totalAmount: 2468,
        changePct: 14.82,
        changeType: 'decrease',
        currency: 'USD',
        iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png'
      });
    }

    // 原有的圖表數據端點
    return res.status(200).json({
      labels: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash'],
      values: [1240, 780, 520, 210],
      colors: ['#7367F0', '#FF9F43', '#28C76F', '#EA5455'],
      currency: 'USD',
      total: 2750,
      count: 4
    });
  } catch (err) {
    console.error('GET /api/payments error', err);
    res.status(500).json({ error: '取得 Payments 失敗' });
  }
}
