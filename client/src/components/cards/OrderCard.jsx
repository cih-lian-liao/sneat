import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderCard.css";

export default function OrderCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:54112';
        const res = await axios.get(`${API_BASE}/api/orderchart`);
        setData(res.data || {});
      } catch (error) {
        console.error('Error fetching order data:', error);
        setData({});
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="card card--order-analysis order-card">
        <div>載入中...</div>
      </section>
    );
  }

  const values = data.values || [];
  const currentValue = values[values.length - 1] || 0;
  const previousValue = values[values.length - 2] || 0;
  const changePct = previousValue > 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;
  const isUp = changePct >= 0;

  // 簡單的格式化
  const formatValue = (value) => {
    if (value >= 1000) {
      return `${Math.round(value / 1000)}k`;
    }
    return value.toString();
  };

  return (
    <section className="card card--order-analysis order-card">
      <div className="order-card__content">
        <div className="order-card__header">
          <div className="order-card__title">Order</div>
        </div>
        
        <div className="order-card__value">
          {formatValue(currentValue)}
        </div>
        
        <div className="order-card__chart">
          <div className="simple-chart">
            <div className="chart-bar" style={{ height: '60px', backgroundColor: '#22c55e', borderRadius: '4px' }}></div>
          </div>
        </div>
        
        <div className={`order-card__delta ${isUp ? "is-up" : "is-down"}`}>
          <span className="order-card__arrow">{isUp ? "↑" : "↓"}</span>
          <span>{Math.abs(changePct).toFixed(1)}%</span>
        </div>
      </div>
    </section>
  );
}