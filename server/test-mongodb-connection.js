const mongoose = require('mongoose');

// MongoDB Atlas 連接字符串
const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';

async function testConnection() {
  try {
    console.log('嘗試連接到 MongoDB Atlas...');
    console.log('連接字符串:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // 隱藏密碼
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ MongoDB Atlas 連接成功');
    
    // 測試查詢
    const DashboardDataSchema = new mongoose.Schema({}, { collection: 'dashboard' });
    const DashboardData = mongoose.model('DashboardData', DashboardDataSchema);
    
    const doc = await DashboardData.findOne({}).lean();
    console.log('📄 找到文檔:', doc ? '是' : '否');
    
    if (doc) {
      console.log('📊 文檔包含的卡片:', Object.keys(doc));
      
      // 檢查特定卡片
      if (doc.crmTopSales) {
        console.log('✅ crmTopSales 數據存在');
      } else {
        console.log('❌ crmTopSales 數據不存在');
      }
      
      if (doc.crmTopVolume) {
        console.log('✅ crmTopVolume 數據存在');
      } else {
        console.log('❌ crmTopVolume 數據不存在');
      }
      
      if (doc.teamMembers) {
        console.log('✅ teamMembers 數據存在');
      } else {
        console.log('❌ teamMembers 數據不存在');
      }
    }
    
  } catch (error) {
    console.error('❌ MongoDB 連接失敗:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 已斷開連接');
  }
}

testConnection();
