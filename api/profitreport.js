export const config = { runtime: 'nodejs' };

const mongoose = require('mongoose');

const ProfitReportSchema = new mongoose.Schema({
  title: { type: String, default: 'Profit Report' },
  year: { type: Number, default: 2025 },
  value: { type: Number, required: true },
  changePct: { type: Number, required: true },
  changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
  chart: { type: [Number], default: [10, 65, 25, 55, 50, 90] },
  currency: { type: String, default: 'USD' },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true, collection: 'profitreports' });

let ProfitReport;
try { ProfitReport = mongoose.model('ProfitReport'); }
catch { ProfitReport = mongoose.model('ProfitReport', ProfitReportSchema, 'profitreports'); }

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
    const doc = await ProfitReport.findOne({}).lean();
    if (!doc) {
      return res.json({
        title: 'Profit Report', year: 2025, value: 84686,
        changePct: 68.2, changeType: 'increase', chart: [5,70,25,60,55,95], currency: 'USD',
        debug: 'No data found, default used'
      });
    }
    res.json({ ...doc, debug: 'Data fetched from MongoDB successfully' });
  } catch (err) {
    res.status(500).json({ error: '取得 ProfitReport 失敗: ' + err.message });
  }
}


