const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  salesByCountries: {
    title: { type: String, default: 'Sales by Countries' },
    subtitle: { type: String, default: 'Monthly Sales Overview' },
    countries: [{
      flag: { type: String, required: true },
      countryName: { type: String, required: true },
      salesAmount: { type: String, required: true },
      changePercentage: { type: Number, required: true },
      changeDirection: { type: String, enum: ['up', 'down'], required: true },
      rightValue: { type: String, required: true }
    }]
  }
}, { collection: 'dashboard' });

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function run(){
  const MONGO_URI = process.env.MONGO_URI || 'process.env.MONGO_URI';
  try{
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    const payload = {
      title: 'Sales by Countries',
      subtitle: 'Monthly Sales Overview',
      countries: [
        {
          flag: '🇺🇸',
          countryName: 'United states of america',
          salesAmount: '$8,656k',
          changePercentage: 25.8,
          changeDirection: 'up',
          rightValue: '894k'
        },
        {
          flag: '🇧🇷',
          countryName: 'Brazil',
          salesAmount: '$2,415k',
          changePercentage: -6.2,
          changeDirection: 'down',
          rightValue: '645k'
        },
        {
          flag: '🇮🇳',
          countryName: 'India',
          salesAmount: '$865k',
          changePercentage: 12.4,
          changeDirection: 'up',
          rightValue: '148k'
        },
        {
          flag: '🇦🇺',
          countryName: 'Australia',
          salesAmount: '$745k',
          changePercentage: -11.9,
          changeDirection: 'down',
          rightValue: '86k'
        },
        {
          flag: '🇧🇪',
          countryName: 'Belgium',
          salesAmount: '$45k',
          changePercentage: 16.2,
          changeDirection: 'up',
          rightValue: '42k'
        },
        {
          flag: '🇨🇳',
          countryName: 'China',
          salesAmount: '$12k',
          changePercentage: 14.8,
          changeDirection: 'up',
          rightValue: '8k'
        }
      ]
    };
    
    const res = await DashboardData.updateOne({}, { $set: { salesByCountries: payload } }, { upsert: true });
    console.log('✅ Upserted salesByCountries:', res.acknowledged ? 'OK' : res);
    
    const doc = await DashboardData.findOne({}, { salesByCountries: 1, _id: 0 }).lean();
    console.log('🔎 Preview salesByCountries:', JSON.stringify(doc?.salesByCountries, null, 2));
  }catch(e){
    console.error('❌ Failed to update salesByCountries:', e);
    process.exitCode = 1;
  }finally{
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();
