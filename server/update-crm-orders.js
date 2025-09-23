const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  crmOrders: {
    title: { type: String, default: 'Order' },
    amount: { type: Number, default: 1286 },
    changePct: { type: Number, default: -13.24 },
    icon: { type: String, default: '🧊' }
  }
}, { collection: 'dashboard' });

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function run() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const payload = { title: 'Order', amount: 1286, changePct: -13.24, icon: '🧊' };

    const res = await DashboardData.updateOne({}, { $set: { crmOrders: payload } }, { upsert: true });
    console.log('✅ Upserted crmOrders:', res.acknowledged ? 'OK' : res);
    const doc = await DashboardData.findOne({}, { crmOrders: 1, _id: 0 }).lean();
    console.log('🔎 Preview crmOrders:', doc?.crmOrders);
  } catch (e) {
    console.error('❌ Failed to update crmOrders:', e);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();


