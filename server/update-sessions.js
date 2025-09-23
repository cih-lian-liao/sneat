const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  sessions: {
    title: { type: String, default: 'Sessions' },
    total: { type: Number, default: 2845 },
    chartData: [{ value: { type: Number, required: true } }]
  }
}, { collection: 'dashboard' });

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function run() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const payload = {
      title: 'Sessions',
      total: 2845,
      chartData: [
        { value: 40 }, { value: 36 }, { value: 30 }, { value: 30 }, { value: 24 },
        { value: 28 }, { value: 42 }, { value: 60 }, { value: 58 }, { value: 62 },
        { value: 55 }, { value: 85 }
      ]
    };

    const res = await DashboardData.updateOne({}, { $set: { sessions: payload } }, { upsert: true });
    console.log('✅ Upserted sessions:', res.acknowledged ? 'OK' : res);
    const doc = await DashboardData.findOne({}, { sessions: 1, _id: 0 }).lean();
    console.log('🔎 Preview sessions.total:', doc?.sessions?.total, 'points:', doc?.sessions?.chartData?.length);
  } catch (e) {
    console.error('❌ Failed to update sessions:', e);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();


