// 測試 MongoDB Atlas 連接和數據
const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas";

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

const TotalRevenue = mongoose.model('TotalRevenue', TotalRevenueSchema);

async function testMongoDBAtlas() {
  try {
    console.log('🔄 測試 MongoDB Atlas 連接...');
    
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    console.log('✅ 已連線到 MongoDB Atlas');

    // 查詢數據
    const year1Data = await TotalRevenue.findOne({ year: 2025 }).lean();
    const year2Data = await TotalRevenue.findOne({ year: 2024 }).lean();

    console.log('📊 查詢結果:');
    console.log('Year 2025:', year1Data ? `$${(year1Data.totalRevenue / 1000).toFixed(0)}k` : 'Not found');
    console.log('Year 2024:', year2Data ? `$${(year2Data.totalRevenue / 1000).toFixed(0)}k` : 'Not found');

    if (year1Data && year2Data) {
      const growthPercentage = year2Data.totalRevenue > 0 
        ? ((year1Data.totalRevenue - year2Data.totalRevenue) / year2Data.totalRevenue * 100)
        : 0;
      console.log(`📈 增長率: ${growthPercentage.toFixed(1)}%`);
    }

    // 列出所有年份
    const allYears = await TotalRevenue.find({}).select('year totalRevenue isProjection').lean();
    console.log('📅 所有年份數據:');
    allYears.forEach(data => {
      console.log(`  ${data.year}: $${(data.totalRevenue / 1000).toFixed(0)}k (${data.isProjection ? '預測' : '實際'})`);
    });
    
  } catch (error) {
    console.error('❌ 測試失敗:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 已斷開 MongoDB Atlas 連接');
  }
}

if (require.main === module) {
  testMongoDBAtlas();
}
