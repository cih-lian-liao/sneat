import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EcomSalesCard.css';

const EcomSalesCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard?card=ecomSales');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch ecommerce sales data:', err);
        setError(err.message);
        // 使用預設數據
        setData({
          title: 'Sales',
          value: 482,
          unit: 'k',
          changePercentage: 34,
          changeDirection: 'up',
          salesTargetLabel: 'Sales Target',
          salesTargetValue: 78
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getChangeColor = (direction) => {
    return direction === 'up' ? '#3B82F6' : '#ef4444';
  };

  const getChangeBgColor = (direction) => {
    return direction === 'up' ? '#EBF8FF' : '#FEF2F2';
  };

  if (loading) {
    return (
      <section className="card card--ecom-sales ecom-sales-card">
        <div className="ecom-sales-card__loading">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--ecom-sales ecom-sales-card">
        <div className="ecom-sales-card__error">載入失敗: {error}</div>
      </section>
    );
  }

  return (
    <section className="card card--ecom-sales ecom-sales-card">
      <div className="ecom-sales-card__content">
        <div className="ecom-sales-card__main-section">
          <h3 className="ecom-sales-card__title">{data.title}</h3>
          <div className="ecom-sales-card__value">
            {data.value}{data.unit}
          </div>
          <div 
            className="ecom-sales-card__change"
            style={{ 
              color: getChangeColor(data.changeDirection),
              backgroundColor: getChangeBgColor(data.changeDirection)
            }}
          >
            +{data.changePercentage}%
          </div>
        </div>

        <div className="ecom-sales-card__target-section">
          <div className="ecom-sales-card__target-header">
            <span className="ecom-sales-card__target-label">{data.salesTargetLabel}</span>
            <span className="ecom-sales-card__target-value">{data.salesTargetValue}%</span>
          </div>
          <div className="ecom-sales-card__progress-bar">
            <div 
              className="ecom-sales-card__progress-fill"
              style={{ width: `${data.salesTargetValue}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcomSalesCard;
