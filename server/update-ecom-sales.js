const mongoose = require('mongoose');

// MongoDB 連接
const MONGO_URI = 'process.env.MONGO_URI';

// Schema 定義
const DashboardDataSchema = new mongoose.Schema({
  ecomSales: {
    title: { type: String, default: 'Sales' },
    value: { type: Number, required: true },
    unit: { type: String, default: 'k' },
    changePercentage: { type: Number, required: true },
    changeDirection: { type: String, enum: ['up', 'down'], required: true },
    salesTargetLabel: { type: String, default: 'Sales Target' },
    salesTargetValue: { type: Number, required: true }
  }
}, { collection: 'dashboard' });

let DashboardData;
try { 
  DashboardData = mongoose.model('DashboardData'); 
} catch { 
  DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard'); 
}

// 更新數據
async function updateEcomSalesData() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');

    const ecomSalesData = {
      title: 'Sales',
      value: 482,
      unit: 'k',
      changePercentage: 34,
      changeDirection: 'up',
      salesTargetLabel: 'Sales Target',
      salesTargetValue: 78
    };

    // 更新或創建文檔
    const result = await DashboardData.findOneAndUpdate(
      {},
      { $set: { ecomSales: ecomSalesData } },
      { upsert: true, new: true }
    );

    console.log('Ecommerce Sales data updated successfully:', result.ecomSales);
  } catch (error) {
    console.error('Error updating Ecommerce Sales data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

// 執行更新
updateEcomSalesData();
