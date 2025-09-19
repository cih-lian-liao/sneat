import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TotalRevenueCard.css";

export default function TotalRevenueCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

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

  const year1 = data.year1 || {};
  const year2 = data.year2 || {};
  const growthPercentage = data.growthPercentage || 0;

  return (
    <section className="card card--total-revenue total-revenue">
      <div className="total-revenue__header">
        <h3 className="card__title">Total Revenue</h3>
      </div>

      <div className="total-revenue__content">
        <div className="total-revenue__chart-section">
          <div className="simple-chart">
            <div className="chart-bar" style={{ height: '200px', backgroundColor: '#7367F0', borderRadius: '4px' }}></div>
          </div>
        </div>

        <div className="total-revenue__stats-section">
          <div className="growth-section">
            <div className="growth-gauge">
              <div className="growth-gauge__text">
                <div className="growth-gauge__percentage">{growthPercentage}%</div>
                <div className="growth-gauge__label">Growth</div>
              </div>
            </div>
          </div>

          <div className="revenue-cards">
            {year1.year && (
              <div className="revenue-card">
                <div className="revenue-card__icon" style={{ backgroundColor: '#7367F0' }}>
                  $
                </div>
                <div className="revenue-card__content">
                  <div className="revenue-card__year">{year1.year}</div>
                  <div className="revenue-card__amount">${(year1.total || 0).toLocaleString()}</div>
                </div>
              </div>
            )}
            {year2.year && (
              <div className="revenue-card">
                <div className="revenue-card__icon" style={{ backgroundColor: '#E3DDFD' }}>
                  📊
                </div>
                <div className="revenue-card__content">
                  <div className="revenue-card__year">{year2.year}</div>
                  <div className="revenue-card__amount">${(year2.total || 0).toLocaleString()}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}