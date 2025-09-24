const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';

const dashboardSchema = new mongoose.Schema({
  ecomExpenses: {
    title: { type: String, default: 'Expenses' },
    percent: { type: Number, default: 0 },
    note: { type: String, default: '' }
  }
}, { collection: 'dashboard', timestamps: true });

const DashboardData = mongoose.model('DashboardData', dashboardSchema);

const seed = { title: 'Expenses', percent: 72, note: '$2k Expenses more than last month' };

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected');
    let doc = await DashboardData.findOne();
    if (!doc) doc = new DashboardData();
    doc.ecomExpenses = seed;
    await doc.save();
    console.log('✅ ecomExpenses updated');
  } catch (e) {
    console.error('❌ Seed error', e);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
  }
})();


