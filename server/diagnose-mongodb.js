const mongoose = require('mongoose');

async function diagnoseMongoDB() {
  const mongoUri = 'process.env.MONGO_URI';
  
  console.log('🔍 MongoDB Atlas 診斷開始...');
  console.log('連接字符串:', mongoUri.replace(/\/\/.*@/, '//***:***@'));
  
  try {
    // 設置連接超時
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5秒超時
      connectTimeoutMS: 10000, // 10秒連接超時
    };
    
    console.log('⏱️ 嘗試連接 (5秒超時)...');
    await mongoose.connect(mongoUri, options);
    console.log('✅ 連接成功');
    
    // 測試查詢
    const DashboardDataSchema = new mongoose.Schema({}, { collection: 'dashboard' });
    const DashboardData = mongoose.model('DashboardData', DashboardDataSchema);
    
    const doc = await DashboardData.findOne({}).lean();
    console.log('📄 查詢結果:', doc ? '成功' : '無數據');
    
    if (doc) {
      console.log('📊 可用卡片:', Object.keys(doc).filter(key => !key.startsWith('_')));
    }
    
  } catch (error) {
    console.error('❌ 連接失敗:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('💡 建議: 檢查 DNS 解析或網絡連接');
    } else if (error.message.includes('authentication')) {
      console.log('💡 建議: 檢查用戶名和密碼');
    } else if (error.message.includes('timeout')) {
      console.log('💡 建議: 檢查 IP 訪問列表設置');
    } else if (error.message.includes('serverSelectionTimeoutMS')) {
      console.log('💡 建議: 檢查 MongoDB Atlas 集群狀態和 IP 訪問列表');
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 已斷開連接');
  }
}

diagnoseMongoDB();
