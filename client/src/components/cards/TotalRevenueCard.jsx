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
        const payload = res.data || {};
        // 資料健全性檢查：若 API 回傳缺少月份或數列，使用 fallback
        const hasValidChart = Array.isArray(payload?.chartData?.months) && payload.chartData.months.length > 0
          && Array.isArray(payload?.chartData?.data2024) && payload.chartData.data2024.length === payload.chartData.months.length
          && Array.isArray(payload?.chartData?.data2023) && payload.chartData.data2023.length === payload.chartData.months.length;

        if (!hasValidChart) {
          console.warn('TotalRevenue API data invalid, using fallback. Received:', payload?.chartData);
          setData({
            title: 'Total Revenue',
            selectedYear: '2025',
            chartData: {
              months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              data2024: [17, 5, 14, 28, 17, 10, 8],
              data2023: [12, 18, 10, 14, 3, 17, 15]
            },
            growthMetrics: { growthPercentage: 78, companyGrowth: 62 },
            revenueCards: [
              { year: '2025', amount: 32500, icon: '$', color: '#8b5cf6' },
              { year: '2024', amount: 41200, icon: '📊', color: '#06b6d4' }
            ]
          });
        } else {
          setData(payload);
        }
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
            data2023: [12, 18, 10, 14, 3, 17, 15] // 2023年數據（正值）
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
        <div className="loading">載入中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--total-revenue">
        <div className="error">錯誤: {error}</div>
      </section>
    );
  }

  const chartData = data.chartData || {};
  const growthMetrics = data.growthMetrics || {};
  const revenueCards = data.revenueCards || [];
  const useSimpleChart = true; // 使用更簡單的條狀圖呈現

  // 調試日誌
  console.log('Total Revenue Data:', data);
  console.log('Chart Data:', chartData);
  console.log('Months:', chartData.months);
  console.log('Data2024:', chartData.data2024);
  console.log('Data2023:', chartData.data2023);

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
      {/* 標題區域 */}
      <div className="card-header">
        <h2 className="card-title">{data.title || 'Total Revenue'}</h2>
      </div>

      {/* 主要內容區域 */}
      <div className="tr-content">
        {/* 左側：柱狀圖區域 */}
        <div className="tr-chart-section">
          {useSimpleChart ? (
            <div className="tr-simple-chart">
              {(chartData.months || []).map((month, index) => {
                const value = chartData.data2024?.[index] ?? 0; // 單一序列：使用 2024
                const simpleMax = Math.max(...(chartData.data2024 || [0]));
                const height = simpleMax > 0 ? (value / simpleMax) * 100 : 0;
                return (
                  <div key={month} className="tr-simple-col">
                    <div className="tr-simple-bar" style={{ height: `${height}%` }} title={`${month}: ${value}`}></div>
                    <div className="tr-simple-label">{month}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div className="tr-chart-header">
                <div className="tr-chart-legend">
                  <div className="tr-legend-item">
                    <div className="tr-legend-dot tr-legend-dot--blue"></div>
                    <span>2024</span>
                  </div>
                  <div className="tr-legend-item">
                    <div className="tr-legend-dot tr-legend-dot--light-blue"></div>
                    <span>2023</span>
                  </div>
                </div>
              </div>
              <div className="tr-chart-container">
                <div className="tr-chart-y-axis">
                  <div className="y-label">30</div>
                  <div className="y-label">20</div>
                  <div className="y-label">10</div>
                  <div className="y-label">0</div>
                  <div className="y-label">-10</div>
                  <div className="y-label">-20</div>
                </div>
                <div className="tr-chart-bars">
                  {(chartData.months || []).map((month, index) => {
                    const value2024 = chartData.data2024?.[index] || 0;
                    const value2023 = chartData.data2023?.[index] || 0;
                    const height2024 = Math.abs(value2024) / maxValue * 80;
                    const height2023 = Math.abs(value2023) / maxValue * 80;
                    return (
                      <div key={month} className="tr-chart-month">
                        <div className="tr-month-bars">
                          <div className="tr-chart-bar tr-chart-bar--2024" style={{ height: `${height2024}px`, transform: value2024 >= 0 ? 'translateY(0)' : 'translateY(100%)' }} title={`2024: ${value2024}`}></div>
                          <div className="tr-chart-bar tr-chart-bar--2023" style={{ height: `${height2023}px`, transform: value2023 >= 0 ? 'translateY(0)' : 'translateY(100%)' }} title={`2023: ${value2023}`}></div>
                        </div>
                        <div className="tr-month-label">{month}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* 右側：統計區域 */}
        <div className="tr-stats-section">
          {/* 年份選擇器 */}
          <div className="tr-year-selector">
            <select 
              className="tr-year-select" 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          {/* 增長儀表 */}
          <div className="tr-growth-section">
            <div className="tr-gauge">
              <svg className="tr-gauge-svg" viewBox="0 0 100 50">
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <path
                  d="M 15 40 A 35 35 0 0 1 85 40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                />
                <path
                  d="M 15 40 A 35 35 0 0 1 85 40"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="6"
                  strokeDasharray={`${(growthMetrics.growthPercentage || 0) * 1.1} 110`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="tr-gauge-text">
                <div className="tr-gauge-percentage">{growthMetrics.growthPercentage || 0}%</div>
                <div className="tr-gauge-label">Growth</div>
              </div>
            </div>
            
            <div className="tr-company-growth">
              <span className="tr-company-growth__percentage">{growthMetrics.companyGrowth || 0}%</span>
              <span className="tr-company-growth__text">Company Growth</span>
            </div>
          </div>

          {/* 收入卡片 */}
          <div className="tr-kpi-cards">
            {revenueCards.map((card, index) => (
              <div key={card.year} className={`tr-kpi-card ${index === 0 ? 'is-active' : ''}`}>
                <div 
                  className="tr-kpi-card__icon" 
                  style={{ backgroundColor: card.color }}
                >
                  {card.icon}
                </div>
                <div className="tr-kpi-card__content">
                  <div className="tr-kpi-card__year">{card.year}</div>
                  <div className="tr-kpi-card__amount">{formatAmount(card.amount)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}