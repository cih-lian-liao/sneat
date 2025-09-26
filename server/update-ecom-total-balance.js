const mongoose = require('mongoose');

// MongoDB 連接
const MONGO_URI = 'process.env.MONGO_URI';

// Schema 定義
const DashboardDataSchema = new mongoose.Schema({
  ecomTotalBalance: {
    title: { type: String, default: 'Total Balance' },
    balances: [{
      type: { type: String, required: true },
      amount: { type: Number, required: true },
      unit: { type: String, default: 'k' },
      icon: { type: String, required: true },
      iconBgColor: { type: String, required: true },
      iconColor: { type: String, required: true }
    }],
    chartData: [{
      month: { type: String, required: true },
      value: { type: Number, required: true }
    }],
    notification: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      iconBgColor: { type: String, required: true },
      iconColor: { type: String, required: true }
    }
  }
}, { collection: 'dashboard' });

let DashboardData;
try { 
  DashboardData = mongoose.model('DashboardData'); 
} catch { 
  DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard'); 
}

// 更新數據
async function updateEcomTotalBalanceData() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');

    const ecomTotalBalanceData = {
      title: 'Total Balance',
      balances: [
        {
          type: 'Wallet',
          amount: 2.54,
          unit: 'k',
          icon: '💳',
          iconBgColor: '#FFF7ED',
          iconColor: '#F9A825'
        },
        {
          type: 'Paypal',
          amount: 4.21,
          unit: 'k',
          icon: '$',
          iconBgColor: '#F3F4F6',
          iconColor: '#6B7280'
        }
      ],
      chartData: [
        { month: 'Jan', value: 2.1 },
        { month: 'Feb', value: 2.8 },
        { month: 'Mar', value: 2.3 },
        { month: 'Apr', value: 3.2 },
        { month: 'May', value: 2.9 },
        { month: 'Jun', value: 4.1 }
      ],
      notification: {
        title: 'You have done 57.6% more sales.',
        subtitle: 'Check your new badge in your profile.',
        iconBgColor: '#FFF7ED',
        iconColor: '#F9A825'
      }
    };

    // 更新或創建文檔
    const result = await DashboardData.findOneAndUpdate(
      {},
      { $set: { ecomTotalBalance: ecomTotalBalanceData } },
      { upsert: true, new: true }
    );

    console.log('Ecommerce Total Balance data updated successfully:', result.ecomTotalBalance);
  } catch (error) {
    console.error('Error updating Ecommerce Total Balance data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

// 執行更新
updateEcomTotalBalanceData();
