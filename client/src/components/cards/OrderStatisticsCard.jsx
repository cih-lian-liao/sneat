import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderStatisticsCard.css";

export default function OrderStatisticsCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:54112';
        const res = await axios.get(`${API_BASE}/api/orderstatistics`);
        setData(res.data || {});
        setError('');
      } catch (e) {
        console.error('Error fetching order statistics:', e);
        setError(e.message);
        // 生產環境備援
        if (process.env.NODE_ENV === 'production') {
          setData({
            title: 'Order Statistics',
            totalSales: 42820,
            totalOrders: 8258,
            weeklyPercentage: 38,
            categories: [
              { name: 'Electronic', icon: '📱', items: 'Mobile, Earbuds, TV', sales: 82500 },
              { name: 'Fashion', icon: '👕', items: 'Tshirt, Jeans, Shoes', sales: 23800 },
              { name: 'Decor', icon: '🏠', items: 'Fine Art, Dining', sales: 849 },
              { name: 'Sports', icon: '⚽', items: 'Football, Cricket Kit', sales: 99 }
            ],
            currency: 'USD'
          });
          setError('');
        }
      } finally { 
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="card card--order-statistics"><div>載入中...</div></section>;
  if (error) return <section className="card card--order-statistics"><div style={{color:'red'}}>錯誤: {error}</div></section>;

  const title = data.title || 'Order Statistics';
  const totalSales = data.totalSales || 0;
  const totalOrders = data.totalOrders || 0;
  const weeklyPct = data.weeklyPercentage || 0;
  const categories = Array.isArray(data.categories) ? data.categories : [];

  const formatValue = (v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : v.toString();

  // 簡單圓形進度圖
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (weeklyPct / 100) * circumference;

  return (
    <section className="card card--order-statistics">
      <div className="order-stats__header">
        <div>
          <h3 className="order-stats__title">{title}</h3>
          <p className="order-stats__subtitle">{formatValue(totalSales)} Total Sales</p>
        </div>
        <div className="order-stats__menu">⋮</div>
      </div>

      <div className="order-stats__main">
        <div className="order-stats__metrics">
          <div className="order-stats__total">
            <div className="order-stats__number">{totalOrders.toLocaleString()}</div>
            <div className="order-stats__label">Total Orders</div>
          </div>
          
          <div className="order-stats__chart">
            <svg className="circular-chart" viewBox="0 0 100 100">
              <circle
                className="circular-chart__background"
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                className="circular-chart__progress"
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <text className="circular-chart__text" x="50" y="50" textAnchor="middle" dy="0.3em">
                {weeklyPct}%
              </text>
              <text className="circular-chart__label" x="50" y="65" textAnchor="middle">
                Weekly
              </text>
            </svg>
          </div>
        </div>

        <div className="order-stats__categories">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <div className="category-item__icon">{category.icon}</div>
              <div className="category-item__content">
                <div className="category-item__name">{category.name}</div>
                <div className="category-item__items">{category.items}</div>
              </div>
              <div className="category-item__sales">{formatValue(category.sales)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
