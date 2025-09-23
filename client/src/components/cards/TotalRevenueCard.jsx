import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TotalRevenueCard.css";

export default function TotalRevenueCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard?card=totalRevenue');
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        setError(error.message);
        // 根據附圖的數據結構
        const fallbackData = {
          title: 'Total Revenue',
          selectedYear: '2025',
          chartData: {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            data2024: [17, 5, 14, 28, 17, 10, 8], // 2024年數據（正值）
            data2023: [-12, -18, -10, -14, -3, -17, -15] // 2023年數據（負值）
          },
          growthMetrics: {
            growthPercentage: 78,
            companyGrowth: 62
          },
          revenueCards: [
            {
              year: '2025',
              amount: 32500,
              icon: '$',
              color: '#8b5cf6'
            },
            {
              year: '2024',
              amount: 41200,
              icon: '📊',
              color: '#06b6d4'
            }
          ]
        };
        setData(fallbackData);
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="card card--total-revenue">
        <div>載入中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--total-revenue">
        <div style={{ color: 'red' }}>錯誤: {error}</div>
      </section>
    );
  }

  const chartData = data.chartData || {};
  const growthMetrics = data.growthMetrics || {};
  const revenueCards = data.revenueCards || [];

  // 格式化金額顯示
  const formatAmount = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount}`;
  };

  // 計算柱狀圖的最大值用於比例計算
  const maxValue = Math.max(
    ...(chartData.data2024 || []).map(Math.abs),
    ...(chartData.data2023 || []).map(Math.abs)
  ) || 1; // 避免除零錯誤

  return (
    <section className="card card--total-revenue">
      <div className="total-revenue__content">
        {/* 左側：柱狀圖區域 */}
        <div className="total-revenue__chart-section">
          <div className="chart-header">
            <h3 className="chart-title">{data.title || 'Total Revenue'}</h3>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot legend-dot--blue"></div>
                <span>2024</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot legend-dot--light-blue"></div>
                <span>2023</span>
              </div>
            </div>
          </div>
          
          <div className="chart-container">
            <div className="chart-y-axis">
              <div className="y-label">30</div>
              <div className="y-label">20</div>
              <div className="y-label">10</div>
              <div className="y-label">0</div>
              <div className="y-label">-10</div>
              <div className="y-label">-20</div>
            </div>
            
            <div className="chart-bars">
              {(chartData.months || []).map((month, index) => {
                const value2024 = chartData.data2024?.[index] || 0;
                const value2023 = chartData.data2023?.[index] || 0;
                
                // 計算柱狀圖高度（基於最大值的比例）
                const height2024 = Math.abs(value2024) / maxValue * 80; // 80% 最大高度
                const height2023 = Math.abs(value2023) / maxValue * 80;
                
                return (
                  <div key={month} className="chart-month">
                    <div className="month-bars">
                      <div 
                        className="chart-bar chart-bar--2024" 
                        style={{ 
                          height: `${height2024}px`,
                          transform: value2024 >= 0 ? 'translateY(0)' : 'translateY(100%)'
                        }}
                        title={`2024: ${value2024}`}
                      ></div>
                      <div 
                        className="chart-bar chart-bar--2023" 
                        style={{ 
                          height: `${height2023}px`,
                          transform: value2023 >= 0 ? 'translateY(0)' : 'translateY(100%)'
                        }}
                        title={`2023: ${value2023}`}
                      ></div>
                    </div>
                    <div className="month-label">{month}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右側：統計區域 */}
        <div className="total-revenue__stats-section">
          {/* 年份選擇器 */}
          <div className="year-selector">
            <select 
              className="year-selector__dropdown" 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          {/* 增長儀表 */}
          <div className="growth-section">
            <div className="growth-gauge">
              <svg className="growth-gauge__svg" viewBox="0 0 120 60">
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path
                  d="M 20 50 A 40 40 0 0 1 100 50"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <path
                  d="M 20 50 A 40 40 0 0 1 100 50"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="8"
                  strokeDasharray={`${(growthMetrics.growthPercentage || 0) * 1.26} 126`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="growth-gauge__text">
                <div className="growth-gauge__percentage">{growthMetrics.growthPercentage || 0}%</div>
                <div className="growth-gauge__label">Growth</div>
              </div>
            </div>
            
            <div className="company-growth">
              <span className="company-growth__percentage">{growthMetrics.companyGrowth || 0}%</span>
              <span className="company-growth__text">Company Growth</span>
            </div>
          </div>

          {/* 收入卡片 */}
          <div className="revenue-cards">
            {revenueCards.map((card, index) => (
              <div key={card.year} className={`revenue-card ${index === 0 ? 'is-active' : ''}`}>
                <div 
                  className="revenue-card__icon" 
                  style={{ backgroundColor: card.color }}
                >
                  {card.icon}
                </div>
                <div className="revenue-card__content">
                  <div className="revenue-card__year">{card.year}</div>
                  <div className="revenue-card__amount">{formatAmount(card.amount)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}