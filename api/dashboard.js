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
  
  // Income Expense
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
  
  // Transactions
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
  },
  
    // Activity Timeline
    activityTimeline: {
      title: { type: String, default: 'Activity Timeline' },
      activities: [{
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        timestamp: { type: String, required: true },
        dotColor: { type: String, required: true },
        type: { type: String, enum: ['invoice', 'meeting', 'project'], required: true },
        attachments: [{
          type: { type: String, enum: ['file', 'avatar'], required: true },
          name: { type: String, required: true },
          icon: { type: String },
          avatar: { type: String },
          role: { type: String },
          company: { type: String }
        }],
        teamMembers: [{
          name: { type: String, required: true },
          avatar: { type: String, required: true }
        }]
      }]
    },

    // Visit & Sources
    visitResources: {
      title: { type: String, default: 'Visit & Sources' },
      activeTab: { type: String, enum: ['browser', 'operatingSystem', 'country'], default: 'browser' },
      tabs: [{
        id: { type: String, required: true },
        name: { type: String, required: true }
      }],
      browserData: [{
        no: { type: Number, required: true },
        name: { type: String, required: true },
        icon: { type: String, required: true },
        visits: { type: Number, required: true },
        percentage: { type: Number, required: true },
        progressBarColor: { type: String, required: true }
      }],
      operatingSystemData: [{
        no: { type: Number, required: true },
        name: { type: String, required: true },
        icon: { type: String, required: true },
        visits: { type: Number, required: true },
        percentage: { type: Number, required: true },
        progressBarColor: { type: String, required: true }
      }],
      countryData: [{
        no: { type: Number, required: true },
        name: { type: String, required: true },
        flagUrl: { type: String, required: true },
        visits: { type: Number, required: true },
        percentage: { type: Number, required: true },
        progressBarColor: { type: String, required: true }
      }]
    }
  
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
    },
    activityTimeline: {
      title: 'Activity Timeline',
      activities: [
        {
          id: '1',
          title: '12 Invoices have been paid',
          description: 'Invoices have been paid to the company',
          timestamp: '12 min ago',
          dotColor: '#8b5cf6',
          type: 'invoice',
          attachments: [
            {
              type: 'file',
              name: 'Invoices.pdf',
              icon: '📄'
            }
          ]
        },
        {
          id: '2',
          title: 'Client Meeting',
          description: 'Project meeting with john @10:15am',
          timestamp: '45 min ago',
          dotColor: '#f59e0b',
          type: 'meeting',
          attachments: [
            {
              type: 'avatar',
              name: 'Steven Nash (Client)',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
              role: 'CEO of ThemeSelection'
            }
          ]
        },
        {
          id: '3',
          title: 'Create a new project for client',
          description: '5 team members in a project',
          timestamp: '2 days ago',
          dotColor: '#06b6d4',
          type: 'project',
          teamMembers: [
            {
              name: 'John Doe',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
            },
              {
                name: 'Jane Smith',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
              },
            {
              name: 'Mike Johnson',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
            },
              {
                name: 'Sarah Wilson',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face'
              },
            {
              name: 'David Brown',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
            }
          ]
        }
      ]
    },

    visitResources: {
      title: 'Visit & Sources',
      activeTab: 'browser',
      tabs: [
        { id: 'browser', name: 'BROWSER' },
        { id: 'operatingSystem', name: 'OPERATING SYSTEM' },
        { id: 'country', name: 'COUNTRY' }
      ],
      browserData: [
        {
          no: 1,
          name: 'Chrome',
          icon: '🌐',
          visits: 8920,
          percentage: 64.91,
          progressBarColor: '#4CAF50'
        },
        {
          no: 2,
          name: 'Safari',
          icon: '🧭',
          visits: 1290,
          percentage: 19.03,
          progressBarColor: '#2196F3'
        },
        {
          no: 3,
          name: 'Firefox',
          icon: '🦊',
          visits: 328,
          percentage: 3.26,
          progressBarColor: '#03A9F4'
        },
        {
          no: 4,
          name: 'Edge',
          icon: '🌊',
          visits: 142,
          percentage: 3.99,
          progressBarColor: '#FF9800'
        },
        {
          no: 5,
          name: 'Opera',
          icon: '🎭',
          visits: 85,
          percentage: 2.12,
          progressBarColor: '#F44336'
        },
        {
          no: 6,
          name: 'Brave',
          icon: '🦁',
          visits: 36,
          percentage: 1.06,
          progressBarColor: '#0EA5E9'
        }
      ],
      operatingSystemData: [
        {
          no: 1,
          name: 'Windows',
          icon: '🪟',
          visits: 475260,
          percentage: 61.5,
          progressBarColor: '#4CAF50'
        },
        {
          no: 2,
          name: 'Mac',
          icon: '🍎',
          visits: 89120,
          percentage: 15.67,
          progressBarColor: '#8B5CF6'
        },
        {
          no: 3,
          name: 'Ubuntu',
          icon: '🐧',
          visits: 38680,
          percentage: 5.82,
          progressBarColor: '#06B6D4'
        },
        {
          no: 4,
          name: 'Linux',
          icon: '🐧',
          visits: 30270,
          percentage: 5.03,
          progressBarColor: '#F59E0B'
        },
        {
          no: 5,
          name: 'Chrome',
          icon: '🌐',
          visits: 8340,
          percentage: 3.25,
          progressBarColor: '#EF4444'
        },
        {
          no: 6,
          name: 'Cent',
          icon: '🌸',
          visits: 2250,
          percentage: 1.76,
          progressBarColor: '#0EA5E9'
        }
      ],
      countryData: [
        {
          no: 1,
          name: 'USA',
          flagUrl: 'https://flagcdn.com/w40/us.png',
          visits: 87240,
          percentage: 38.12,
          progressBarColor: '#4CAF50'
        },
        {
          no: 2,
          name: 'Brazil',
          flagUrl: 'https://flagcdn.com/w40/br.png',
          visits: 42690,
          percentage: 28.23,
          progressBarColor: '#8B5CF6'
        },
        {
          no: 3,
          name: 'India',
          flagUrl: 'https://flagcdn.com/w40/in.png',
          visits: 12580,
          percentage: 13.82,
          progressBarColor: '#06B6D4'
        },
        {
          no: 4,
          name: 'Australia',
          flagUrl: 'https://flagcdn.com/w40/au.png',
          visits: 4130,
          percentage: 12.72,
          progressBarColor: '#F59E0B'
        },
        {
          no: 5,
          name: 'China',
          flagUrl: 'https://flagcdn.com/w40/cn.png',
          visits: 2210,
          percentage: 7.11,
          progressBarColor: '#EF4444'
        },
        {
          no: 6,
          name: 'France',
          flagUrl: 'https://flagcdn.com/w40/fr.png',
          visits: 1560,
          percentage: 6.59,
          progressBarColor: '#0EA5E9'
        }
      ]
    }
  };
  
  if (card) {
    return defaultData[card] || { error: `Card '${card}' not found` };
  }
  
  return defaultData;
}
