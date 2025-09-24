import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EarningReportCard.css";

export default function EarningReportCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard?card=earningReport');
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching earning report data:', error);
        // 在開發環境中使用預設資料
        const defaultData = {
          reportTitle: 'Earning Report',
          reportSubtitle: 'Weekly Earnings Overview',
          metrics: [
            {
              name: 'Net Profit',
              secondaryInfo: '12.4k Sales',
              value: 1619,
              changePercentage: 18.6,
              changeDirection: 'up',
              iconType: 'trend-up',
              iconColor: 'purple'
            },
            {
              name: 'Total Income',
              secondaryInfo: 'Sales, Affiliation',
              value: 3571,
              changePercentage: 39.6,
              changeDirection: 'up',
              iconType: 'dollar-sign',
              iconColor: 'green'
            },
            {
              name: 'Total Expenses',
              secondaryInfo: 'ADVT, Marketing',
              value: 430,
              changePercentage: 52.8,
              changeDirection: 'up',
              iconType: 'credit-card',
              iconColor: 'gray'
            }
          ],
          dailyData: [
            { day: 'Mo', value: 1200, highlighted: false },
            { day: 'Tu', value: 1800, highlighted: false },
            { day: 'We', value: 2200, highlighted: false },
            { day: 'Th', value: 1900, highlighted: false },
            { day: 'Fr', value: 2800, highlighted: true },
            { day: 'Sa', value: 1600, highlighted: false },
            { day: 'Su', value: 1400, highlighted: false }
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
      <section className="card card--earning earning-report-card">
        <div className="earning-report-card__loading">載入中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--earning earning-report-card">
        <div className="earning-report-card__error">錯誤: {error}</div>
      </section>
    );
  }

  const {
    reportTitle = "Earning Report",
    reportSubtitle = "Weekly Earnings Overview",
    metrics = [],
    dailyData = []
  } = data;

  // 格式化貨幣
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // 格式化百分比
  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  // 獲取圖標元件
  const getIcon = (iconType) => {
    switch (iconType) {
      case 'trend-up':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
            <polyline points="17,6 23,6 23,12"></polyline>
          </svg>
        );
      case 'dollar-sign':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        );
      case 'credit-card':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  // 獲取圖標背景色
  const getIconBgColor = (iconColor) => {
    switch (iconColor) {
      case 'purple':
        return '#7c3aed';
      case 'green':
        return '#10b981';
      case 'gray':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  // 計算條形圖的最大值
  const maxValue = Math.max(...dailyData.map(item => item.value || 0));
  
  // 生成條形圖
  const generateBarChart = () => {
    return dailyData.map((item, index) => {
      const height = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
      const isHighlighted = item.highlighted || false;
      
      return (
        <div key={`bar-${item.day}-${index}`} className="earning-report-card__bar-container">
          <div 
            className={`earning-report-card__bar ${isHighlighted ? 'earning-report-card__bar--highlighted' : ''}`}
            style={{ height: `${height}%` }}
          />
          <div className="earning-report-card__bar-label">{item.day}</div>
        </div>
      );
    });
  };

  return (
    <section className="card card--earning-report earning-report-card">
      <div className="earning-report-card__content">
        {/* 標題區域 */}
        <div className="earning-report-card__header">
          <div className="earning-report-card__title-section">
            <h3 className="earning-report-card__title">{reportTitle}</h3>
            <p className="earning-report-card__subtitle">{reportSubtitle}</p>
          </div>
          <div className="earning-report-card__menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </div>
        </div>

        {/* 指標列表 */}
        <div className="earning-report-card__metrics">
          {metrics.map((metric, index) => (
            <div key={`metric-${metric.name}-${index}`} className="earning-report-card__metric">
              <div 
                className="earning-report-card__metric-icon"
                style={{ backgroundColor: getIconBgColor(metric.iconColor) }}
              >
                {getIcon(metric.iconType)}
              </div>
              <div className="earning-report-card__metric-content">
                <div className="earning-report-card__metric-name">{metric.name}</div>
                <div className="earning-report-card__metric-secondary">{metric.secondaryInfo}</div>
              </div>
              <div className="earning-report-card__metric-values">
                <div className="earning-report-card__metric-value">{formatCurrency(metric.value)}</div>
                <div className={`earning-report-card__metric-change earning-report-card__metric-change--${metric.changeDirection}`}>
                  <span className="earning-report-card__metric-arrow">
                    {metric.changeDirection === 'up' ? '↑' : '↓'}
                  </span>
                  {formatPercentage(metric.changePercentage)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 條形圖 */}
        <div className="earning-report-card__chart">
          <div className="earning-report-card__bars">
            {generateBarChart()}
          </div>
        </div>
      </div>
    </section>
  );
}
