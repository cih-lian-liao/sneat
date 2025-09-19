// api/test-totalrevenue.js - 測試新的 Total Revenue API
export const config = {
  runtime: 'nodejs',
};

const mongoose = require('mongoose');

// 定義新的 Schema
const TotalRevenueSchema = new mongoose.Schema({
  year: { 
    type: Number, 
    required: true,
    unique: true 
  },
  totalRevenue: { 
    type: Number, 
    required: true 
  },
  monthlyRevenue: [{
    month: { 
      type: String, 
      required: true,
      enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    revenue: { 
      type: Number, 
      required: true 
    }
  }],
  growthRate: { 
    type: Number, 
    required: true 
  },
  currency: { 
    type: String, 
    default: 'USD' 
  },
  isProjection: { 
    type: Boolean, 
    default: false 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true,
  collection: 'totalrevenue_new'
});

let TotalRevenue;
try {
  TotalRevenue = mongoose.model('TotalRevenue');
} catch (error) {
  TotalRevenue = mongoose.model('TotalRevenue', TotalRevenueSchema, 'totalrevenue_new');
}

export default async function handler(req, res) {
  // 設定 CORS
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
    // 如果已經連接，直接使用
    if (mongoose.connection.readyState === 1) {
      console.log('Using existing MongoDB connection');
    } else {
      // 建立新連接
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
      });
      console.log('Connected to MongoDB Atlas');
    }
    
    const { year1 = 2025, year2 = 2024 } = req.query;

    // 獲取兩個年份的數據
    const [year1Data, year2Data] = await Promise.all([
      TotalRevenue.findOne({ year: parseInt(year1) }).lean(),
      TotalRevenue.findOne({ year: parseInt(year2) }).lean()
    ]);

    if (!year1Data || !year2Data) {
      return res.status(404).json({ 
        error: `數據不存在: ${year1} 或 ${year2} 年份數據未找到`,
        debug: 'No data found in MongoDB for specified years'
      });
    }

    // 計算年度增長百分比
    const growthPercentage = year2Data.totalRevenue > 0 
      ? ((year1Data.totalRevenue - year2Data.totalRevenue) / year2Data.totalRevenue * 100)
      : 0;

    // 格式化月度數據用於圖表
    const formatMonthlyData = (data) => {
      const labels = data.monthlyRevenue.map(item => item.month);
      const revenue = data.monthlyRevenue.map(item => item.revenue);
      return { labels, revenue };
    };

    const year1Formatted = formatMonthlyData(year1Data);
    const year2Formatted = formatMonthlyData(year2Data);

    res.status(200).json({
      year1: {
        year: year1Data.year,
        totalRevenue: year1Data.totalRevenue,
        monthlyRevenue: year1Data.monthlyRevenue,
        growthRate: year1Data.growthRate,
        isProjection: year1Data.isProjection,
        ...year1Formatted
      },
      year2: {
        year: year2Data.year,
        totalRevenue: year2Data.totalRevenue,
        monthlyRevenue: year2Data.monthlyRevenue,
        growthRate: year2Data.growthRate,
        isProjection: year2Data.isProjection,
        ...year2Formatted
      },
      growthPercentage: Math.round(growthPercentage * 10) / 10,
      currency: 'USD',
      lastUpdated: new Date().toISOString(),
      debug: 'NEW API: Data fetched from MongoDB successfully with new schema'
    });
  } catch (err) {
    console.error('GET /api/test-totalrevenue error', err);
    res.status(500).json({ error: '取得 TotalRevenue 失敗: ' + err.message });
  }
}
