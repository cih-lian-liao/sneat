const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  crmTopSales: {
    title: { type: String, default: 'Top Products by Sales' },
    items: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      brand: { type: String, required: true },
      amount: { type: Number, required: true },
      icon: { type: String, default: '🛒' },
      bg: { type: String, default: '#e5e7eb' }
    }]
  }
}, { collection: 'dashboard' });

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function run() {
  const MONGO_URI = process.env.MONGO_URI || 'process.env.MONGO_URI';

  const payload = {
    title: 'Top Products by Sales',
    items: [
      { id: '1', name: 'Oneplus Nord', brand: 'Oneplus', amount: 98348, icon: '📱', bg: '#fee2e2' },
      { id: '2', name: 'Smart Band 4', brand: 'Xiaomi', amount: 15459, icon: '⌚️', bg: '#e9d5ff' },
      { id: '3', name: 'Surface Pro X', brand: 'Microsoft', amount: 4589, icon: '💻', bg: '#cffafe' },
      { id: '4', name: 'iPhone 13', brand: 'Apple', amount: 84345, icon: '📱', bg: '#dcfce7' },
      { id: '5', name: 'Bluetooth Earphone', brand: 'Beats', amount: 103748, icon: '🎧', bg: '#e5e7eb' }
    ]
  };

  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const res = await DashboardData.updateOne({}, { $set: { crmTopSales: payload } }, { upsert: true });
    console.log('✅ Upserted crmTopSales:', res.acknowledged ? 'OK' : res);

    const doc = await DashboardData.findOne({}, { crmTopSales: 1, _id: 0 }).lean();
    console.log('🔎 Preview crmTopSales:', JSON.stringify(doc?.crmTopSales, null, 2));
  } catch (e) {
    console.error('❌ Failed to update crmTopSales:', e);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();


