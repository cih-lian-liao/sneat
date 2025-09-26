const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'process.env.MONGO_URI';

const dashboardSchema = new mongoose.Schema({
  ecomTotalIncome: {
    title: String,
    subtitle: String,
    series: [Number],
    labels: [String],
    yTicks: [String],
    reportTitle: String,
    reportSubtitle: String,
    items: [{ icon: String, label: String, amount: Number, delta: Number, dir: String, color: String }]
  }
}, { collection: 'dashboard', timestamps: true });

const DashboardData = mongoose.model('DashboardData', dashboardSchema);

const seed = {
  title: 'Total Income',
  subtitle: 'Yearly report overview',
  series: [3200,3200,4800,4800,3000,3000,1600,1600,3600,3600,5600,5600],
  labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  yTicks: ['$1k','$2k','$3k','$4k','$5k','$6k'],
  reportTitle: 'Report',
  reportSubtitle: 'Monthly Avg. $45.578k',
  items: [
    { icon: '💳', label: 'Income', amount: 42845, delta: 2.7, dir: 'up', color: '#10b981' },
    { icon: '🛍️', label: 'Expense', amount: 38658, delta: 1.15, dir: 'down', color: '#ef4444' },
    { icon: '💼', label: 'Profit', amount: 18220, delta: 1.34, dir: 'up', color: '#10b981' }
  ]
};

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected');
    let doc = await DashboardData.findOne();
    if (!doc) doc = new DashboardData();
    doc.ecomTotalIncome = seed;
    await doc.save();
    console.log('✅ ecomTotalIncome updated');
  } catch (e) {
    console.error('❌ Seed error', e);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
  }
})();


