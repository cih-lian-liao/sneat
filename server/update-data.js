// server/update-data.js - 數據更新腳本
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 導入所有模型
const OrderChartPoint = require('./models/OrderChart').default;
const PaymentBreakdown = require('./models/PaymentBreakdown').default;
const SalesStat = require('./models/SalesStat').default;
const TotalRevenuePoint = require('./models/TotalRevenuePoint').default;

async function updateData() {
  try {
    // 連接到數據庫
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydatas');
    console.log('✅ 已連線到數據庫');

    // 清空現有數據
    await OrderChartPoint.deleteMany({});
    await PaymentBreakdown.deleteMany({});
    await SalesStat.deleteMany({});
    await TotalRevenuePoint.deleteMany({});
    console.log('🗑️ 已清空現有數據');

    // 讀取新的種子數據
    const seedData = {
      ordercharts: JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'ordercharts.json'), 'utf8')),
      payments: JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'payments.json'), 'utf8')),
      salesstats: JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'salesstats.json'), 'utf8')),
      totalrevenue: JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'totalrevenue.json'), 'utf8'))
    };

    // 處理日期格式轉換
    const processDateFields = (data, dateFields) => {
      return data.map(item => {
        const processed = { ...item };
        dateFields.forEach(field => {
          if (processed[field] && processed[field].$date) {
            processed[field] = new Date(processed[field].$date);
          }
        });
        return processed;
      });
    };

    // 轉換日期格式
    seedData.ordercharts = processDateFields(seedData.ordercharts, ['date']);
    seedData.salesstats = processDateFields(seedData.salesstats, ['asOf']);
    seedData.totalrevenue = processDateFields(seedData.totalrevenue, ['date']);
    
    // 為 totalrevenue 添加年份和月份字段（如果不存在）
    seedData.totalrevenue = seedData.totalrevenue.map(item => {
      if (!item.year || !item.month) {
        const date = new Date(item.date);
        return {
          ...item,
          year: item.year || date.getFullYear(),
          month: item.month || (date.getMonth() + 1)
        };
      }
      return item;
    });

    // 插入新數據
    await OrderChartPoint.insertMany(seedData.ordercharts);
    await PaymentBreakdown.insertMany(seedData.payments);
    await SalesStat.insertMany(seedData.salesstats);
    await TotalRevenuePoint.insertMany(seedData.totalrevenue);

    console.log('✅ 數據更新完成！');
    console.log(`📊 已更新 ${seedData.ordercharts.length} 筆訂單圖表數據`);
    console.log(`💳 已更新 ${seedData.payments.length} 筆支付數據`);
    console.log(`📈 已更新 ${seedData.salesstats.length} 筆銷售統計數據`);
    console.log(`💰 已更新 ${seedData.totalrevenue.length} 筆總收入數據`);

  } catch (error) {
    console.error('❌ 數據更新失敗：', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 已斷開數據庫連接');
  }
}

// 執行更新
updateData();
