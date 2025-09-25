import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './EcomTotalIncomeCard.css';

const EcomTotalIncomeCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fallback = {
    title: 'Total Income',
    subtitle: 'Yearly report overview',
    series: [3200, 3200, 4800, 4800, 3000, 3000, 1600, 1600, 3600, 3600, 5600, 5600],
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    yTicks: ['$1k','$2k','$3k','$4k','$5k','$6k'],
    reportTitle: 'Report',
    reportSubtitle: 'Monthly Avg. $45.578k',
    items: [
      { icon: '💳', label: 'Income', amount: 42845, delta: 2.7, dir: 'up', color: '#10b981' },
      { icon: '🛍️', label: 'Expense', amount: 38658, delta: 1.15, dir: 'down', color: '#ef4444' },
      { icon: '💼', label: 'Profit', amount: 18220, delta: 1.34, dir: 'up', color: '#10b981' }
    ]
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/dashboard?card=ecomTotalIncome');
        setData(res.data || fallback);
        setError('');
      } catch (e) {
        console.error('Error fetching total income', e);
        setData(fallback);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const card = data || fallback;
  const max = Math.max(...card.series, 1);
  const points = useMemo(() => card.series.map((v, i) => {
    const x = (i / (card.series.length - 1)) * 100;
    const y = 100 - (v / max) * 100;
    return [x, y];
  }), [card.series, max]);

  const pathD = useMemo(() => {
    let d = `M ${points[0][0]},${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const [x, y] = points[i];
      const [px, py] = points[i - 1];
      const cx = (px + x) / 2;
      d += ` C ${cx},${py} ${cx},${y} ${x},${y}`;
    }
    return d;
  }, [points]);

  if (loading) {
    return (
      <section className="card card--total-income ecom-total-income-card"><div>Loading...</div></section>
    );
  }
  if (error && !card) {
    return (
      <section className="card card--total-income ecom-total-income-card"><div style={{color:'red'}}>錯誤: {error}</div></section>
    );
  }

  return (
    <section className="card card--total-income ecom-total-income-card">
      <div className="ecom-total-income-card__grid">
        <div className="ecom-total-income-card__chart">
          <div className="ecom-total-income-card__title">{card.title}</div>
          <div className="ecom-total-income-card__subtitle">{card.subtitle}</div>

          <div className="ecom-total-income-card__svg-wrap">
            <svg className="ecom-total-income-card__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="1.8" />
              <path d={`${pathD} L 100,100 L 0,100 Z`} fill="url(#tiGrad)" />
              {/* Y ticks (visual only) */}
              {card.yTicks.map((_, i) => (
                <line key={`y-${i}`} x1="0" x2="100" y1={(i+1)*(100/(card.yTicks.length+1))} y2={(i+1)*(100/(card.yTicks.length+1))} stroke="#e5e7eb" strokeWidth="0.2" />
              ))}
            </svg>
          </div>
          <div className="ecom-total-income-card__xlabels">
            {card.labels.map((l, i) => (
              <div key={`lbl-${l}-${i}`} className="ecom-total-income-card__xlabel">{l}</div>
            ))}
          </div>
        </div>

        <aside className="ecom-total-income-card__report">
          <div className="ecom-total-income-card__report-title">{card.reportTitle}</div>
          <div className="ecom-total-income-card__report-sub">{card.reportSubtitle}</div>
          <div className="ecom-total-income-card__report-list">
            {card.items.map((it, i) => (
              <div key={`it-${it.label}-${i}`} className="ecom-total-income-card__report-item">
                <div className="ecom-total-income-card__report-icon">{it.icon}</div>
                <div className="ecom-total-income-card__report-info">
                  <div className="ecom-total-income-card__report-label">{it.label}</div>
                  <div className="ecom-total-income-card__report-amount">${it.amount.toLocaleString()}</div>
                </div>
                <div className="ecom-total-income-card__report-delta" style={{color: it.dir==='up' ? '#10b981' : '#ef4444'}}>
                  {it.dir==='up' ? '+' : '-'}{it.delta}k
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default EcomTotalIncomeCard;


