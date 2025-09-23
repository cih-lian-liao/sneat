const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// 引入新的 Dashboard 模型
const DashboardDataSchema = new mongoose.Schema({
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
  revenue: {
    title: { type: String, default: 'Revenue' },
    totalRevenue: { type: Number, default: 0 },
    weeklyData: [{
      day: { type: String, required: true },
      revenue: { type: Number, required: true },
      isHighlighted: { type: Boolean, default: false }
    }]
  },
  salesStats: {
    totalSales: { type: Number, default: 0 },
    changePct: { type: Number, default: 0 },
    changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
    chartData: [{
      month: { type: String, required: true },
      sales: { type: Number, required: true }
    }]
  },
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
  totalRevenue: {
    total: { type: Number, default: 0 },
    changePct: { type: Number, default: 0 },
    changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
    chartData: [{
      period: { type: String, required: true },
      revenue: { type: Number, required: true }
    }]
  },
  orderChart: {
    totalOrders: { type: Number, default: 0 },
    changePct: { type: Number, default: 0 },
    changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
    chartData: [{
      period: { type: String, required: true },
      orders: { type: Number, required: true }
    }]
  },
  incomeExpense: {
    activeTab: { type: String, enum: ['income', 'expenses', 'profit'], default: 'income' },
    income: {
      total: { type: Number, default: 459100 },
      changePct: { type: Number, default: 42.9 },
      changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
      thisWeek: { type: Number, default: 6500 },
      lastWeekComparison: { type: String, default: '$39k less than last week' },
      chartData: [{
        month: { type: String, required: true },
        value: { type: Number, required: true }
      }]
    },
    expenses: {
      total: { type: Number, default: 285000 },
      changePct: { type: Number, default: 15.2 },
      changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
      thisWeek: { type: Number, default: 4200 },
      lastWeekComparison: { type: String, default: '$12k more than last week' },
      chartData: [{
        month: { type: String, required: true },
        value: { type: Number, required: true }
      }]
    },
    profit: {
      total: { type: Number, default: 174100 },
      changePct: { type: Number, default: 28.5 },
      changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
      thisWeek: { type: Number, default: 2300 },
      lastWeekComparison: { type: String, default: '$27k less than last week' },
      chartData: [{
        month: { type: String, required: true },
        value: { type: Number, required: true }
      }]
    }
  },
  transactions: {
    title: { type: String, default: 'Transactions' },
    items: [{
      id: { type: String, required: true },
      type: { type: String, required: true },
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
      icon: { type: String, required: true },
      iconColor: { type: String, required: true },
      isPositive: { type: Boolean, required: true },
      date: { type: Date, default: Date.now }
    }]
  }
}, { 
  timestamps: true, 
  collection: 'dashboard' 
});

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard');

async function migrateData() {
  try {
    // 連接 MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ 已連接到 MongoDB');
    
    // 清除現有數據
    await DashboardData.deleteMany({});
    console.log('✅ 已清除現有數據');
    
    // 創建統一的數據結構
    const dashboardData = {
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
      incomeExpense: {
        activeTab: 'income',
        income: {
          total: 459100,
          changePct: 42.9,
          changeType: 'increase',
          thisWeek: 6500,
          lastWeekComparison: '$39k less than last week',
          chartData: [
            { month: 'Jan', value: 320000 },
            { month: 'Feb', value: 380000 },
            { month: 'Mar', value: 350000 },
            { month: 'Apr', value: 420000 },
            { month: 'May', value: 390000 },
            { month: 'Jun', value: 450000 },
            { month: 'Jul', value: 459100 }
          ]
        },
        expenses: {
          total: 285000,
          changePct: 15.2,
          changeType: 'increase',
          thisWeek: 4200,
          lastWeekComparison: '$12k more than last week',
          chartData: [
            { month: 'Jan', value: 250000 },
            { month: 'Feb', value: 270000 },
            { month: 'Mar', value: 260000 },
            { month: 'Apr', value: 280000 },
            { month: 'May', value: 275000 },
            { month: 'Jun', value: 290000 },
            { month: 'Jul', value: 285000 }
          ]
        },
        profit: {
          total: 174100,
          changePct: 28.5,
          changeType: 'increase',
          thisWeek: 2300,
          lastWeekComparison: '$27k less than last week',
          chartData: [
            { month: 'Jan', value: 70000 },
            { month: 'Feb', value: 110000 },
            { month: 'Mar', value: 90000 },
            { month: 'Apr', value: 140000 },
            { month: 'May', value: 115000 },
            { month: 'Jun', value: 160000 },
            { month: 'Jul', value: 174100 }
          ]
        }
      },
      transactions: {
        title: 'Transactions',
        items: [
          {
            id: '1',
            type: 'Paypal',
            description: 'Send money',
            amount: 82.6,
            currency: 'USD',
            icon: 'P',
            iconColor: '#ff6b35',
            isPositive: true,
            date: new Date('2024-01-15')
          },
          {
            id: '2',
            type: 'Wallet',
            description: 'Mac\'D',
            amount: 270.69,
            currency: 'USD',
            icon: '💳',
            iconColor: '#8b5cf6',
            isPositive: true,
            date: new Date('2024-01-14')
          },
          {
            id: '3',
            type: 'Transfer',
            description: 'Refund',
            amount: 637.91,
            currency: 'USD',
            icon: '↻',
            iconColor: '#06b6d4',
            isPositive: true,
            date: new Date('2024-01-13')
          },
          {
            id: '4',
            type: 'Credit Card',
            description: 'Ordered Food',
            amount: 838.71,
            currency: 'USD',
            icon: '💳',
            iconColor: '#10b981',
            isPositive: false,
            date: new Date('2024-01-12')
          },
          {
            id: '5',
            type: 'Wallet',
            description: 'Starbucks',
            amount: 203.33,
            currency: 'USD',
            icon: '💳',
            iconColor: '#8b5cf6',
            isPositive: true,
            date: new Date('2024-01-11')
          },
          {
            id: '6',
            type: 'Mastercard',
            description: 'Ordered Food',
            amount: 92.45,
            currency: 'USD',
            icon: '💳',
            iconColor: '#f59e0b',
            isPositive: false,
            date: new Date('2024-01-10')
          }
        ]
      }
    };
    
    // 插入新數據
    const result = await DashboardData.create(dashboardData);
    console.log('✅ 數據遷移完成:', result._id);
    
    // 驗證數據
    const count = await DashboardData.countDocuments();
    console.log('✅ 數據庫中現有記錄數:', count);
    
    // 顯示插入的數據
    const insertedData = await DashboardData.findOne({});
    console.log('✅ 插入的數據結構:', Object.keys(insertedData.toObject()));
    
  } catch (error) {
    console.error('❌ 數據遷移失敗:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ 已斷開 MongoDB 連接');
    process.exit(0);
  }
}

migrateData();
