// api/payments.js
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  try {
    // 暫時返回硬編碼數據，確保 Edge Function 工作
    const data = {
      totalAmount: 2468,
      changePct: 14.82,
      changeType: 'decrease',
      currency: 'USD',
      iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png'
    };

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Payments API error', err);
    return new Response(JSON.stringify({ error: '取得 Payments 失敗' }), {
      status: 500,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
}