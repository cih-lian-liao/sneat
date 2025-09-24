const mongoose = require('mongoose');

// MongoDB Atlas 連接字符串
const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';

// DashboardData Schema
const dashboardSchema = new mongoose.Schema({
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
}, { 
  timestamps: true, 
  collection: 'dashboard' 
});

const DashboardData = mongoose.model('DashboardData', dashboardSchema);

// Customer Amount Status 數據
const customerAmountStatusData = {
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
};

async function updateCustomerAmountStatus() {
  try {
    // 連接到 MongoDB Atlas
    await mongoose.connect(MONGODB_URI);
    console.log('✅ 已連接到 MongoDB Atlas');

    // 查找現有的 dashboard 文檔
    let dashboard = await DashboardData.findOne();
    
    if (!dashboard) {
      // 如果沒有現有文檔，創建一個新的
      dashboard = new DashboardData();
      console.log('📄 創建新的 dashboard 文檔');
    } else {
      console.log('📄 找到現有的 dashboard 文檔');
    }

    // 更新 customerAmountStatus 數據
    dashboard.customerAmountStatus = customerAmountStatusData;
    
    // 保存到數據庫
    await dashboard.save();
    console.log('✅ Customer Amount Status 數據已成功更新到 MongoDB Atlas');
    
    // 驗證數據
    const updatedDashboard = await DashboardData.findOne();
    console.log('📊 更新後的 Customer Amount Status 數據:');
    console.log(`- 標題: ${updatedDashboard.customerAmountStatus.title}`);
    console.log(`- 客戶數量: ${updatedDashboard.customerAmountStatus.customers.length}`);
    console.log(`- 客戶列表:`);
    updatedDashboard.customerAmountStatus.customers.forEach(customer => {
      console.log(`  - ${customer.name} (${customer.email}) - $${customer.amount} - ${customer.status}`);
    });

  } catch (error) {
    console.error('❌ 更新 Customer Amount Status 數據時發生錯誤:', error);
  } finally {
    // 關閉數據庫連接
    await mongoose.disconnect();
    console.log('🔌 已斷開 MongoDB Atlas 連接');
  }
}

// 執行更新
updateCustomerAmountStatus();
