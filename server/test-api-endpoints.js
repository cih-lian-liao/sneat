// 測試 API 端點的簡單腳本
const fetch = require('node-fetch');

async function testAPI() {
  const baseUrl = 'https://sneat-vercel.vercel.app'; // 替換為實際的 Vercel URL
  
  const endpoints = [
    '/api/dashboard?card=crmTopSales',
    '/api/dashboard?card=crmTopVolume', 
    '/api/dashboard?card=teamMembers'
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`\n測試端點: ${endpoint}`);
      const response = await fetch(`${baseUrl}${endpoint}`);
      console.log(`狀態碼: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ 成功: ${JSON.stringify(data).substring(0, 100)}...`);
      } else {
        const error = await response.text();
        console.log(`❌ 錯誤: ${error}`);
      }
    } catch (error) {
      console.log(`❌ 請求失敗: ${error.message}`);
    }
  }
}

testAPI();
