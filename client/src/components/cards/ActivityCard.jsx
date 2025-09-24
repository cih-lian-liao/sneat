import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ActivityCard.css';

const ActivityCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fallback = {
    title: 'Activity',
    periodLabel: 'Last Week',
    percent: 82,
    deltaPct: 19.6,
    deltaDirection: 'up',
    weekly: [
      { label: 'Mo', value: 20 },
      { label: 'Tu', value: 28 },
      { label: 'We', value: 24 },
      { label: 'Th', value: 70 },
      { label: 'Fr', value: 10 },
      { label: 'Sa', value: 55 },
      { label: 'Su', value: 40 }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/dashboard?card=activity');
        setData(res.data || fallback);
        setError('');
      } catch (err) {
        console.error('Error fetching activity:', err);
        setData(fallback);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const card = data || fallback;
  const max = Math.max(...card.weekly.map(d => d.value), 1);
  const isDown = card.deltaDirection === 'down' || card.deltaPct < 0;

  const pathD = (() => {
    // Simple SVG path generator with smoothing
    const points = card.weekly.map((d, i) => {
      const x = (i / (card.weekly.length - 1)) * 100;
      const y = 100 - (d.value / max) * 100;
      return [x, y];
    });
    let d = `M ${points[0][0]},${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const [x, y] = points[i];
      const [px, py] = points[i - 1];
      const cx = (px + x) / 2;
      d += ` C ${cx},${py} ${cx},${y} ${x},${y}`;
    }
    return d;
  })();

  if (loading) {
    return (
      <section className="card card--activity ecom-activity-card">
        <div className="ecom-activity-card__loading">載入中...</div>
      </section>
    );
  }

  if (error && !card) {
    return (
      <section className="card card--activity ecom-activity-card">
        <div className="ecom-activity-card__error">錯誤: {error}</div>
      </section>
    );
  }

  return (
    <section className="card card--activity ecom-activity-card">
      <div className="ecom-activity-card__grid">
        {/* 左側 KPI */}
        <div className="ecom-activity-card__left">
          <h3 className="ecom-activity-card__title">{card.title}</h3>
          <div className="ecom-activity-card__percent">{card.percent}%</div>
          <div className={`ecom-activity-card__delta ${isDown ? 'is-down' : 'is-up'}`}>
            <span className="ecom-activity-card__delta-icon">{isDown ? '↓' : '↑'}</span>
            <span>{Math.abs(card.deltaPct)}%</span>
          </div>
        </div>

        {/* 右側 折線圖 + 期間 */}
        <div className="ecom-activity-card__right">
          <div className="ecom-activity-card__period">{card.periodLabel}</div>
          <div className="ecom-activity-card__chart">
            <svg className="ecom-activity-card__spark" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={pathD} fill="none" stroke="#22c55e" strokeWidth="2" />
              <path d={`${pathD} L 100,100 L 0,100 Z`} fill="url(#actGrad)" stroke="none" />
            </svg>
            <div className="ecom-activity-card__labels">
              {card.weekly.map((d, idx) => (
                <div key={`${d.label}-${idx}`} className="ecom-activity-card__label">{d.label}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityCard;


