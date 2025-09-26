const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'process.env.MONGO_URI';

const dashboardSchema = new mongoose.Schema({
  newVisitors: {
    title: { type: String, default: 'New Visitors' },
    periodLabel: { type: String, default: 'Last Week' },
    percent: { type: Number, default: 0 },
    deltaPct: { type: Number, default: 0 },
    deltaDirection: { type: String, enum: ['up', 'down'], default: 'down' },
    weekly: [{ label: String, value: Number, highlighted: { type: Boolean, default: false } }]
  }
}, { collection: 'dashboard', timestamps: true });

const DashboardData = mongoose.model('DashboardData', dashboardSchema);

const seed = {
  title: 'New Visitors',
  periodLabel: 'Last Week',
  percent: 23,
  deltaPct: -8.75,
  deltaDirection: 'down',
  weekly: [
    { label: 'Mo', value: 20 },
    { label: 'Tu', value: 48 },
    { label: 'We', value: 42 },
    { label: 'Th', value: 18 },
    { label: 'Fr', value: 30 },
    { label: 'Sa', value: 100, highlighted: true },
    { label: 'Su', value: 46 }
  ]
};

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected');
    let doc = await DashboardData.findOne();
    if (!doc) doc = new DashboardData();
    doc.newVisitors = seed;
    await doc.save();
    console.log('✅ newVisitors updated');
  } catch (e) {
    console.error('❌ Seed error', e);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
  }
})();


