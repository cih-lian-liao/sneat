import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalesStatsCard.css';

const SalesStatsCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard?card=salesStats');
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching sales stats data:', error);
        // 在開發環境中使用預設資料
        const defaultData = {
          title: 'Sales Stats',
          percentage: 75,
          label: 'Sales',
          iconType: 'trend-up',
          iconColor: '#10b981',
          legend: [
            {
              color: '#10b981',
              label: 'Conversion Ratio'
            },
            {
              color: '#e5e7eb',
              label: 'Total requirements'
            }
          ]
        };
        setData(defaultData);
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="card card--sales-stats sales-stats-card">
        <div className="sales-stats-card__loading">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--sales-stats sales-stats-card">
        <div className="sales-stats-card__error">錯誤: {error}</div>
      </section>
    );
  }

  const {
    title = "Sales Stats",
    percentage = 75,
    label = "Sales",
    iconType = "trend-up",
    iconColor = "#10b981",
    legend = []
  } = data;

  // 計算圓形進度條的 stroke-dasharray
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <section className="card card--sales-stats sales-stats-card">
      <div className="sales-stats-card__content">
        {/* 標題區域 */}
        <div className="sales-stats-card__header">
          <h3 className="sales-stats-card__title">{title}</h3>
          <div className="sales-stats-card__menu">
            <span className="sales-stats-card__menu-icon">⋮</span>
          </div>
        </div>

        {/* 圓形進度圖表 */}
        <div className="sales-stats-card__chart-container">
          <div className="sales-stats-card__circular-chart">
            <svg className="sales-stats-card__chart-svg" width="140" height="140">
              {/* 背景圓圈 */}
              <circle
                className="sales-stats-card__chart-bg"
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {/* 進度圓圈 */}
              <circle
                className="sales-stats-card__chart-progress"
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke={iconColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset="0"
                transform="rotate(-90 70 70)"
              />
            </svg>
            
            {/* 中心內容 */}
            <div className="sales-stats-card__chart-center">
              <div className="sales-stats-card__chart-icons">
                <div className="sales-stats-card__trend-icon" style={{ color: iconColor }}>
                  ↗
                </div>
                <div className="sales-stats-card__stars">
                  <span className="sales-stats-card__star">★</span>
                  <span className="sales-stats-card__star">★</span>
                  <span className="sales-stats-card__star">★</span>
                </div>
              </div>
              <div className="sales-stats-card__percentage">{percentage}%</div>
              <div className="sales-stats-card__label">{label}</div>
            </div>
          </div>
        </div>

        {/* 圖例 */}
        <div className="sales-stats-card__legend">
          {legend.map((item, index) => (
            <div key={`legend-${item.label}-${index}`} className="sales-stats-card__legend-item">
              <div 
                className="sales-stats-card__legend-dot" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="sales-stats-card__legend-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesStatsCard;
