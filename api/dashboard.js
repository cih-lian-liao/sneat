export const config = { runtime: 'nodejs' };

const mongoose = require('mongoose');

// 統一的數據模型定義
const DashboardDataSchema = new mongoose.Schema({
  // Order Statistics
  orderStatistics: {
    totalSales: { type: Number, default: 42820 },
    totalOrders: { type: Number, default: 8258 },
    weeklyPercent: { type: Number, default: 38 },
    categories: [{
      name: { type: String, required: true },
      description: { type: String, required: true },
      value: { type: Number, required: true },
      icon: { type: String, required: true }
    }]
  },
  
  // Payments
  payments: {
    totalAmount: { type: Number, default: 0 },
    changePct: { type: Number, default: 0 },
    changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
    breakdown: [{
      method: { type: String, required: true },
      amount: { type: Number, required: true },
      color: { type: String },
      order: { type: Number, default: 0 }
    }]
  },
  
  // Revenue
  revenue: {
    title: { type: String, default: 'Revenue' },
    totalRevenue: { type: Number, default: 0 },
    weeklyData: [{
      day: { type: String, required: true },
      revenue: { type: Number, required: true },
      isHighlighted: { type: Boolean, default: false }
    }]
  },
  
  // Sales Statistics
  salesStats: {
    totalSales: { type: Number, default: 0 },
    changePct: { type: Number, default: 0 },
    changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
    chartData: [{
      month: { type: String, required: true },
      sales: { type: Number, required: true }
    }]
  },
  
  // Profit Report
  profitReport: {
    totalProfit: { type: Number, default: 0 },
    changePct: { type: Number, default: 0 },
    changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
    breakdown: [{
      category: { type: String, required: true },
      amount: { type: Number, required: true },
      percentage: { type: Number, required: true }
    }]
  },
  
  // Total Revenue
  totalRevenue: {
    total: { type: Number, default: 0 },
    changePct: { type: Number, default: 0 },
    changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
    chartData: [{
      period: { type: String, required: true },
      revenue: { type: Number, required: true }
    }]
  },
  
  // Order Chart
  orderChart: {
    totalOrders: { type: Number, default: 0 },
    changePct: { type: Number, default: 0 },
    changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
    chartData: [{
      period: { type: String, required: true },
      orders: { type: Number, required: true }
    }]
  },
  
}, { 
  timestamps: true, 
  collection: 'dashboard' 
});

let DashboardData;
try { 
  DashboardData = mongoose.model('DashboardData'); 
} catch { 
  DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard'); 
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
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
    
    const { card } = req.query;
    
    // 如果指定了特定卡片，只返回該卡片的數據
    if (card) {
      const doc = await DashboardData.findOne({}).lean();
      if (!doc) {
        return res.json(getDefaultData(card));
      }
      
      const cardData = doc[card];
      if (!cardData) {
        return res.status(404).json({ error: `Card '${card}' not found` });
      }
      
      return res.json(cardData);
    }
    
    // 返回所有數據
    const doc = await DashboardData.findOne({}).lean();
    if (!doc) {
      return res.json(getDefaultData());
    }
    
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: '取得 Dashboard 數據失敗: ' + err.message });
  }
}

// 默認數據函數
function getDefaultData(card = null) {
  const defaultData = {
    orderStatistics: {
      totalSales: 42820,
      totalOrders: 8258,
      weeklyPercent: 38,
      categories: [
        { name: 'Electronic', description: 'Mobile, Earbuds, TV', value: 82500, icon: '📱' },
        { name: 'Fashion', description: 'Tshirt, Jeans, Shoes', value: 23800, icon: '👕' },
        { name: 'Decor', description: 'Fine Art, Dining', value: 849, icon: '🏠' },
        { name: 'Sports', description: 'Football, Cricket Kit', value: 99, icon: '⚽' }
      ]
    },
    payments: {
      totalAmount: 24580,
      changePct: 12.5,
      changeType: 'increase',
      breakdown: [
        { method: 'Credit Card', amount: 12300, color: '#3b82f6', order: 1 },
        { method: 'PayPal', amount: 8900, color: '#10b981', order: 2 },
        { method: 'Bank Transfer', amount: 3380, color: '#f59e0b', order: 3 }
      ]
    },
    revenue: {
      title: 'Revenue',
      totalRevenue: 125000,
      weeklyData: [
        { day: 'M', revenue: 15000, isHighlighted: false },
        { day: 'T', revenue: 18000, isHighlighted: false },
        { day: 'W', revenue: 22000, isHighlighted: true },
        { day: 'T', revenue: 19000, isHighlighted: false },
        { day: 'F', revenue: 25000, isHighlighted: false },
        { day: 'S', revenue: 16000, isHighlighted: false },
        { day: 'S', revenue: 12000, isHighlighted: false }
      ]
    },
    salesStats: {
      totalSales: 125000,
      changePct: 8.2,
      changeType: 'increase',
      chartData: [
        { month: 'Jan', sales: 120000 },
        { month: 'Feb', sales: 135000 },
        { month: 'Mar', sales: 125000 },
        { month: 'Apr', sales: 140000 },
        { month: 'May', sales: 130000 },
        { month: 'Jun', sales: 145000 }
      ]
    },
    profitReport: {
      totalProfit: 45000,
      changePct: 15.3,
      changeType: 'increase',
      breakdown: [
        { category: 'Product Sales', amount: 35000, percentage: 77.8 },
        { category: 'Services', amount: 8000, percentage: 17.8 },
        { category: 'Other', amount: 2000, percentage: 4.4 }
      ]
    },
    totalRevenue: {
      total: 125000,
      changePct: 8.2,
      changeType: 'increase',
      chartData: [
        { period: 'Q1', revenue: 380000 },
        { period: 'Q2', revenue: 420000 },
        { period: 'Q3', revenue: 450000 },
        { period: 'Q4', revenue: 480000 }
      ]
    },
    orderChart: {
      totalOrders: 1250,
      changePct: 12.5,
      changeType: 'increase',
      chartData: [
        { period: 'Week 1', orders: 300 },
        { period: 'Week 2', orders: 350 },
        { period: 'Week 3', orders: 400 },
        { period: 'Week 4', orders: 200 }
      ]
    },
  };
  
  if (card) {
    return defaultData[card] || { error: `Card '${card}' not found` };
  }
  
  return defaultData;
}
