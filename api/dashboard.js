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
  // Analytics Sales Stats (Analytics page)
  analyticsSalesStats: {
    totalSales: { type: Number, default: 0 },
    changePct: { type: Number, default: 0 },
    changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
    chartData: [{
      month: { type: String, required: true },
      sales: { type: Number, required: true }
    }]
  },
  // New Visitors (Ecommerce page)
  newVisitors: {
    title: { type: String, default: 'New Visitors' },
    periodLabel: { type: String, default: 'Last Week' },
    percent: { type: Number, default: 0 },
    deltaPct: { type: Number, default: 0 },
    deltaDirection: { type: String, enum: ['up', 'down'], default: 'down' },
    weekly: [{
      label: { type: String, required: true },
      value: { type: Number, required: true },
      highlighted: { type: Boolean, default: false }
    }]
  },
  // Activity (Ecommerce page)
  activity: {
    title: { type: String, default: 'Activity' },
    periodLabel: { type: String, default: 'Last Week' },
    percent: { type: Number, default: 0 },
    deltaPct: { type: Number, default: 0 },
    deltaDirection: { type: String, enum: ['up', 'down'], default: 'up' },
    weekly: [{
      label: { type: String, required: true },
      value: { type: Number, required: true }
    }]
  },
  // Ecommerce Profit mini card
  ecomProfit: {
    title: { type: String, default: 'Profit' },
    amount: { type: Number, default: 0 },
    months: [{
      label: { type: String, required: true },
      bars: [{ type: Number, required: true }]
    }]
  },
  // Ecommerce Expenses semi-gauge
  ecomExpenses: {
    title: { type: String, default: 'Expenses' },
    percent: { type: Number, default: 0 },
    note: { type: String, default: '' }
  },
  // Ecommerce Transactions mini card
  ecomTransactions: {
    title: { type: String, default: 'Transactions' },
    amount: { type: Number, default: 0 },
    deltaPct: { type: Number, default: 0 },
    deltaDirection: { type: String, enum: ['up','down'], default: 'up' },
    iconUrl: { type: String, default: '' }
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
  
  // Overview & Sales Activity
  overviewActivity: {
    title: { type: String, default: 'Overview & Sales Activity' },
    subtitle: { type: String, default: 'Check out each column for more details' },
    months: [{ type: String, required: true }],
    primary: [{ type: Number, required: true }], // red bars
    secondary: [{ type: Number, required: true }] // gray bars
  },

  // Sessions (CRM small card)
  sessions: {
    title: { type: String, default: 'Sessions' },
    total: { type: Number, default: 2845 },
    chartData: [{ value: { type: Number, required: true } }]
  },

  // CRM - Orders mini card (avoid naming conflict with Analytics Order)
  crmOrders: {
    title: { type: String, default: 'Order' },
    amount: { type: Number, default: 1286 },
    changePct: { type: Number, default: -13.24 }, // negative for decrease
    icon: { type: String, default: '🧊' }
  },

  // CRM - Generated Leads card
  crmLeads: {
    title: { type: String, default: 'Generated Leads' },
    subtitle: { type: String, default: 'Monthly Report' },
    total: { type: Number, default: 4234 },
    changePct: { type: Number, default: 12.8 },
    gaugePct: { type: Number, default: 25 } // 25% Average
  },

  // CRM - Top Products by Sales
  crmTopSales: {
    title: { type: String, default: 'Top Products by Sales' },
    items: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      brand: { type: String, required: true },
      amount: { type: Number, required: true },
      icon: { type: String, default: '🛒' },
      bg: { type: String, default: '#e5e7eb' }
    }]
  },

  // CRM - Top Products by Volume
  crmTopVolume: {
    title: { type: String, default: 'Top Products by Volume' },
    items: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      brand: { type: String, required: true },
      volume: { type: Number, required: true },
      changePct: { type: Number, required: true },
      icon: { type: String, default: '🛒' },
      bg: { type: String, default: '#e5e7eb' },
      iconColor: { type: String, default: '#6b7280' }
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
    },

    // Customer Ratings (CRM)
    customerRatings: {
      title: { type: String, default: 'Customer Ratings' },
      rating: { type: Number, default: 4.0 },
      changePoints: { type: Number, default: 5.0 }, // +5.0 Points from last month
      chartData: {
        months: [{ type: String, required: true }],
        current: [{ type: Number, required: true }],
        previous: [{ type: Number, required: true }]
      }
    },

    // Earning Report (CRM)
    earningReport: {
      reportTitle: { type: String, default: 'Earning Report' },
      reportSubtitle: { type: String, default: 'Weekly Earnings Overview' },
      metrics: [{
        name: { type: String, required: true },
        secondaryInfo: { type: String, required: true },
        value: { type: Number, required: true },
        changePercentage: { type: Number, required: true },
        changeDirection: { type: String, enum: ['up', 'down'], required: true },
        iconType: { type: String, required: true },
        iconColor: { type: String, required: true }
      }],
      dailyData: [{
        day: { type: String, required: true },
        value: { type: Number, required: true },
        highlighted: { type: Boolean, default: false }
      }]
    },

    // Sales Analytics (CRM)
    salesAnalytics: {
      title: { type: String, default: 'Sales Analytics' },
      selectedYear: { type: String, default: '2025' },
      yearlyData: {
        type: Map,
        of: {
          performanceIndicator: {
            percentage: { type: Number, required: true },
            label: { type: String, required: true }
          },
          heatmapData: {
            yAxisLabels: [{ type: String, required: true }],
            xAxisLabels: [{ type: String, required: true }],
            data: [[{ type: Number, required: true }]]
          }
        }
      }
    },

    // Sales by Countries (CRM)
    salesByCountries: {
      title: { type: String, default: 'Sales by Countries' },
      subtitle: { type: String, default: 'Monthly Sales Overview' },
      countries: [{
        flag: { type: String, required: true },
        countryName: { type: String, required: true },
        salesAmount: { type: String, required: true },
        changePercentage: { type: Number, required: true },
        changeDirection: { type: String, enum: ['up', 'down'], required: true },
        rightValue: { type: String, required: true }
      }]
    },

  // Sales Stats (CRM)
  salesStats: {
    title: { type: String, default: 'Sales Stats' },
    percentage: { type: Number, required: true },
    label: { type: String, required: true },
    iconType: { type: String, default: 'trend-up' },
    iconColor: { type: String, default: '#10b981' },
    legend: [{
      color: { type: String, required: true },
      label: { type: String, required: true }
    }]
  },

  // Analytics Sales Stats (Analytics page)
  analyticsSalesStats: {
    totalSales: { type: Number, default: 0 },
    changePct: { type: Number, default: 0 },
    changeType: { type: String, enum: ['increase', 'decrease'], default: 'increase' },
    chartData: [{
      month: { type: String, required: true },
      sales: { type: Number, required: true }
    }]
  },

    // Team Members
    teamMembers: {
      title: { type: String, default: 'Team Members' },
      members: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        role: { type: String, required: true },
        avatar: { type: String, default: null },
        initials: { type: String, required: true },
        initialsBgColor: { type: String, required: true },
        initialsTextColor: { type: String, required: true },
        project: {
          name: { type: String, required: true },
          color: { type: String, required: true }
        },
        tasksCompleted: { type: Number, required: true },
        tasksTotal: { type: Number, required: true },
        progressColor: { type: String, required: true }
      }]
    },

    // Customer Amount Status
    customerAmountStatus: {
      title: { type: String, default: 'Customer • Amount • Status' },
      customers: [{
        id: { type: Number, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        avatar: { type: String, default: null },
        initials: { type: String, required: true },
        initialsBgColor: { type: String, required: true },
        initialsTextColor: { type: String, required: true },
        amount: { type: Number, required: true },
        status: { type: String, required: true },
        statusColor: { type: String, required: true },
        paidBy: { type: String, required: true }
      }]
    }
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
      const mongoUri = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';
      console.log('Connecting to MongoDB with URI:', mongoUri.replace(/\/\/.*@/, '//***:***@'));
      
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected successfully');
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
        // 若雲端文件尚未建立該卡片欄位，返回預設資料避免 404
        return res.json(getDefaultData(card));
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
    console.error('Dashboard API Error:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      card: req.query.card,
      connectionState: mongoose.connection.readyState
    });
    res.status(500).json({ 
      error: '取得 Dashboard 數據失敗: ' + err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
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
    analyticsSalesStats: {
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
    newVisitors: {
      title: 'New Visitors',
      periodLabel: 'Last Week',
      percent: 23,
      deltaPct: -8.75,
      deltaDirection: 'down',
      weekly: [
        { label: 'Mo', value: 20 },
        { label: 'Tu', value: 48 },
        { label: 'We', value: 42 },
        { label: 'Th', value: 18 },
        { label: 'Fr', value: 30 },
        { label: 'Sa', value: 100, highlighted: true },
        { label: 'Su', value: 46 }
      ]
    },
    activity: {
      title: 'Activity',
      periodLabel: 'Last Week',
      percent: 82,
      deltaPct: 19.6,
      deltaDirection: 'up',
      weekly: [
        { label: 'Mo', value: 20 },
        { label: 'Tu', value: 28 },
        { label: 'We', value: 24 },
        { label: 'Th', value: 70 },
        { label: 'Fr', value: 10 },
        { label: 'Sa', value: 55 },
        { label: 'Su', value: 40 }
      ]
    },
    ecomProfit: {
      title: 'Profit',
      amount: 624000,
      months: [
        { label: 'Jan', bars: [48, 40] },
        { label: 'Apr', bars: [32, 18] },
        { label: 'Jul', bars: [46, 60] },
        { label: 'Oct', bars: [100, 90] }
      ]
    },
    ecomExpenses: {
      title: 'Expenses',
      percent: 72,
      note: '$2k Expenses more than last month'
    },
    ecomTransactions: {
      title: 'Transactions',
      amount: 14854,
      deltaPct: 17.53,
      deltaDirection: 'up',
      iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png'
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
        { value: 40 }, { value: 36 }, { value: 30 }, { value: 30 }, { value: 24 },
        { value: 28 }, { value: 42 }, { value: 60 }, { value: 58 }, { value: 62 },
        { value: 55 }, { value: 85 }
      ]
    },
    crmOrders: {
      title: 'Order',
      amount: 1286,
      changePct: -13.24,
      icon: '🧊'
    },
    crmLeads: {
      title: 'Generated Leads',
      subtitle: 'Monthly Report',
      total: 4234,
      changePct: 12.8,
      gaugePct: 25
    },
    crmTopSales: {
      title: 'Top Products by Sales',
      items: [
        { id: '1', name: 'Oneplus Nord', brand: 'Oneplus', amount: 98348, icon: '📱', bg: '#fee2e2' },
        { id: '2', name: 'Smart Band 4', brand: 'Xiaomi', amount: 15459, icon: '⌚️', bg: '#e9d5ff' },
        { id: '3', name: 'Surface Pro X', brand: 'Microsoft', amount: 4589, icon: '💻', bg: '#cffafe' },
        { id: '4', name: 'iPhone 13', brand: 'Apple', amount: 84345, icon: '📱', bg: '#dcfce7' },
        { id: '5', name: 'Bluetooth Earphone', brand: 'Beats', amount: 103748, icon: '🎧', bg: '#e5e7eb' }
      ]
    },
    crmTopVolume: {
      title: 'Top Products by Volume',
      items: [
        { id: '1', name: 'ENVY Laptop', brand: 'HP', volume: 12.4, changePct: 12.4, icon: '💻', bg: '#f3f4f6', iconColor: '#6b7280' },
        { id: '2', name: 'Apple iMac Pro', brand: 'iMac Pro', volume: 74.9, changePct: -8.5, icon: '🖥️', bg: '#fef3c7', iconColor: '#d97706' },
        { id: '3', name: 'Smart Watch', brand: 'Fitbit', volume: 4.4, changePct: 17.6, icon: '⌚️', bg: '#fecaca', iconColor: '#dc2626' },
        { id: '4', name: 'Oneplus Nord', brand: 'Oneplus', volume: 12.34, changePct: 13.9, icon: '📱', bg: '#dcfce7', iconColor: '#16a34a' },
        { id: '5', name: 'Pixel 4a', brand: 'Google', volume: 8.65, changePct: -11.8, icon: '📱', bg: '#e9d5ff', iconColor: '#7c3aed' }
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
    },
    customerRatings: {
      title: 'Customer Ratings',
      rating: 4.0,
      changePoints: 5.0,
      chartData: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        current: [2.2, 1.8, 4.1, 3.2, 3.4, 2.1, 4.5],
        previous: [1.6, 2.4, 2.2, 1.9, 1.7, 1.5, 2.0]
      }
    },
    earningReport: {
      reportTitle: 'Earning Report',
      reportSubtitle: 'Weekly Earnings Overview',
      metrics: [
        {
          name: 'Net Profit',
          secondaryInfo: '12.4k Sales',
          value: 1619,
          changePercentage: 18.6,
          changeDirection: 'up',
          iconType: 'trend-up',
          iconColor: 'purple'
        },
        {
          name: 'Total Income',
          secondaryInfo: 'Sales, Affiliation',
          value: 3571,
          changePercentage: 39.6,
          changeDirection: 'up',
          iconType: 'dollar-sign',
          iconColor: 'green'
        },
        {
          name: 'Total Expenses',
          secondaryInfo: 'ADVT, Marketing',
          value: 430,
          changePercentage: 52.8,
          changeDirection: 'up',
          iconType: 'credit-card',
          iconColor: 'gray'
        }
      ],
      dailyData: [
        { day: 'Mo', value: 1200, highlighted: false },
        { day: 'Tu', value: 1800, highlighted: false },
        { day: 'We', value: 2200, highlighted: false },
        { day: 'Th', value: 1900, highlighted: false },
        { day: 'Fr', value: 2800, highlighted: true },
        { day: 'Sa', value: 1600, highlighted: false },
        { day: 'Su', value: 1400, highlighted: false }
      ]
    },
    salesAnalytics: {
      title: 'Sales Analytics',
      selectedYear: '2025',
      yearlyData: {
        '2025': {
          performanceIndicator: { percentage: 42.6, label: 'Than last year' },
          heatmapData: {
            yAxisLabels: ['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k'],
            xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            data: [
              [0, 0, 0, 0, 0, 0, 0, 0], // 1k
              [0, 1, 0, 0, 0, 0, 0, 0], // 2k
              [0, 0, 1, 0, 0, 0, 0, 0], // 3k
              [0, 0, 0, 0, 0, 0, 0, 0], // 4k
              [0, 0, 0, 1, 1, 0, 0, 0], // 5k
              [0, 0, 0, 0, 0, 1, 0, 0], // 6k
              [0, 0, 0, 0, 0, 0, 1, 1], // 7k
              [0, 0, 0, 0, 0, 0, 0, 0]  // 8k
            ]
          }
        },
        '2024': {
          performanceIndicator: { percentage: 28.3, label: 'Than last year' },
          heatmapData: {
            yAxisLabels: ['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k'],
            xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            data: [
              [1, 0, 0, 0, 0, 0, 0, 0], // 1k
              [0, 0, 0, 0, 0, 0, 0, 0], // 2k
              [0, 1, 0, 0, 0, 0, 0, 0], // 3k
              [0, 0, 1, 0, 0, 0, 0, 0], // 4k
              [0, 0, 0, 0, 0, 0, 0, 0], // 5k
              [0, 0, 0, 1, 0, 0, 0, 0], // 6k
              [0, 0, 0, 0, 1, 0, 0, 0], // 7k
              [0, 0, 0, 0, 0, 1, 0, 0]  // 8k
            ]
          }
        },
        '2023': {
          performanceIndicator: { percentage: 15.7, label: 'Than last year' },
          heatmapData: {
            yAxisLabels: ['1k', '2k', '3k', '4k', '5k', '6k', '7k', '8k'],
            xAxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            data: [
              [0, 0, 0, 0, 0, 0, 0, 0], // 1k
              [0, 0, 0, 0, 0, 0, 0, 0], // 2k
              [0, 0, 0, 0, 0, 0, 0, 0], // 3k
              [0, 0, 0, 0, 0, 0, 0, 0], // 4k
              [0, 0, 0, 0, 0, 0, 0, 0], // 5k
              [0, 0, 0, 0, 0, 0, 0, 0], // 6k
              [0, 0, 0, 0, 0, 0, 0, 0], // 7k
              [0, 0, 0, 0, 0, 0, 0, 0]  // 8k
            ]
          }
        }
      }
    },
    salesByCountries: {
      title: 'Sales by Countries',
      subtitle: 'Monthly Sales Overview',
      countries: [
        {
          flag: '🇺🇸',
          countryName: 'United states of america',
          salesAmount: '$8,656k',
          changePercentage: 25.8,
          changeDirection: 'up',
          rightValue: '894k'
        },
        {
          flag: '🇧🇷',
          countryName: 'Brazil',
          salesAmount: '$2,415k',
          changePercentage: -6.2,
          changeDirection: 'down',
          rightValue: '645k'
        },
        {
          flag: '🇮🇳',
          countryName: 'India',
          salesAmount: '$865k',
          changePercentage: 12.4,
          changeDirection: 'up',
          rightValue: '148k'
        },
        {
          flag: '🇦🇺',
          countryName: 'Australia',
          salesAmount: '$745k',
          changePercentage: -11.9,
          changeDirection: 'down',
          rightValue: '86k'
        },
        {
          flag: '🇧🇪',
          countryName: 'Belgium',
          salesAmount: '$45k',
          changePercentage: 16.2,
          changeDirection: 'up',
          rightValue: '42k'
        },
        {
          flag: '🇨🇳',
          countryName: 'China',
          salesAmount: '$12k',
          changePercentage: 14.8,
          changeDirection: 'up',
          rightValue: '8k'
        }
      ]
    },
    salesStats: {
      title: 'Sales Stats',
      percentage: 75,
      label: 'Sales',
      iconType: 'trend-up',
      iconColor: '#10b981',
      legend: [
        {
          color: '#10b981',
          label: 'Conversion Ratio'
        },
        {
          color: '#e5e7eb',
          label: 'Total requirements'
        }
      ]
    },
    teamMembers: {
      title: 'Team Members',
      members: [
        {
          id: 1,
          name: 'Nathan Wagner',
          role: 'iOS Developer',
          avatar: null,
          initials: 'NW',
          initialsBgColor: '#e0e7ff',
          initialsTextColor: '#4f46e5',
          project: {
            name: 'ZIPCAR',
            color: 'purple'
          },
          tasksCompleted: 87,
          tasksTotal: 135,
          progressColor: '#6366f1'
        },
        {
          id: 2,
          name: 'Emma Bowen',
          role: 'Product Designer',
          avatar: null,
          initials: 'EB',
          initialsBgColor: '#fee2e2',
          initialsTextColor: '#ef4444',
          project: {
            name: 'BITBANK',
            color: 'red'
          },
          tasksCompleted: 340,
          tasksTotal: 420,
          progressColor: '#ef4444'
        },
        {
          id: 3,
          name: 'Adrian McGuire',
          role: 'Frontend Developer',
          avatar: null,
          initials: 'AM',
          initialsBgColor: '#fde68a',
          initialsTextColor: '#92400e',
          project: {
            name: 'PAYERS',
            color: 'orange'
          },
          tasksCompleted: 50,
          tasksTotal: 82,
          progressColor: '#f97316'
        },
        {
          id: 4,
          name: 'Alma Gonzalez',
          role: 'Backend Developer',
          avatar: null,
          initials: 'AG',
          initialsBgColor: '#e0f2fe',
          initialsTextColor: '#0ea5e9',
          project: {
            name: 'BRANDI',
            color: 'blue'
          },
          tasksCompleted: 98,
          tasksTotal: 260,
          progressColor: '#0ea5e9'
        },
        {
          id: 5,
          name: 'Travis Collins',
          role: 'DevOps Engineer',
          avatar: null,
          initials: 'TC',
          initialsBgColor: '#e5e7eb',
          initialsTextColor: '#6b7280',
          project: {
            name: 'AVIATO',
            color: 'gray'
          },
          tasksCompleted: 12,
          tasksTotal: 25,
          progressColor: '#6b7280'
        }
      ]
    },
    customerAmountStatus: {
      title: 'Customer • Amount • Status',
      customers: [
        {
          id: 1,
          name: 'Henry Barnes',
          email: 'jok@puc.co.uk',
          avatar: null,
          initials: 'HB',
          initialsBgColor: '#e0e7ff',
          initialsTextColor: '#4f46e5',
          amount: 459.65,
          status: 'PAID',
          statusColor: 'green',
          paidBy: 'mastercard',
        },
        {
          id: 2,
          name: 'Herman Holland',
          email: 'sami@lelo.com',
          avatar: null,
          initials: 'HH',
          initialsBgColor: '#fee2e2',
          initialsTextColor: '#ef4444',
          amount: 93.81,
          status: 'PENDING',
          statusColor: 'orange',
          paidBy: 'visa',
        },
        {
          id: 3,
          name: 'Hallie Warner',
          email: 'initus@odemi.com',
          avatar: null,
          initials: 'HW',
          initialsBgColor: '#fef3c7',
          initialsTextColor: '#d97706',
          amount: 934.34,
          status: 'PENDING',
          statusColor: 'orange',
          paidBy: 'visa',
        },
        {
          id: 4,
          name: 'John Davidson',
          email: 'tum@upkesja.gov',
          avatar: null,
          initials: 'JD',
          initialsBgColor: '#e0f2fe',
          initialsTextColor: '#0ea5e9',
          amount: 794.97,
          status: 'PAID',
          statusColor: 'green',
          paidBy: 'paypal',
        },
        {
          id: 5,
          name: 'Cora Schmidt',
          email: 'wipare@tin.com',
          avatar: null,
          initials: 'CS',
          initialsBgColor: '#e5e7eb',
          initialsTextColor: '#6b7280',
          amount: 19.49,
          status: 'PAID',
          statusColor: 'green',
          paidBy: 'mastercard',
        },
        {
          id: 6,
          name: 'Betty Ross',
          email: 'nur@kaomor.edu',
          avatar: null,
          initials: 'BR',
          initialsBgColor: '#fce7f3',
          initialsTextColor: '#be185d',
          amount: 636.27,
          status: 'FAILED',
          statusColor: 'red',
          paidBy: 'paypal',
        }
      ]
    }
  };
  
  if (card) {
    return defaultData[card] || { error: `Card '${card}' not found` };
  }
  
  return defaultData;
}
