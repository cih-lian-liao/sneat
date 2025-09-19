// api/revenue.js
export const config = {
  runtime: 'nodejs',
};

const mongoose = require('mongoose');

// 定義 Revenue Schema
const RevenueSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    default: 'Revenue'
  },
  totalRevenue: { 
    type: Number, 
    required: true 
  },
  weeklyData: [{
    day: { 
      type: String, 
      required: true,
      enum: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    },
    revenue: { 
      type: Number, 
      required: true 
    },
    isHighlighted: { 
      type: Boolean, 
      default: false 
    }
  }],
  currency: { 
    type: String, 
    default: 'USD' 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true,
  collection: 'revenue' 
});

// 檢查模型是否已存在
let Revenue;
try {
  Revenue = mongoose.model('Revenue');
} catch (error) {
  Revenue = mongoose.model('Revenue', RevenueSchema, 'revenue');
}

export default async function handler(req, res) {
  // CORS 設置
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // MongoDB 連接
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
      });
    }

    const data = await Revenue.findOne({}).sort({ lastUpdated: -1 }).lean();

    if (!data) {
      return res.status(200).json({
        title: "Revenue",
        totalRevenue: 425000,
        weeklyData: [
          { day: "M", revenue: 45000, isHighlighted: false },
          { day: "T", revenue: 62000, isHighlighted: false },
          { day: "W", revenue: 58000, isHighlighted: false },
          { day: "T", revenue: 41000, isHighlighted: false },
          { day: "F", revenue: 89000, isHighlighted: true },
          { day: "S", revenue: 38000, isHighlighted: false },
          { day: "S", revenue: 52000, isHighlighted: false }
        ],
        currency: "USD",
        debug: 'No data found, using default values'
      });
    }

    res.status(200).json({
      title: data.title,
      totalRevenue: data.totalRevenue,
      weeklyData: data.weeklyData,
      currency: data.currency,
      lastUpdated: data.lastUpdated,
      debug: 'Data fetched from MongoDB successfully'
    });
  } catch (err) {
    console.error('GET /api/revenue error', err);
    res.status(500).json({ 
      error: '取得 Revenue 數據失敗: ' + err.message,
      debug: 'MongoDB connection failed',
      errorType: err.name
    });
  }
}