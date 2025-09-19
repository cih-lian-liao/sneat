// 直接向 MongoDB Atlas 插入新的 Total Revenue 數據
const mongoose = require('mongoose');

// MongoDB Atlas 連接字符串
const MONGO_URI = "mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas";

// 新的 Total Revenue Schema
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

// 新的種子數據
const newTotalRevenueData = [
  {
    year: 2023,
    totalRevenue: 1085000,
    monthlyRevenue: [
      { month: "Jan", revenue: 85000 },
      { month: "Feb", revenue: 90000 },
      { month: "Mar", revenue: 95000 },
      { month: "Apr", revenue: 100000 },
      { month: "May", revenue: 105000 },
      { month: "Jun", revenue: 110000 },
      { month: "Jul", revenue: 115000 },
      { month: "Aug", revenue: 120000 },
      { month: "Sep", revenue: 125000 },
      { month: "Oct", revenue: 130000 },
      { month: "Nov", revenue: 135000 },
      { month: "Dec", revenue: 140000 }
    ],
    growthRate: 8.5,
    currency: "USD",
    isProjection: false
  },
  {
    year: 2024,
    totalRevenue: 1250000,
    monthlyRevenue: [
      { month: "Jan", revenue: 95000 },
      { month: "Feb", revenue: 110000 },
      { month: "Mar", revenue: 105000 },
      { month: "Apr", revenue: 120000 },
      { month: "May", revenue: 115000 },
      { month: "Jun", revenue: 130000 },
      { month: "Jul", revenue: 125000 },
      { month: "Aug", revenue: 140000 },
      { month: "Sep", revenue: 135000 },
      { month: "Oct", revenue: 150000 },
      { month: "Nov", revenue: 145000 },
      { month: "Dec", revenue: 160000 }
    ],
    growthRate: 15.2,
    currency: "USD",
    isProjection: false
  },
  {
    year: 2025,
    totalRevenue: 1450000,
    monthlyRevenue: [
      { month: "Jan", revenue: 120000 },
      { month: "Feb", revenue: 125000 },
      { month: "Mar", revenue: 130000 },
      { month: "Apr", revenue: 135000 },
      { month: "May", revenue: 140000 },
      { month: "Jun", revenue: 145000 },
      { month: "Jul", revenue: 150000 },
      { month: "Aug", revenue: 155000 },
      { month: "Sep", revenue: 160000 },
      { month: "Oct", revenue: 165000 },
      { month: "Nov", revenue: 170000 },
      { month: "Dec", revenue: 175000 }
    ],
    growthRate: 16.0,
    currency: "USD",
    isProjection: true
  }
];

async function uploadToMongoDBAtlas() {
  try {
    console.log('🔄 開始向 MongoDB Atlas 上傳新的 Total Revenue 數據...');
    
    // 連接到 MongoDB Atlas
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    console.log('✅ 已連線到 MongoDB Atlas');

    // 清空舊數據
    await TotalRevenue.deleteMany({});
    console.log('🗑️ 已清空舊的 TotalRevenue 數據');

    // 插入新數據
    const insertedData = await TotalRevenue.insertMany(newTotalRevenueData);
    console.log(`✅ 已插入 ${insertedData.length} 筆新的 TotalRevenue 數據到 MongoDB Atlas`);

    // 驗證數據
    const count = await TotalRevenue.countDocuments();
    console.log(`📊 MongoDB Atlas 中 TotalRevenue 集合有 ${count} 筆記錄`);

    // 顯示插入的數據摘要
    for (const data of insertedData) {
      console.log(`📈 ${data.year}年: $${(data.totalRevenue / 1000).toFixed(0)}k (${data.isProjection ? '預測' : '實際'})`);
    }

    console.log('🎉 MongoDB Atlas 數據上傳完成！');
    
  } catch (error) {
    console.error('❌ 上傳失敗:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 已斷開 MongoDB Atlas 連接');
  }
}

// 如果直接運行此腳本
if (require.main === module) {
  uploadToMongoDBAtlas();
}

module.exports = { uploadToMongoDBAtlas, newTotalRevenueData };
