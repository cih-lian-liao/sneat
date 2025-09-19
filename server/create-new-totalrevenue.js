// 創建新的 Total Revenue 集合，避免與舊數據衝突
const mongoose = require('mongoose');
const TotalRevenueNew = require('./models/TotalRevenue').default;

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

async function createNewTotalRevenueData() {
  try {
    console.log('🔄 開始創建新的 Total Revenue 數據...');
    
    // 連接到 MongoDB
    const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydatas";
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ 已連線到 MongoDB');

    // 創建新的集合名稱
    const TotalRevenueNewSchema = new mongoose.Schema({
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
      collection: 'totalrevenue_new' // 使用新的集合名稱
    });

    const TotalRevenueNew = mongoose.model('TotalRevenueNew', TotalRevenueNewSchema);

    // 清空新集合
    await TotalRevenueNew.deleteMany({});
    console.log('🗑️ 已清空新的 TotalRevenue 集合');

    // 插入新數據
    const insertedData = await TotalRevenueNew.insertMany(newTotalRevenueData);
    console.log(`✅ 已插入 ${insertedData.length} 筆新的 TotalRevenue 數據`);

    // 驗證數據
    const count = await TotalRevenueNew.countDocuments();
    console.log(`📊 當前 TotalRevenue 新集合中有 ${count} 筆記錄`);

    // 顯示插入的數據摘要
    for (const data of insertedData) {
      console.log(`📈 ${data.year}年: $${(data.totalRevenue / 1000).toFixed(0)}k (${data.isProjection ? '預測' : '實際'})`);
    }

    console.log('🎉 新的 Total Revenue 數據創建完成！');
    console.log('📝 請更新路由以使用 totalrevenue_new 集合');
    
  } catch (error) {
    console.error('❌ 創建失敗:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 已斷開 MongoDB 連接');
  }
}

// 如果直接運行此腳本
if (require.main === module) {
  createNewTotalRevenueData();
}

module.exports = { createNewTotalRevenueData, newTotalRevenueData };
