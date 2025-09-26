const mongoose = require('mongoose');

// MongoDB 連接
const MONGO_URI = 'process.env.MONGO_URI';

// Schema 定義
const DashboardDataSchema = new mongoose.Schema({
  ecomConversionRate: {
    title: { type: String, default: 'Conversion Rate' },
    subtitle: { type: String, default: 'Compared To Last Month' },
    mainRate: { type: Number, required: true },
    changePercentage: { type: Number, required: true },
    changeDirection: { type: String, enum: ['up', 'down'], required: true },
    trendData: [{ type: Number, required: true }],
    metrics: [{
      name: { type: String, required: true },
      value: { type: String, required: true },
      changePercentage: { type: Number, required: true },
      changeDirection: { type: String, enum: ['up', 'down'], required: true }
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
async function updateConversionRateData() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');

    const conversionRateData = {
      title: 'Conversion Rate',
      subtitle: 'Compared To Last Month',
      mainRate: 8.72,
      changePercentage: 4.8,
      changeDirection: 'up',
      trendData: [20, 25, 30, 28, 35, 40, 45, 50, 48, 55, 60, 65],
      metrics: [
        {
          name: 'Impressions',
          value: '12.4k Visits',
          changePercentage: 12.8,
          changeDirection: 'up'
        },
        {
          name: 'Added To Cart',
          value: '32 Product in cart',
          changePercentage: -8.3,
          changeDirection: 'down'
        },
        {
          name: 'Checkout',
          value: '21 Product checkout',
          changePercentage: 9.12,
          changeDirection: 'up'
        },
        {
          name: 'Purchased',
          value: '12 Orders',
          changePercentage: 2.24,
          changeDirection: 'up'
        }
      ]
    };

    // 更新或創建文檔
    const result = await DashboardData.findOneAndUpdate(
      {},
      { $set: { ecomConversionRate: conversionRateData } },
      { upsert: true, new: true }
    );

    console.log('Conversion Rate data updated successfully:', result.ecomConversionRate);
  } catch (error) {
    console.error('Error updating Conversion Rate data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

// 執行更新
updateConversionRateData();
