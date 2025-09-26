const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  totalRevenue: {
    title: { type: String, default: 'Total Revenue' },
    selectedYear: { type: String, default: '2025' },
    chartData: {
      months: [{ type: String, required: true }],
      data2025: [{ type: Number }],
      data2024: [{ type: Number, required: true }],
      data2023: [{ type: Number, required: true }]
    },
    growthMetrics: {
      growthPercentage: { type: Number, required: true },
      companyGrowth: { type: Number, required: true }
    },
    revenueCards: [{
      year: { type: String, required: true },
      amount: { type: Number, required: true },
      icon: { type: String, required: true },
      color: { type: String, required: true }
    }]
  }
}, { collection: 'dashboard' });

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function run() {
  const MONGO_URI = process.env.MONGO_URI || 'process.env.MONGO_URI';
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB');

    const payload = {
      title: 'Total Revenue',
      selectedYear: '2025',
      chartData: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        data2025: [20, 12, 22, 30, 19, 14, 18],
        data2024: [17, 5, 14, 28, 17, 10, 8],
        data2023: [12, 18, 10, 14, 3, 17, 15]
      },
      growthMetrics: {
        growthPercentage: 78,
        companyGrowth: 62
      },
      revenueCards: [
        { year: '2025', amount: 32500, icon: '$', color: '#8b5cf6' },
        { year: '2024', amount: 41200, icon: '📊', color: '#06b6d4' }
      ]
    };

    const res = await DashboardData.updateOne(
      {},
      { $set: { totalRevenue: payload } },
      { upsert: true }
    );

    console.log('✅ Upserted totalRevenue:', res.acknowledged ? 'OK' : res);

    const doc = await DashboardData.findOne({}, { totalRevenue: 1, _id: 0 }).lean();
    console.log('🔎 Preview totalRevenue.chartData.months:', doc?.totalRevenue?.chartData?.months);
  } catch (e) {
    console.error('❌ Failed to update totalRevenue:', e);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();


