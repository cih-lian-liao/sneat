const mongoose = require('mongoose');

// MongoDB 連接
const MONGO_URI = 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';

// Schema 定義
const DashboardDataSchema = new mongoose.Schema({
  ecomExpensesRight: {
    title: { type: String, default: 'Expenses' },
    totalAmount: { type: Number, required: true },
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
      totalAmount: 84.7,
      unit: 'k',
      changePercentage: 8.2,
      changeDirection: 'down',
      period: 'JULY 2025',
      chartData: [
        { blue: 45, orange: 30 },
        { blue: 35, orange: 25 },
        { blue: 50, orange: 35 },
        { blue: 40, orange: 28 },
        { blue: 65, orange: 40 },
        { blue: 30, orange: 20 },
        { blue: 55, orange: 38 },
        { blue: 42, orange: 32 },
        { blue: 38, orange: 26 },
        { blue: 60, orange: 45 },
        { blue: 48, orange: 35 },
        { blue: 35, orange: 28 }
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
