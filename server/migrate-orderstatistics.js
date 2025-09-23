const mongoose = require('mongoose');
require('dotenv').config();
const seed = require('./seed/orderstatistics.json');
const OrderStatistics = require('./models/OrderStatistics');

async function run() {
  try {
    console.log('🔄 開始遷移 OrderStatistics 數據...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ 已連線到 MongoDB');

    await OrderStatistics.deleteMany({});
    const inserted = await OrderStatistics.insertMany(seed);
    console.log(`✅ 已插入 ${inserted.length} 筆 OrderStatistics 數據`);
  } catch (e) {
    console.error('❌ 遷移失敗:', e.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 已斷開 MongoDB');
  }
}

run();
