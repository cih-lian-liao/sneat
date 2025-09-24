import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EcomRevenueCard.css';

const EcomRevenueCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard?card=ecomRevenue');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch ecommerce revenue data:', err);
        setError(err.message);
        // 使用預設數據
        setData({
          title: 'Revenue',
          value: 42389,
          changePercentage: 52.76,
          changeDirection: 'up',
          iconType: 'monitor',
          iconBgColor: '#FFF5E0',
          iconColor: '#FFAB00'
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
    return direction === 'up' ? '#28C76F' : '#ef4444';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getIconComponent = (iconType) => {
    switch (iconType) {
      case 'monitor':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        );
      case 'stack-of-coins':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <section className="card card--ecom-revenue ecom-revenue-card">
        <div className="ecom-revenue-card__loading">載入中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--ecom-revenue ecom-revenue-card">
        <div className="ecom-revenue-card__error">載入失敗: {error}</div>
      </section>
    );
  }

  return (
    <section className="card card--ecom-revenue ecom-revenue-card">
      <div className="ecom-revenue-card__header">
        <div className="ecom-revenue-card__icon-section">
          <div 
            className="ecom-revenue-card__icon"
            style={{ backgroundColor: data.iconBgColor }}
          >
            <div style={{ color: data.iconColor }}>
              {getIconComponent(data.iconType)}
            </div>
          </div>
          <h3 className="ecom-revenue-card__title">{data.title}</h3>
        </div>
        <div className="ecom-revenue-card__menu">
          <span className="ecom-revenue-card__menu-icon">⋮</span>
        </div>
      </div>

      <div className="ecom-revenue-card__content">
        <div className="ecom-revenue-card__metric-section">
          <span className="ecom-revenue-card__metric-label">{data.title}</span>
          <div className="ecom-revenue-card__value">
            {formatCurrency(data.value)}
          </div>
          <div 
            className="ecom-revenue-card__change"
            style={{ color: getChangeColor(data.changeDirection) }}
          >
            <span className="ecom-revenue-card__change-icon">
              {getChangeIcon(data.changeDirection)}
            </span>
            {Math.abs(data.changePercentage)}%
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcomRevenueCard;
