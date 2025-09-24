// 簡單的 API 測試腳本
const axios = require('axios');

async function testAPI() {
  const baseUrl = 'http://localhost:3000'; // 本地測試
  
  const endpoints = [
    '/api/dashboard?card=crmTopSales',
    '/api/dashboard?card=crmTopVolume',
    '/api/dashboard?card=teamMembers'
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`\n測試端點: ${endpoint}`);
      const response = await axios.get(`${baseUrl}${endpoint}`);
      console.log(`✅ 成功: ${JSON.stringify(response.data).substring(0, 100)}...`);
    } catch (error) {
      console.log(`❌ 錯誤: ${error.message}`);
      if (error.response) {
        console.log(`狀態碼: ${error.response.status}`);
        console.log(`錯誤數據: ${JSON.stringify(error.response.data)}`);
      }
    }
  }
}

testAPI();
