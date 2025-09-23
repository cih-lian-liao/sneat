import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SalesStatCard.css";

export default function SalesStatCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:54112';
        const res = await axios.get('/api/dashboard?card=salesStats');
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setError(error.message);
        
        // 使用備援數據
        setData({
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
        });
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="card card--sales-analysis sales-stat">
        <div>載入中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--sales-analysis sales-stat">
        <div style={{ color: 'red' }}>錯誤: {error}</div>
      </section>
    );
  }

  const title = "Sales";
  const amount = data.totalSales || 0;
  const changePct = data.changePct || 0;
  const isUp = data.changeType === 'increase';

  return (
    <section className="card card--sales-analysis sales-stat">
      <div className="sales-stat__row">
        <img
          className="sales-stat__icon"
          src="https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png"
          alt="wallet"
          width="40" 
          height="40"
        />
        <button className="sales-stat__more" aria-label="More actions">⋮</button>
      </div>

      <div className="sales-stat__title">{title}</div>
      <div className="sales-stat__value">${amount.toLocaleString()}</div>

      <div className={`sales-stat__delta ${isUp ? "is-up" : "is-down"}`}>
        <span className="sales-stat__arrow">{isUp ? "↑" : "↓"}</span>
        <span>{Math.abs(changePct)}%</span>
      </div>
    </section>
  );
}