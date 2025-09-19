import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfitReportCard.css";

export default function ProfitReportCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:54112';
        const res = await axios.get(`${API_BASE}/api/profitreport`);
        setData(res.data || {});
        setError('');
      } catch (e) {
        console.error('Error fetching profit report:', e);
        setError(e.message);
        // 生產環境備援
        if (process.env.NODE_ENV === 'production') {
          setData({ title: 'Profit Report', year: 2025, value: 84686, changePct: 68.2, changeType: 'increase', chart: [5,70,25,60,55,95], currency: 'USD' });
          setError('');
        }
      } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <section className="card card--profit-report"><div>載入中...</div></section>;
  if (error) return <section className="card card--profit-report"><div style={{color:'red'}}>錯誤: {error}</div></section>;

  const title = data.title || 'Profit Report';
  const year = data.year || 2025;
  const value = data.value || 0;
  const pct = data.changePct ?? 0;
  const up = (data.changeType || 'increase') === 'increase';
  const chart = Array.isArray(data.chart) && data.chart.length ? data.chart : [10,60,20,55,50,90];

  const formatMoney = (v) => v >= 1000 ? `$${Math.round(v/1000)}k` : `$${v}`;

  // 以簡單折線 + 柔和陰影呈現
  const width = 220, height = 100, pad = 8;
  const maxY = 100, minY = 0;
  const stepX = (width - pad * 2) / (chart.length - 1);
  const points = chart.map((p, i) => {
    const x = pad + i * stepX;
    const y = pad + (maxY - p) * (height - pad * 2) / (maxY - minY);
    return `${x},${y}`;
  }).join(' ');

  return (
    <section className="card card--profit-report">
      <header className="card__header">{title}</header>
      <div className="profit-report__badge">YEAR {year}</div>

      <div className="profit-report__row">
        <div className={`profit-report__delta ${up ? 'is-up' : 'is-down'}`}>
          <span className="arrow">{up ? '↑' : '↓'}</span>
          <span>{Math.abs(pct).toFixed(1)}%</span>
        </div>
        <div className="profit-report__value">{formatMoney(value)}</div>
      </div>

      <div className="profit-report__chart">
        <svg viewBox={`0 0 ${width} ${height}`} className="profit-chart" preserveAspectRatio="none">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <polyline points={points} fill="none" stroke="#f59e0b" strokeWidth="4" filter="url(#glow)" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}


