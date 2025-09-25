import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EcomSalesStatCard.css";

export default function EcomSalesStatCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard?card=analyticsSalesStats');
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setError(error.message);
        setData({ totalSales: 125000, changePct: 8.2, changeType: 'increase' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="card card--sales ecom-sales-stat">
        <div>載入中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--sales ecom-sales-stat">
        <div style={{ color: 'red' }}>錯誤: {error}</div>
      </section>
    );
  }

  const title = "Sales";
  const amount = data.totalSales || 0;
  const changePct = data.changePct || 0;
  const isUp = data.changeType === 'increase';

  return (
    <section className="card card--sales ecom-sales-stat">
      <div className="ecom-sales-stat__row">
        <img
          className="ecom-sales-stat__icon"
          src="https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png"
          alt="wallet"
          width="40"
          height="40"
        />
        <div className="menu-dots" aria-label="More actions">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="ecom-sales-stat__title">{title}</div>
      <div className="ecom-sales-stat__value">${amount.toLocaleString()}</div>

      <div className={`ecom-sales-stat__delta ${isUp ? "is-up" : "is-down"}`}>
        <span className="ecom-sales-stat__arrow">{isUp ? "↑" : "↓"}</span>
        <span>{Math.abs(changePct)}%</span>
      </div>
    </section>
  );
}


