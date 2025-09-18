// api/totalrevenue.js
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
    // 暫時返回硬編碼數據，稍後可以連接 MongoDB
    const data = {
      year1: {
        year: 2024,
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        income: [17000, 5000, 12000, 8000, 15000, 9000],
        expenses: [5000, 2000, 4000, 3000, 6000, 3500],
        netRevenue: [12000, 3000, 8000, 5000, 9000, 5500],
        total: 43000
      },
      year2: {
        year: 2023,
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        income: [12000, 8000, 10000, 7000, 13000, 8500],
        expenses: [8000, 6000, 5000, 4000, 7000, 4500],
        netRevenue: [4000, 2000, 5000, 3000, 6000, 4000],
        total: 24000
      },
      growthPercentage: 79,
      currency: 'USD'
    };

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('TotalRevenue API error', err);
    return new Response(JSON.stringify({ error: '取得 TotalRevenue 失敗' }), {
      status: 500,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
}