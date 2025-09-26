const mongoose = require('mongoose');

// MongoDB 連接
const MONGO_URI = 'process.env.MONGO_URI';

// Schema 定義
const DashboardDataSchema = new mongoose.Schema({
  ecomExpensesRight: {
    title: { type: String, default: 'Expenses' },
    value: { type: Number, required: true },
    unit: { type: String, default: 'k' },
    changePercentage: { type: Number, required: true },
    changeDirection: { type: String, enum: ['up', 'down'], required: true },
    period: { type: String, required: true },
    chartData: [{
      blue: { type: Number, required: true },
      orange: { type: Number, required: true }
    }]
  }
}, { collection: 'dashboard' });

let DashboardData;
try { 
  DashboardData = mongoose.model('DashboardData'); 
} catch { 
  DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard'); 
}

// 更新數據
async function updateEcomExpensesRightData() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');

    const ecomExpensesRightData = {
      title: 'Expenses',
      value: 84.7,
      unit: 'k',
      changePercentage: 8.2,
      changeDirection: 'down',
      period: 'JULY 2025',
      chartData: [
        { blue: 45, orange: 30 },
        { blue: 35, orange: 25 },
        { blue: 50, orange: 35 },
        { blue: 40, orange: 28 },
        { blue: 60, orange: 40 },
        { blue: 30, orange: 20 },
        { blue: 55, orange: 38 },
        { blue: 42, orange: 32 },
        { blue: 38, orange: 26 },
        { blue: 48, orange: 34 },
        { blue: 33, orange: 22 },
        { blue: 52, orange: 36 }
      ]
    };

    // 更新或創建文檔
    const result = await DashboardData.findOneAndUpdate(
      {},
      { $set: { ecomExpensesRight: ecomExpensesRightData } },
      { upsert: true, new: true }
    );

    console.log('Ecommerce Expenses Right data updated successfully:', result.ecomExpensesRight);
  } catch (error) {
    console.error('Error updating Ecommerce Expenses Right data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

// 執行更新
updateEcomExpensesRightData();
