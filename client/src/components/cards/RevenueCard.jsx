import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RevenueCard.css";

export default function RevenueCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:54112';
        const res = await axios.get('/api/dashboard?card=revenue');
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        setError(error.message);
        
        // 在生產環境中，如果 API 失敗，使用備用數據
        if (process.env.NODE_ENV === 'production') {
          setData({
            title: "Revenue",
            totalRevenue: 425000,
            weeklyData: [
              { day: "M", revenue: 45000, isHighlighted: false },
              { day: "T", revenue: 62000, isHighlighted: false },
              { day: "W", revenue: 58000, isHighlighted: false },
              { day: "T", revenue: 41000, isHighlighted: false },
              { day: "F", revenue: 89000, isHighlighted: true },
              { day: "S", revenue: 38000, isHighlighted: false },
              { day: "S", revenue: 52000, isHighlighted: false }
            ],
            currency: "USD"
          });
          setError('');
        } else {
          setData({});
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="card crm-revenue-card">
        <div>Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card crm-revenue-card">
        <div style={{ color: 'red' }}>錯誤: {error}</div>
      </section>
    );
  }

  const title = data.title || "Revenue";
  const totalRevenue = data.totalRevenue || 425000;
  const weeklyData = data.weeklyData || [
    { day: "M", revenue: 45000, isHighlighted: false },
    { day: "T", revenue: 62000, isHighlighted: false },
    { day: "W", revenue: 58000, isHighlighted: false },
    { day: "T", revenue: 41000, isHighlighted: false },
    { day: "F", revenue: 89000, isHighlighted: true },
    { day: "S", revenue: 38000, isHighlighted: false },
    { day: "S", revenue: 52000, isHighlighted: false }
  ];

  // 格式化數值
  const formatValue = (value) => {
    if (value >= 1000) {
      return `${Math.round(value / 1000)}k`;
    }
    return value.toString();
  };

  // 計算最大收入值用於條形圖比例
  const maxRevenue = Math.max(...weeklyData.map(item => item.revenue));

  return (
    <section className="card crm-revenue-card">
      <div className="crm-revenue-card__content">
        <div className="crm-revenue-card__header">
          <h3 className="crm-revenue-card__title">{title}</h3>
          <div className="menu-dots" aria-label="More actions">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <div className="crm-revenue-card__value">
          {formatValue(totalRevenue)}
        </div>
        
        <div className="crm-revenue-card__chart">
          <div className="crm-revenue-card__weekly-chart">
            {weeklyData.map((item, index) => {
              const height = (item.revenue / maxRevenue) * 100;
              return (
                <div key={index} className="crm-revenue-card__chart-column">
                  <div 
                    className={`crm-revenue-card__chart-bar ${item.isHighlighted ? 'highlighted' : ''}`}
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              );
            })}
          </div>
          
          <div className="crm-revenue-card__chart-labels">
            {weeklyData.map((item, index) => (
              <div key={index} className="crm-revenue-card__chart-label">
                {item.day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
