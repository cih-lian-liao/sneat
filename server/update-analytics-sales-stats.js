const mongoose = require('mongoose');

// MongoDB Atlas 連接字符串
const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';

// DashboardData Schema
const dashboardSchema = new mongoose.Schema({
  // Analytics Sales Stats (Analytics page)
  analyticsSalesStats: {
    totalSales: { type: Number, default: 0 },
    changePct: { type: Number, default: 0 },
    changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
    chartData: [{
      month: { type: String, required: true },
      sales: { type: Number, required: true }
    }]
  }
}, { 
  timestamps: true, 
  collection: 'dashboard' 
});

const DashboardData = mongoose.model('DashboardData', dashboardSchema);

// Analytics Sales Stats 數據
const analyticsSalesStatsData = {
  totalSales: 125000,
  changePct: 8.2,
  changeType: 'increase',
  chartData: [
    { month: 'Jan', sales: 120000 },
    { month: 'Feb', sales: 135000 },
    { month: 'Mar', sales: 125000 },
    { month: 'Apr', sales: 140000 },
    { month: 'May', sales: 130000 },
    { month: 'Jun', sales: 145000 }
  ]
};

async function updateAnalyticsSalesStats() {
  try {
    // 連接到 MongoDB Atlas
    await mongoose.connect(MONGODB_URI);
    console.log('✅ 已連接到 MongoDB Atlas');

    // 查找現有的 dashboard 文檔
    let dashboard = await DashboardData.findOne();
    
    if (!dashboard) {
      // 如果沒有現有文檔，創建一個新的
      dashboard = new DashboardData();
      console.log('📄 創建新的 dashboard 文檔');
    } else {
      console.log('📄 找到現有的 dashboard 文檔');
    }

    // 更新 analyticsSalesStats 數據
    dashboard.analyticsSalesStats = analyticsSalesStatsData;
    
    // 保存到數據庫
    await dashboard.save();
    console.log('✅ Analytics Sales Stats 數據已成功更新到 MongoDB Atlas');
    
    // 驗證數據
    const updatedDashboard = await DashboardData.findOne();
    console.log('📊 更新後的 Analytics Sales Stats 數據:');
    console.log(`- 總銷售額: $${updatedDashboard.analyticsSalesStats.totalSales.toLocaleString()}`);
    console.log(`- 變化百分比: ${updatedDashboard.analyticsSalesStats.changePct}%`);
    console.log(`- 變化類型: ${updatedDashboard.analyticsSalesStats.changeType}`);
    console.log(`- 圖表數據點數量: ${updatedDashboard.analyticsSalesStats.chartData.length}`);

  } catch (error) {
    console.error('❌ 更新 Analytics Sales Stats 數據時發生錯誤:', error);
  } finally {
    // 關閉數據庫連接
    await mongoose.disconnect();
    console.log('🔌 已斷開 MongoDB Atlas 連接');
  }
}

// 執行更新
updateAnalyticsSalesStats();
