const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  salesAnalytics: {
    title: { type: String, default: 'Sales Analytics' },
    selectedYear: { type: String, default: '2025' },
    yearlyData: {
      type: Map,
      of: {
        performanceIndicator: {
          percentage: { type: Number, required: true },
          label: { type: String, required: true }
        },
        heatmapData: {
          yAxisLabels: [{ type: String, required: true }],
          xAxisLabels: [{ type: String, required: true }],
          data: [[{ type: Number, required: true }]]
        }
      }
    }
  }
}, { collection: 'dashboard' });

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function run(){
  const MONGO_URI = process.env.MONGO_URI || 'process.env.MONGO_URI';
  try{
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    const payload = {
      title: 'Sales Analytics',
      selectedYear: '2025',
      yearlyData: {
        '2025': {
          performanceIndicator: { percentage: 42.6, label: 'Than last year' },
          heatmapData: {
            yAxisLabels: ['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k'],
            xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            data: [
              [0, 0, 0, 0, 0, 0, 0, 0], // 1k
              [0, 1, 0, 0, 0, 0, 0, 0], // 2k
              [0, 0, 1, 0, 0, 0, 0, 0], // 3k
              [0, 0, 0, 0, 0, 0, 0, 0], // 4k
              [0, 0, 0, 1, 1, 0, 0, 0], // 5k
              [0, 0, 0, 0, 0, 1, 0, 0], // 6k
              [0, 0, 0, 0, 0, 0, 1, 1], // 7k
              [0, 0, 0, 0, 0, 0, 0, 0]  // 8k
            ]
          }
        },
        '2024': {
          performanceIndicator: { percentage: 28.3, label: 'Than last year' },
          heatmapData: {
            yAxisLabels: ['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k'],
            xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            data: [
              [1, 0, 0, 0, 0, 0, 0, 0], // 1k
              [0, 0, 0, 0, 0, 0, 0, 0], // 2k
              [0, 1, 0, 0, 0, 0, 0, 0], // 3k
              [0, 0, 1, 0, 0, 0, 0, 0], // 4k
              [0, 0, 0, 0, 0, 0, 0, 0], // 5k
              [0, 0, 0, 1, 0, 0, 0, 0], // 6k
              [0, 0, 0, 0, 1, 0, 0, 0], // 7k
              [0, 0, 0, 0, 0, 1, 0, 0]  // 8k
            ]
          }
        },
        '2023': {
          performanceIndicator: { percentage: 15.7, label: 'Than last year' },
          heatmapData: {
            yAxisLabels: ['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k'],
            xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            data: [
              [0, 0, 0, 0, 0, 0, 0, 0], // 1k
              [0, 0, 0, 0, 0, 0, 0, 0], // 2k
              [0, 0, 0, 0, 0, 0, 0, 0], // 3k
              [0, 0, 0, 0, 0, 0, 0, 0], // 4k
              [0, 0, 0, 0, 0, 0, 0, 0], // 5k
              [0, 0, 0, 0, 0, 0, 0, 0], // 6k
              [0, 0, 0, 0, 0, 0, 0, 0], // 7k
              [0, 0, 0, 0, 0, 0, 0, 0]  // 8k
            ]
          }
        }
      }
    };
    
    const res = await DashboardData.updateOne({}, { $set: { salesAnalytics: payload } }, { upsert: true });
    console.log('✅ Upserted salesAnalytics:', res.acknowledged ? 'OK' : res);
    
    const doc = await DashboardData.findOne({}, { salesAnalytics: 1, _id: 0 }).lean();
    console.log('🔎 Preview salesAnalytics:', JSON.stringify(doc?.salesAnalytics, null, 2));
  }catch(e){
    console.error('❌ Failed to update salesAnalytics:', e);
    process.exitCode = 1;
  }finally{
    await mongoose.disconnect();
    console.log('✅ Disconnected');
  }
}

run();
