const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  customerRatings: {
    title: { type: String, default: 'Customer Ratings' },
    rating: { type: Number, default: 4.0 },
    changePoints: { type: Number, default: 5.0 },
    chartData: {
      months: [{ type: String, required: true }],
      current: [{ type: Number, required: true }]
    }
  }
}, { collection: 'dashboard' });

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function run() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const payload = {
      title: 'Customer Ratings',
      rating: 4.0,
      changePoints: 5.0,
      chartData: {
        months: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
        current: [2.2, 1.8, 4.1, 3.2, 3.4, 2.1, 4.5]
      }
    };

    const res = await DashboardData.updateOne({}, { $set: { customerRatings: payload } }, { upsert: true });
    console.log('✅ Upserted customerRatings:', res.acknowledged ? 'OK' : res);
    const doc = await DashboardData.findOne({}, { customerRatings: 1, _id: 0 }).lean();
    console.log('🔎 Preview current:', doc?.customerRatings?.chartData?.current);
  } catch (e) {
    console.error('❌ Failed to update customerRatings:', e);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();


