const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'process.env.MONGO_URI';

const dashboardSchema = new mongoose.Schema({
  activity: {
    title: { type: String, default: 'Activity' },
    periodLabel: { type: String, default: 'Last Week' },
    percent: { type: Number, default: 0 },
    deltaPct: { type: Number, default: 0 },
    deltaDirection: { type: String, enum: ['up', 'down'], default: 'up' },
    weekly: [{ label: String, value: Number }]
  }
}, { collection: 'dashboard', timestamps: true });

const DashboardData = mongoose.model('DashboardData', dashboardSchema);

const seed = {
  title: 'Activity',
  periodLabel: 'Last Week',
  percent: 82,
  deltaPct: 19.6,
  deltaDirection: 'up',
  weekly: [
    { label: 'Mo', value: 20 },
    { label: 'Tu', value: 28 },
    { label: 'We', value: 24 },
    { label: 'Th', value: 70 },
    { label: 'Fr', value: 10 },
    { label: 'Sa', value: 55 },
    { label: 'Su', value: 40 }
  ]
};

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected');
    let doc = await DashboardData.findOne();
    if (!doc) doc = new DashboardData();
    doc.activity = seed;
    await doc.save();
    console.log('✅ activity updated');
  } catch (e) {
    console.error('❌ Seed error', e);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
  }
})();


