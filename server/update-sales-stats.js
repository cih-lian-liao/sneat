const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  salesStats: {
    title: { type: String, default: 'Sales Stats' },
    percentage: { type: Number, required: true },
    label: { type: String, required: true },
    iconType: { type: String, default: 'trend-up' },
    iconColor: { type: String, default: '#10b981' },
    legend: [{
      color: { type: String, required: true },
      label: { type: String, required: true }
    }]
  }
}, { collection: 'dashboard' });

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function run(){
  const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';
  try{
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    const payload = {
      title: 'Sales Stats',
      percentage: 75,
      label: 'Sales',
      iconType: 'trend-up',
      iconColor: '#10b981',
      legend: [
        {
          color: '#10b981',
          label: 'Conversion Ratio'
        },
        {
          color: '#e5e7eb',
          label: 'Total requirements'
        }
      ]
    };
    
    const res = await DashboardData.updateOne({}, { $set: { salesStats: payload } }, { upsert: true });
    console.log('✅ Upserted salesStats:', res.acknowledged ? 'OK' : res);
    
    const doc = await DashboardData.findOne({}, { salesStats: 1, _id: 0 }).lean();
    console.log('🔎 Preview salesStats:', JSON.stringify(doc?.salesStats, null, 2));
  }catch(e){
    console.error('❌ Failed to update salesStats:', e);
    process.exitCode = 1;
  }finally{
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();
