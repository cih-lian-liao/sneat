import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EcomConversionRateCard.css';

const EcomConversionRateCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard?card=ecomConversionRate');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch conversion rate data:', err);
        setError(err.message);
        // 使用預設數據
        setData({
          title: 'Conversion Rate',
          subtitle: 'Compared To Last Month',
          mainRate: 8.72,
          changePercentage: 4.8,
          changeDirection: 'up',
          trendData: [20, 25, 30, 28, 35, 40, 45, 50, 48, 55, 60, 65],
          metrics: [
            {
              name: 'Impressions',
              value: '12.4k Visits',
              changePercentage: 12.8,
              changeDirection: 'up'
            },
            {
              name: 'Added To Cart',
              value: '32 Product in cart',
              changePercentage: -8.3,
              changeDirection: 'down'
            },
            {
              name: 'Checkout',
              value: '21 Product checkout',
              changePercentage: 9.12,
              changeDirection: 'up'
            },
            {
              name: 'Purchased',
              value: '12 Orders',
              changePercentage: 2.24,
              changeDirection: 'up'
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getChangeIcon = (direction) => {
    return direction === 'up' ? '↗' : '↘';
  };

  const getChangeColor = (direction) => {
    return direction === 'up' ? '#10b981' : '#ef4444';
  };

  if (loading) {
    return (
      <section className="card card--conversion-rate ecom-conversion-rate-card">
        <div className="ecom-conversion-rate-card__loading">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--conversion-rate ecom-conversion-rate-card">
        <div className="ecom-conversion-rate-card__error">載入失敗: {error}</div>
      </section>
    );
  }

  return (
    <section className="card card--conversion-rate ecom-conversion-rate-card">
      <div className="ecom-conversion-rate-card__header">
        <div className="ecom-conversion-rate-card__title-section">
          <h3 className="ecom-conversion-rate-card__title">{data.title}</h3>
          <p className="ecom-conversion-rate-card__subtitle">{data.subtitle}</p>
        </div>
        <div className="ecom-conversion-rate-card__menu">
          <span className="ecom-conversion-rate-card__menu-icon">⋮</span>
        </div>
      </div>

      <div className="ecom-conversion-rate-card__main-content">
        <div className="ecom-conversion-rate-card__rate-section">
          <div className="ecom-conversion-rate-card__rate-info">
            <div className="ecom-conversion-rate-card__rate-value">
              {data.mainRate}%
            </div>
            <div 
              className="ecom-conversion-rate-card__rate-change"
              style={{ color: getChangeColor(data.changeDirection) }}
            >
              <span className="ecom-conversion-rate-card__change-icon">
                {getChangeIcon(data.changeDirection)}
              </span>
              {Math.abs(data.changePercentage)}%
            </div>
          </div>
          <div className="ecom-conversion-rate-card__trend-chart">
            <svg width="120" height="40" viewBox="0 0 120 40">
              <polyline
                points={data.trendData.map((value, index) => 
                  `${index * 10},${40 - (value / 100) * 30}`
                ).join(' ')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              <circle
                cx={data.trendData.length * 10 - 10}
                cy={40 - (data.trendData[data.trendData.length - 1] / 100) * 30}
                r="3"
                fill="#3b82f6"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="ecom-conversion-rate-card__metrics">
        {data.metrics.map((metric, index) => (
          <div key={index} className="ecom-conversion-rate-card__metric-item">
            <div className="ecom-conversion-rate-card__metric-info">
              <span className="ecom-conversion-rate-card__metric-name">
                {metric.name}
              </span>
              <span className="ecom-conversion-rate-card__metric-value">
                {metric.value}
              </span>
            </div>
            <div 
              className="ecom-conversion-rate-card__metric-change"
              style={{ color: getChangeColor(metric.changeDirection) }}
            >
              <span className="ecom-conversion-rate-card__metric-change-icon">
                {getChangeIcon(metric.changeDirection)}
              </span>
              {Math.abs(metric.changePercentage)}%
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EcomConversionRateCard;
