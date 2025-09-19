const mongoose = require('mongoose');
require('dotenv').config();
const seed = require('./seed/profitreports.json');
const ProfitReport = require('./models/ProfitReport');

async function run() {
  try {
    console.log('🔄 開始遷移 ProfitReport 數據...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ 已連線到 MongoDB');

    await ProfitReport.deleteMany({});
    const inserted = await ProfitReport.insertMany(seed);
    console.log(`✅ 已插入 ${inserted.length} 筆 ProfitReport 數據`);
  } catch (e) {
    console.error('❌ 遷移失敗:', e.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 已斷開 MongoDB');
  }
}

run();


