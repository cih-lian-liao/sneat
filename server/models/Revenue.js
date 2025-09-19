import mongoose from 'mongoose';

// Revenue 模型 - 週收入數據
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

// 索引
RevenueSchema.index({ lastUpdated: -1 });

export default mongoose.model('Revenue', RevenueSchema);
