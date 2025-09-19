const mongoose = require('mongoose');
require('dotenv').config();
const revenueData = require('./seed/revenue');

// 定義 Revenue 模型
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

const Revenue = mongoose.model('Revenue', RevenueSchema);

async function migrateRevenueData() {
  console.log('🔄 開始遷移 Revenue 數據...');
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ 已連線到 MongoDB');

    // 清空舊的 Revenue 集合
    await Revenue.deleteMany({});
    console.log('🗑️ 已清空舊的 Revenue 數據');

    // 插入新數據
    const insertedData = await Revenue.insertMany(revenueData);
    console.log(`✅ 已插入 ${insertedData.length} 筆 Revenue 數據`);

    // 驗證數據
    const count = await Revenue.countDocuments();
    console.log(`📊 當前 Revenue 集合中有 ${count} 筆記錄`);

    const allData = await Revenue.find({}).lean();
    allData.forEach(item => {
      console.log(`📈 ${item.title}: $${(item.totalRevenue / 1000).toFixed(0)}k`);
      console.log(`   週數據: ${item.weeklyData.map(d => `${d.day}:$${(d.revenue/1000).toFixed(0)}k`).join(', ')}`);
    });

    console.log('🎉 Revenue 數據遷移完成！');
  } catch (error) {
    console.error('❌ 遷移失敗:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 已斷開 MongoDB 連接');
  }
}

migrateRevenueData();
