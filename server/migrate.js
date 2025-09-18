// server/migrate.js - 數據遷移腳本
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 導入所有模型
const OrderChartPoint = require('./models/OrderChart');
const PaymentBreakdown = require('./models/PaymentBreakdown');
const SalesStat = require('./models/SalesStat');
const TotalRevenuePoint = require('./models/TotalRevenuePoint');

async function migrateData() {
  try {
    // 連接到數據庫
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydatas');
    console.log('✅ 已連線到數據庫');

    // 清空現有數據（可選）
    await OrderChartPoint.deleteMany({});
    await PaymentBreakdown.deleteMany({});
    await SalesStat.deleteMany({});
    await TotalRevenuePoint.deleteMany({});
    console.log('🗑️ 已清空現有數據');

    // 導入種子數據
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

    // 插入數據
    await OrderChartPoint.insertMany(seedData.ordercharts);
    await PaymentBreakdown.insertMany(seedData.payments);
    await SalesStat.insertMany(seedData.salesstats);
    await TotalRevenuePoint.insertMany(seedData.totalrevenue);

    console.log('✅ 數據遷移完成！');
    console.log(`📊 已導入 ${seedData.ordercharts.length} 筆訂單圖表數據`);
    console.log(`💳 已導入 ${seedData.payments.length} 筆支付數據`);
    console.log(`📈 已導入 ${seedData.salesstats.length} 筆銷售統計數據`);
    console.log(`💰 已導入 ${seedData.totalrevenue.length} 筆總收入數據`);

  } catch (error) {
    console.error('❌ 數據遷移失敗：', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 已斷開數據庫連接');
  }
}

// 執行遷移
migrateData();
