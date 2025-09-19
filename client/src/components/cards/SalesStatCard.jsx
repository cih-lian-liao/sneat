import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SalesStatCard.css";

export default function SalesStatCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:54112';
        const res = await axios.get(`${API_BASE}/api/salesstat`);
        setData(res.data || {});
      } catch (error) {
        console.error('Error fetching sales data:', error);
        setData({});
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

  const title = data.title || "Sales";
  const amount = data.amount || 0;
  const changePct = data.changePct || 0;
  const isUp = changePct >= 0;

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