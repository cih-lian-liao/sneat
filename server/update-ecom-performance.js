const mongoose = require('mongoose');

const MONGO_URI = 'process.env.MONGO_URI';

const DashboardDataSchema = new mongoose.Schema({
  ecomPerformance: {
    title: { type: String, default: 'Performance' },
    metrics: {
      earning: { type: Number, required: true },
      sales: { type: Number, required: true }
    },
    chartData: {
      months: [{ type: String, required: true }],
      income: [{ type: Number, required: true }],
      earning: [{ type: Number, required: true }]
    }
  }
});

let DashboardData;
try { 
  DashboardData = mongoose.model('DashboardData'); 
} catch { 
  DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard'); 
}

async function updateEcomPerformance() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');

    const ecomPerformanceData = {
      title: 'Performance',
      metrics: {
        earning: 846.17,
        sales: 25.7
      },
      chartData: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        income: [65, 45, 35, 25, 55, 70],
        earning: [80, 60, 40, 30, 70, 85]
      }
    };

    await DashboardData.findOneAndUpdate(
      {},
      { $set: { ecomPerformance: ecomPerformanceData } },
      { upsert: true, new: true }
    );

    console.log('Ecommerce Performance data updated successfully');
  } catch (error) {
    console.error('Error updating ecom performance data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

updateEcomPerformance();
