const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  overviewActivity: {
    title: { type: String, default: 'Overview & Sales Activity' },
    subtitle: { type: String, default: 'Check out each column for more details' },
    months: [{ type: String, required: true }],
    primary: [{ type: Number, required: true }],
    secondary: [{ type: Number, required: true }]
  }
}, { collection: 'dashboard' });

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function run() {
  const MONGO_URI = process.env.MONGO_URI || 'process.env.MONGO_URI';
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connected to MongoDB');

    const payload = {
      title: 'Overview & Sales Activity',
      subtitle: 'Check out each column for more details',
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
      primary: [92, 78, 85, 88, 72, 98, 83],
      secondary: [35, 28, 42, 48, 33, 52, 41]
    };

    const res = await DashboardData.updateOne({}, { $set: { overviewActivity: payload } }, { upsert: true });
    console.log('✅ Upserted overviewActivity:', res.acknowledged ? 'OK' : res);
    const doc = await DashboardData.findOne({}, { overviewActivity: 1, _id: 0 }).lean();
    console.log('🔎 Preview months:', doc?.overviewActivity?.months);
  } catch (e) {
    console.error('❌ Failed to update overviewActivity:', e);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();


