const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';

const dashboardSchema = new mongoose.Schema({
  ecomProfit: {
    title: { type: String, default: 'Profit' },
    amount: { type: Number, default: 0 },
    months: [{ label: String, bars: [Number] }]
  }
}, { collection: 'dashboard', timestamps: true });

const DashboardData = mongoose.model('DashboardData', dashboardSchema);

const seed = {
  title: 'Profit',
  amount: 624000,
  months: [
    { label: 'Jan', bars: [48, 40] },
    { label: 'Apr', bars: [32, 18] },
    { label: 'Jul', bars: [46, 60] },
    { label: 'Oct', bars: [100, 90] }
  ]
};

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected');
    let doc = await DashboardData.findOne();
    if (!doc) doc = new DashboardData();
    doc.ecomProfit = seed;
    await doc.save();
    console.log('✅ ecomProfit updated');
  } catch (e) {
    console.error('❌ Seed error', e);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
  }
})();


