import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EcomExpensesRightCard.css';

const EcomExpensesRightCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard?card=ecomExpensesRight');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch ecommerce expenses right data:', err);
        setError(err.message);
        // 使用預設數據
        setData({
          title: 'Expenses',
          value: 84.7,
          unit: 'k',
          changePercentage: 8.2,
          changeDirection: 'down',
          period: 'JULY 2025',
          chartData: [
            { blue: 45, orange: 30 },
            { blue: 35, orange: 25 },
            { blue: 50, orange: 35 },
            { blue: 40, orange: 28 },
            { blue: 60, orange: 40 },
            { blue: 30, orange: 20 },
            { blue: 55, orange: 38 },
            { blue: 42, orange: 32 },
            { blue: 38, orange: 26 },
            { blue: 48, orange: 34 },
            { blue: 33, orange: 22 },
            { blue: 52, orange: 36 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getChangeColor = (direction) => {
    return direction === 'up' ? '#10b981' : '#ef4444';
  };

  const getChangeIcon = (direction) => {
    return direction === 'up' ? '↗' : '↓';
  };

  const formatCurrency = (value, unit) => {
    return `$${value}${unit}`;
  };

  const getMaxValue = () => {
    if (!data?.chartData) return 100;
    return Math.max(...data.chartData.map(item => item.blue + item.orange));
  };

  if (loading) {
    return (
      <section className="card card--ecom-expenses-right ecom-expenses-right-card">
        <div className="ecom-expenses-right-card__loading">載入中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--ecom-expenses-right ecom-expenses-right-card">
        <div className="ecom-expenses-right-card__error">載入失敗: {error}</div>
      </section>
    );
  }

  const maxValue = getMaxValue();

  return (
    <section className="card card--ecom-expenses-right ecom-expenses-right-card">
      <div className="ecom-expenses-right-card__content">
        <div className="ecom-expenses-right-card__left-section">
          <h3 className="ecom-expenses-right-card__title">{data.title}</h3>
          <div className="ecom-expenses-right-card__value">
            {formatCurrency(data.value, data.unit)}
          </div>
          <div 
            className="ecom-expenses-right-card__change"
            style={{ color: getChangeColor(data.changeDirection) }}
          >
            <span className="ecom-expenses-right-card__change-icon">
              {getChangeIcon(data.changeDirection)}
            </span>
            {data.changePercentage}%
          </div>
          <div className="ecom-expenses-right-card__period">
            {data.period}
          </div>
        </div>

        <div className="ecom-expenses-right-card__chart-section">
          <div className="ecom-expenses-right-card__chart">
            {data.chartData.map((item, index) => (
              <div key={index} className="ecom-expenses-right-card__bar-container">
                <div className="ecom-expenses-right-card__bar">
                  <div 
                    className="ecom-expenses-right-card__bar-segment ecom-expenses-right-card__bar-segment--blue"
                    style={{ height: `${(item.blue / maxValue) * 100}%` }}
                  ></div>
                  <div 
                    className="ecom-expenses-right-card__bar-segment ecom-expenses-right-card__bar-segment--orange"
                    style={{ height: `${(item.orange / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcomExpensesRightCard;
