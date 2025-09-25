import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EcomTotalBalanceCard.css';

const EcomTotalBalanceCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/dashboard?card=ecomTotalBalance');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch ecommerce total balance data:', err);
        setError(err.message);
        // 使用預設數據
        setData({
          title: 'Total Balance',
          balances: [
            {
              type: 'Wallet',
              amount: 2.54,
              unit: 'k',
              icon: '💳',
              iconBgColor: '#FFF7ED',
              iconColor: '#F9A825'
            },
            {
              type: 'Paypal',
              amount: 4.21,
              unit: 'k',
              icon: '$',
              iconBgColor: '#F3F4F6',
              iconColor: '#6B7280'
            }
          ],
          chartData: [
            { month: 'Jan', value: 2.1 },
            { month: 'Feb', value: 2.8 },
            { month: 'Mar', value: 2.3 },
            { month: 'Apr', value: 3.2 },
            { month: 'May', value: 2.9 },
            { month: 'Jun', value: 4.1 }
          ],
          notification: {
            title: 'You have done 57.6% more sales.',
            subtitle: 'Check your new badge in your profile.',
            iconBgColor: '#FFF7ED',
            iconColor: '#F9A825'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount, unit) => {
    return `$${amount}${unit}`;
  };

  const getMaxValue = () => {
    if (!data?.chartData) return 5;
    return Math.max(...data.chartData.map(item => item.value));
  };

  const getMinValue = () => {
    if (!data?.chartData) return 0;
    return Math.min(...data.chartData.map(item => item.value));
  };

  if (loading) {
    return (
      <section className="card card--ecom-total-balance ecom-total-balance-card">
        <div className="ecom-total-balance-card__loading">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--ecom-total-balance ecom-total-balance-card">
        <div className="ecom-total-balance-card__error">載入失敗: {error}</div>
      </section>
    );
  }

  const maxValue = getMaxValue();
  const minValue = getMinValue();
  const chartHeight = 120;
  const chartWidth = 280;

  return (
    <section className="card card--ecom-total-balance ecom-total-balance-card">
      <div className="ecom-total-balance-card__content">
        <div className="ecom-total-balance-card__header">
          <h3 className="ecom-total-balance-card__title">{data.title}</h3>
          <div className="ecom-total-balance-card__menu">
            <span className="ecom-total-balance-card__menu-icon">⋮</span>
          </div>
        </div>

        <div className="ecom-total-balance-card__balances">
          {data.balances.map((balance, index) => (
            <div key={index} className="ecom-total-balance-card__balance-item">
              <div 
                className="ecom-total-balance-card__balance-icon"
                style={{ 
                  backgroundColor: balance.iconBgColor,
                  color: balance.iconColor
                }}
              >
                {balance.icon}
              </div>
              <div className="ecom-total-balance-card__balance-info">
                <div className="ecom-total-balance-card__balance-amount">
                  {formatCurrency(balance.amount, balance.unit)}
                </div>
                <div className="ecom-total-balance-card__balance-label">
                  {balance.type}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ecom-total-balance-card__chart">
          <svg width={chartWidth} height={chartHeight} className="ecom-total-balance-card__chart-svg">
            <defs>
              <linearGradient id="ecomTotalBalanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F9A825" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F9A825" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Chart area */}
            <path
              d={`M 0 ${chartHeight} ${data.chartData.map((item, index) => {
                const x = (index / (data.chartData.length - 1)) * chartWidth;
                const y = chartHeight - ((item.value - minValue) / (maxValue - minValue)) * chartHeight;
                return `L ${x} ${y}`;
              }).join(' ')} L ${chartWidth} ${chartHeight} Z`}
              fill="url(#ecomTotalBalanceGradient)"
            />
            
            {/* Chart line */}
            <path
              d={`M ${data.chartData.map((item, index) => {
                const x = (index / (data.chartData.length - 1)) * chartWidth;
                const y = chartHeight - ((item.value - minValue) / (maxValue - minValue)) * chartHeight;
                return `${x} ${y}`;
              }).join(' L ')}`}
              fill="none"
              stroke="#F9A825"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {data.chartData.map((item, index) => {
              const x = (index / (data.chartData.length - 1)) * chartWidth;
              const y = chartHeight - ((item.value - minValue) / (maxValue - minValue)) * chartHeight;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r={index === data.chartData.length - 1 ? "4" : "0"}
                  fill="#F9A825"
                />
              );
            })}
          </svg>
          
          <div className="ecom-total-balance-card__chart-labels">
            {data.chartData.map((item, index) => (
              <div key={index} className="ecom-total-balance-card__chart-label">
                {item.month}
              </div>
            ))}
          </div>
        </div>

        <div className="ecom-total-balance-card__notification">
          <div className="ecom-total-balance-card__notification-content">
            <div className="ecom-total-balance-card__notification-title">
              {data.notification.title}
            </div>
            <div className="ecom-total-balance-card__notification-subtitle">
              {data.notification.subtitle}
            </div>
          </div>
          <div 
            className="ecom-total-balance-card__notification-icon"
            style={{ 
              backgroundColor: data.notification.iconBgColor,
              color: data.notification.iconColor
            }}
          >
            →
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcomTotalBalanceCard;
