import mongoose from 'mongoose';

// 重新設計的 Total Revenue 模型
const TotalRevenueSchema = new mongoose.Schema({
  year: { 
    type: Number, 
    required: true,
    unique: true // 每年只有一筆記錄
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
  }, // 是否為預測數據
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true,
  collection: 'totalrevenue' // 明確指定集合名稱
});

// 索引
TotalRevenueSchema.index({ year: -1 }); // 按年份降序排列

export default mongoose.model('TotalRevenue', TotalRevenueSchema);
