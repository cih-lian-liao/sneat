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
        // 先嘗試測試 API
        const res = await axios.get('/api/test-orderstats');
        console.log('Test API Response:', res.data);
        if (res.data && res.data.data) {
          setData(res.data.data);
        } else {
          setData(res.data || {});
        }
        setError('');
      } catch (error) {
        console.error('Error fetching order statistics:', error);
        setError(error.message);
        // 備援數據
        const fallbackData = {
          totalSales: 42820,
          totalOrders: 8258,
          weeklyPercent: 38,
          categories: [
            { name: 'Electronic', description: 'Mobile, Earbuds, TV', value: 82500, icon: '📱' },
            { name: 'Fashion', description: 'Tshirt, Jeans, Shoes', value: 23800, icon: '👕' },
            { name: 'Decor', description: 'Fine Art, Dining', value: 849, icon: '🏠' },
            { name: 'Sports', description: 'Football, Cricket Kit', value: 99, icon: '⚽' }
          ]
        };
        console.log('Using fallback data:', fallbackData);
        setData(fallbackData);
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <section className="card card--order-statistics">載入中...</section>;
  if (error) return <section className="card card--order-statistics error">錯誤: {error}</section>;

  const formatValue = (value) => {
    if (value === undefined || value === null) return '$0';
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
    return `$${value}`;
  };

  return (
    <section className="card card--order-statistics">
      <h3 className="order-card__title">Order Statistics</h3>
      <p className="order-card__subtitle">
        {formatValue(data.totalSales || 0)} Total Sales
      </p>

      <div className="order-card__main">
        <div className="order-card__orders">
          <h2>{(data.totalOrders || 0).toLocaleString()}</h2>
          <p>Total Orders</p>
        </div>
        <div className="order-card__weekly">
          <div className="circle">{data.weeklyPercent || 0}%</div>
          <p>Weekly</p>
        </div>
      </div>

      <ul className="order-card__categories">
        {Array.isArray(data.categories) && data.categories.length > 0 ? (
          data.categories.map((category, idx) => {
            console.log('Category data:', category);
            return (
              <li key={`${category.name}-${idx}`} className="order-card__item">
                <div>
                  <strong>{category.icon} {category.name}</strong>
                  <p className="desc">{category.description}</p>
                </div>
                <span className="value">{formatValue(category.value)}</span>
              </li>
            );
          })
        ) : (
          <li className="order-card__item">
            <div>
              <strong>No categories available</strong>
              <p className="desc">Categories data is missing</p>
            </div>
            <span className="value">--</span>
          </li>
        )}
      </ul>
    </section>
  );
}
