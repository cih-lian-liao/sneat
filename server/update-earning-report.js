const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  earningReport: {
    reportTitle: { type: String, default: 'Earning Report' },
    reportSubtitle: { type: String, default: 'Weekly Earnings Overview' },
    metrics: [{
      name: { type: String, required: true },
      secondaryInfo: { type: String, required: true },
      value: { type: Number, required: true },
      changePercentage: { type: Number, required: true },
      changeDirection: { type: String, enum: ['up', 'down'], required: true },
      iconType: { type: String, required: true },
      iconColor: { type: String, required: true }
    }],
    dailyData: [{
      day: { type: String, required: true },
      value: { type: Number, required: true },
      highlighted: { type: Boolean, default: false }
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
      reportTitle: 'Earning Report',
      reportSubtitle: 'Weekly Earnings Overview',
      metrics: [
        {
          name: 'Net Profit',
          secondaryInfo: '12.4k Sales',
          value: 1619,
          changePercentage: 18.6,
          changeDirection: 'up',
          iconType: 'trend-up',
          iconColor: 'purple'
        },
        {
          name: 'Total Income',
          secondaryInfo: 'Sales, Affiliation',
          value: 3571,
          changePercentage: 39.6,
          changeDirection: 'up',
          iconType: 'dollar-sign',
          iconColor: 'green'
        },
        {
          name: 'Total Expenses',
          secondaryInfo: 'ADVT, Marketing',
          value: 430,
          changePercentage: 52.8,
          changeDirection: 'up',
          iconType: 'credit-card',
          iconColor: 'gray'
        }
      ],
      dailyData: [
        { day: 'Mo', value: 1200, highlighted: false },
        { day: 'Tu', value: 1800, highlighted: false },
        { day: 'We', value: 2200, highlighted: false },
        { day: 'Th', value: 1900, highlighted: false },
        { day: 'Fr', value: 2800, highlighted: true },
        { day: 'Sa', value: 1600, highlighted: false },
        { day: 'Su', value: 1400, highlighted: false }
      ]
    };
    
    const res = await DashboardData.updateOne({}, { $set: { earningReport: payload } }, { upsert: true });
    console.log('✅ Upserted earningReport:', res.acknowledged ? 'OK' : res);
    
    const doc = await DashboardData.findOne({}, { earningReport: 1, _id: 0 }).lean();
    console.log('🔎 Preview earningReport:', JSON.stringify(doc?.earningReport, null, 2));
  }catch(e){
    console.error('❌ Failed to update earningReport:', e);
    process.exitCode = 1;
  }finally{
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();
