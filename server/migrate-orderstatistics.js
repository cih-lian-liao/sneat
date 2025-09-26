const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// 引入 OrderStatistics 模型
const OrderStatistics = require('./models/OrderStatistics');

// 讀取種子數據
const seedPath = path.join(__dirname, 'seed', 'orderstatistics.json');
const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));

async function migrateData() {
  try {
    // 連接 MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'process.env.MONGO_URI', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ 已連接到 MongoDB');
    
    // 清除現有數據
    await OrderStatistics.deleteMany({});
    console.log('✅ 已清除現有數據');
    
    // 插入新數據
    const result = await OrderStatistics.insertMany(seedData);
    console.log('✅ 數據遷移完成:', result.length, '條記錄');
    
    // 驗證數據
    const count = await OrderStatistics.countDocuments();
    console.log('✅ 數據庫中現有記錄數:', count);
    
    // 顯示插入的數據
    const insertedData = await OrderStatistics.findOne({});
    console.log('✅ 插入的數據:', JSON.stringify(insertedData, null, 2));
    
  } catch (error) {
    console.error('❌ 數據遷移失敗:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ 已斷開 MongoDB 連接');
    process.exit(0);
  }
}

migrateData();