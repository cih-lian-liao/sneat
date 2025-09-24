const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';

const dashboardSchema = new mongoose.Schema({
  ecomTransactions: {
    title: { type: String, default: 'Transactions' },
    amount: { type: Number, default: 0 },
    deltaPct: { type: Number, default: 0 },
    deltaDirection: { type: String, enum: ['up','down'], default: 'up' },
    iconUrl: { type: String, default: '' }
  }
}, { collection: 'dashboard', timestamps: true });

const DashboardData = mongoose.model('DashboardData', dashboardSchema);

const seed = { 
  title: 'Transactions', amount: 14854, deltaPct: 17.53, deltaDirection: 'up',
  iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png'
};

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected');
    let doc = await DashboardData.findOne();
    if (!doc) doc = new DashboardData();
    doc.ecomTransactions = seed;
    await doc.save();
    console.log('✅ ecomTransactions updated');
  } catch (e) {
    console.error('❌ Seed error', e);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
  }
})();


