const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  crmTopVolume: {
    title: { type: String, default: 'Top Products by Volume' },
    items: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      brand: { type: String, required: true },
      volume: { type: Number, required: true },
      changePct: { type: Number, required: true },
      icon: { type: String, default: '🛒' },
      bg: { type: String, default: '#e5e7eb' },
      iconColor: { type: String, default: '#6b7280' }
    }]
  }
}, { collection: 'dashboard' });

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function run() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';

  const payload = {
    title: 'Top Products by Volume',
    items: [
      { id: '1', name: 'ENVY Laptop', brand: 'HP', volume: 12.4, changePct: 12.4, icon: '💻', bg: '#f3f4f6', iconColor: '#6b7280' },
      { id: '2', name: 'Apple iMac Pro', brand: 'iMac Pro', volume: 74.9, changePct: -8.5, icon: '🖥️', bg: '#fef3c7', iconColor: '#d97706' },
      { id: '3', name: 'Smart Watch', brand: 'Fitbit', volume: 4.4, changePct: 17.6, icon: '⌚️', bg: '#fecaca', iconColor: '#dc2626' },
      { id: '4', name: 'Oneplus Nord', brand: 'Oneplus', volume: 12.34, changePct: 13.9, icon: '📱', bg: '#dcfce7', iconColor: '#16a34a' },
      { id: '5', name: 'Pixel 4a', brand: 'Google', volume: 8.65, changePct: -11.8, icon: '📱', bg: '#e9d5ff', iconColor: '#7c3aed' }
    ]
  };

  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const res = await DashboardData.updateOne({}, { $set: { crmTopVolume: payload } }, { upsert: true });
    console.log('✅ Upserted crmTopVolume:', res.acknowledged ? 'OK' : res);

    const doc = await DashboardData.findOne({}, { crmTopVolume: 1, _id: 0 }).lean();
    console.log('🔎 Preview crmTopVolume:', JSON.stringify(doc?.crmTopVolume, null, 2));
  } catch (e) {
    console.error('❌ Failed to update crmTopVolume:', e);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();
