// api/check-env.js
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
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      return res.status(200).json({
        hasEnvVar: false,
        message: 'MONGO_URI environment variable not set'
      });
    }

    // 安全地顯示連接字符串信息（不包含密碼）
    const uriParts = mongoUri.split('@');
    const userPart = uriParts[0] ? uriParts[0].split('//')[1] : '';
    const clusterPart = uriParts[1] ? uriParts[1].split('/')[0] : '';
    const dbPart = uriParts[1] ? uriParts[1].split('/')[1] : '';

    res.status(200).json({
      hasEnvVar: true,
      mongoUriLength: mongoUri.length,
      userInfo: userPart,
      clusterInfo: clusterPart,
      databaseInfo: dbPart,
      message: 'Environment variable is set'
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error checking environment',
      errorMessage: err.message
    });
  }
}
