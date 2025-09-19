import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TotalRevenueCard.css";

export default function TotalRevenueCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2025');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:54112';
        const res = await axios.get(`${API_BASE}/api/totalrevenue`);
        setData(res.data || {});
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        setData({});
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

  const growthPercentage = data.growthPercentage || 78;
  const companyGrowth = data.companyGrowth || 62;

  // 格式化金額顯示
  const formatAmount = (amount) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount}`;
  };

  return (
    <section className="card card--total-revenue total-revenue">
      <div className="total-revenue__header">
        <h3 className="card__title">Total Revenue</h3>
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
      </div>

      <div className="total-revenue__content">
        {/* 左側：圖表區域 */}
        <div className="total-revenue__chart-section">
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot legend-dot--purple"></div>
              <span>2024</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot legend-dot--blue"></div>
              <span>2023</span>
            </div>
          </div>
          
          <div className="chart-container">
            <div className="simple-chart">
              <div className="chart-bar chart-bar--purple" style={{ height: '60%' }}></div>
              <div className="chart-bar chart-bar--blue" style={{ height: '40%' }}></div>
            </div>
          </div>
        </div>

        {/* 右側：統計區域 */}
        <div className="total-revenue__stats-section">
          {/* 增長儀表 */}
          <div className="growth-section">
            <div className="growth-gauge">
              <div className="growth-gauge__circle">
                <div className="growth-gauge__text">
                  <div className="growth-gauge__percentage">{growthPercentage}%</div>
                  <div className="growth-gauge__label">Growth</div>
                </div>
              </div>
            </div>
            <div className="company-growth">
              <span className="company-growth__percentage">{companyGrowth}%</span>
              <span className="company-growth__text">Company Growth</span>
            </div>
          </div>

          {/* 收入卡片 */}
          <div className="revenue-cards">
            <div className="revenue-card is-active">
              <div className="revenue-card__icon revenue-card__icon--purple">$</div>
              <div className="revenue-card__content">
                <div className="revenue-card__year">2025</div>
                <div className="revenue-card__amount">{formatAmount(32500)}</div>
              </div>
            </div>
            <div className="revenue-card">
              <div className="revenue-card__icon revenue-card__icon--blue">📊</div>
              <div className="revenue-card__content">
                <div className="revenue-card__year">2024</div>
                <div className="revenue-card__amount">{formatAmount(41200)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}