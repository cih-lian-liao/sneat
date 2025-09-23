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
    title: { type: String, default: 'Total Revenue' },
    selectedYear: { type: String, default: '2025' },
    chartData: {
      months: [{ type: String, required: true }],
      data2025: [{ type: Number }],
      data2024: [{ type: Number, required: true }],
      data2023: [{ type: Number, required: true }]
    },
    growthMetrics: {
      growthPercentage: { type: Number, required: true },
      companyGrowth: { type: Number, required: true }
    },
    revenueCards: [{
      year: { type: String, required: true },
      amount: { type: Number, required: true },
      icon: { type: String, required: true },
      color: { type: String, required: true }
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
  },
  overviewActivity: {
    title: { type: String, default: 'Overview & Sales Activity' },
    subtitle: { type: String, default: 'Check out each column for more details' },
    months: [{ type: String, required: true }],
    primary: [{ type: Number, required: true }],
    secondary: [{ type: Number, required: true }]
  },
  sessions: {
    title: { type: String, default: 'Sessions' },
    total: { type: Number, default: 2845 },
    chartData: [{ value: { type: Number, required: true } }]
  },
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
  ,
  customerRatings: {
    title: { type: String, default: 'Customer Ratings' },
    rating: { type: Number, default: 4.0 },
    changePoints: { type: Number, default: 5.0 },
    chartData: {
      months: [{ type: String, required: true }],
      current: [{ type: Number, required: true }],
      previous: [{ type: Number, required: true }]
    }
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
        title: 'Total Revenue',
        selectedYear: '2025',
        chartData: {
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          data2025: [20, 12, 22, 30, 19, 14, 18],
          data2024: [17, 5, 14, 28, 17, 10, 8],
          data2023: [12, 18, 10, 14, 3, 17, 15]
        },
        growthMetrics: {
          growthPercentage: 78,
          companyGrowth: 62
        },
        revenueCards: [
          {
            year: '2025',
            amount: 32500,
            icon: '$',
            color: '#8b5cf6'
          },
          {
            year: '2024',
            amount: 41200,
            icon: '📊',
            color: '#06b6d4'
          }
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
      overviewActivity: {
        title: 'Overview & Sales Activity',
        subtitle: 'Check out each column for more details',
        months: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
        primary: [92, 78, 85, 88, 72, 98, 83],
        secondary: [35, 28, 42, 48, 33, 52, 41]
      },
      sessions: {
        title: 'Sessions',
        total: 2845,
        chartData: [
          { value: 40 },{ value: 36 },{ value: 30 },{ value: 30 },{ value: 24 },
          { value: 28 },{ value: 42 },{ value: 60 },{ value: 58 },{ value: 62 },
          { value: 55 },{ value: 85 }
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
      ,
      customerRatings: {
        title: 'Customer Ratings',
        rating: 4.0,
        changePoints: 5.0,
        chartData: {
          months: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
          current: [2.2, 1.8, 4.1, 3.2, 3.4, 2.1, 4.5],
          previous: [1.6, 2.4, 2.2, 1.9, 1.7, 1.5, 2.0]
        }
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
