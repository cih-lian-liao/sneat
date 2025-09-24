const mongoose = require('mongoose');

// MongoDB 連接
const MONGO_URI = 'mongodb+srv://cihlian:pJsXwiTzqaK4t3A3@sneat.uh4w06f.mongodb.net/mydatas';

// Schema 定義
const DashboardDataSchema = new mongoose.Schema({
  ecomProductTable: {
    title: { type: String, default: 'Product / Category / Payment / Order Status' },
    products: [{
      id: { type: Number, required: true },
      name: { type: String, required: true },
      brand: { type: String, required: true },
      image: { type: String, required: true },
      category: {
        name: { type: String, required: true },
        icon: { type: String, required: true },
        color: { type: String, required: true }
      },
      payment: {
        paid: { type: Number, required: true },
        total: { type: Number, required: true },
        status: { type: String, required: true }
      },
      orderStatus: {
        status: { type: String, required: true },
        color: { type: String, required: true },
        bgColor: { type: String, required: true }
      }
    }]
  }
}, { collection: 'dashboard' });

let DashboardData;
try { 
  DashboardData = mongoose.model('DashboardData'); 
} catch { 
  DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'dashboard'); 
}

// 更新數據
async function updateEcomProductTableData() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');

    const ecomProductTableData = {
      title: 'Product / Category / Payment / Order Status',
      products: [
        {
          id: 1,
          name: 'OnePlus 7Pro',
          brand: 'OnePlus',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=60&h=60&fit=crop',
          category: {
            name: 'Smart Phone',
            icon: '📱',
            color: '#8b5cf6'
          },
          payment: {
            paid: 120,
            total: 499,
            status: 'Partially Paid'
          },
          orderStatus: {
            status: 'CONFIRMED',
            color: '#8b5cf6',
            bgColor: '#f3f0ff'
          }
        },
        {
          id: 2,
          name: 'Magic Mouse',
          brand: 'Apple',
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=60&h=60&fit=crop',
          category: {
            name: 'Mouse',
            icon: '🖱️',
            color: '#f59e0b'
          },
          payment: {
            paid: 149,
            total: 149,
            status: 'Fully Paid'
          },
          orderStatus: {
            status: 'COMPLETED',
            color: '#10b981',
            bgColor: '#ecfdf5'
          }
        },
        {
          id: 3,
          name: 'iMac Pro',
          brand: 'Apple',
          image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=60&h=60&fit=crop',
          category: {
            name: 'Computer',
            icon: '💻',
            color: '#06b6d4'
          },
          payment: {
            paid: 0,
            total: 2599,
            status: 'Unpaid'
          },
          orderStatus: {
            status: 'CANCELLED',
            color: '#ef4444',
            bgColor: '#fef2f2'
          }
        },
        {
          id: 4,
          name: 'Note 10',
          brand: 'Samsung',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=60&h=60&fit=crop',
          category: {
            name: 'Smart Phone',
            icon: '📱',
            color: '#8b5cf6'
          },
          payment: {
            paid: 899,
            total: 899,
            status: 'Fully Paid'
          },
          orderStatus: {
            status: 'COMPLETED',
            color: '#10b981',
            bgColor: '#ecfdf5'
          }
        },
        {
          id: 5,
          name: 'iPhone 11 Pro',
          brand: 'Apple',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=60&h=60&fit=crop',
          category: {
            name: 'Smart Phone',
            icon: '📱',
            color: '#8b5cf6'
          },
          payment: {
            paid: 0,
            total: 999,
            status: 'Unpaid'
          },
          orderStatus: {
            status: 'CANCELLED',
            color: '#ef4444',
            bgColor: '#fef2f2'
          }
        },
        {
          id: 6,
          name: 'Mi Led TV 4X',
          brand: 'Xiaomi',
          image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=60&h=60&fit=crop',
          category: {
            name: 'Smart TV',
            icon: '📺',
            color: '#ef4444'
          },
          payment: {
            paid: 299,
            total: 599,
            status: 'Partially Paid'
          },
          orderStatus: {
            status: 'CONFIRMED',
            color: '#8b5cf6',
            bgColor: '#f3f0ff'
          }
        }
      ]
    };

    // 更新或創建文檔
    const result = await DashboardData.findOneAndUpdate(
      {},
      { $set: { ecomProductTable: ecomProductTableData } },
      { upsert: true, new: true }
    );

    console.log('Ecommerce Product Table data updated successfully:', result.ecomProductTable);
  } catch (error) {
    console.error('Error updating Ecommerce Product Table data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

// 執行更新
updateEcomProductTableData();
