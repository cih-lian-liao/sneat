const mongoose = require('mongoose');

// MongoDB 連接
const MONGO_URI = 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';

// Schema 定義
const DashboardDataSchema = new mongoose.Schema({
  ecomRevenue: {
    title: { type: String, default: 'Revenue' },
    value: { type: Number, required: true },
    changePercentage: { type: Number, required: true },
    changeDirection: { type: String, enum: ['up', 'down'], required: true },
    iconType: { type: String, default: 'monitor' },
    iconBgColor: { type: String, default: '#FFF5E0' },
    iconColor: { type: String, default: '#FFAB00' }
  }
}, { collection: 'dashboard' });

let DashboardData;
try { 
  DashboardData = mongoose.model('DashboardData'); 
} catch { 
  DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard'); 
}

// 更新數據
async function updateEcomRevenueData() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');

    const ecomRevenueData = {
      title: 'Revenue',
      value: 42389,
      changePercentage: 52.76,
      changeDirection: 'up',
      iconType: 'monitor',
      iconBgColor: '#FFF5E0',
      iconColor: '#FFAB00'
    };

    // 更新或創建文檔
    const result = await DashboardData.findOneAndUpdate(
      {},
      { $set: { ecomRevenue: ecomRevenueData } },
      { upsert: true, new: true }
    );

    console.log('Ecommerce Revenue data updated successfully:', result.ecomRevenue);
  } catch (error) {
    console.error('Error updating Ecommerce Revenue data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

// 執行更新
updateEcomRevenueData();
