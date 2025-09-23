const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  crmLeads: {
    title: { type: String, default: 'Generated Leads' },
    subtitle: { type: String, default: 'Monthly Report' },
    total: { type: Number, default: 4234 },
    changePct: { type: Number, default: 12.8 },
    gaugePct: { type: Number, default: 25 }
  }
}, { collection: 'dashboard' });

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function run(){
  const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';
  try{
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');
    const payload = { title:'Generated Leads', subtitle:'Monthly Report', total:4234, changePct:12.8, gaugePct:25 };
    const res = await DashboardData.updateOne({}, { $set: { crmLeads: payload } }, { upsert: true });
    console.log('✅ Upserted crmLeads:', res.acknowledged ? 'OK' : res);
    const doc = await DashboardData.findOne({}, { crmLeads:1,_id:0 }).lean();
    console.log('🔎 Preview crmLeads:', doc?.crmLeads);
  }catch(e){
    console.error('❌ Failed to update crmLeads:', e);
    process.exitCode = 1;
  }finally{
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();


