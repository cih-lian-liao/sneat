import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewVisitorsCard.css';

const NewVisitorsCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fallback = {
    title: 'New Visitors',
    periodLabel: 'Last Week',
    percent: 23,
    deltaPct: -8.75,
    deltaDirection: 'down',
    weekly: [
      { label: 'Mo', value: 20 },
      { label: 'Tu', value: 48 },
      { label: 'We', value: 42 },
      { label: 'Th', value: 18 },
      { label: 'Fr', value: 30 },
      { label: 'Sa', value: 100, highlighted: true },
      { label: 'Su', value: 46 }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/dashboard?card=newVisitors');
        setData(res.data || fallback);
        setError('');
      } catch (err) {
        console.error('Error fetching new visitors:', err);
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

  if (loading) {
    return (
      <section className="card card--new-visitors ecom-new-visitors-card">
        <div className="ecom-new-visitors-card__loading">載入中...</div>
      </section>
    );
  }

  if (error && !card) {
    return (
      <section className="card card--new-visitors ecom-new-visitors-card">
        <div className="ecom-new-visitors-card__error">錯誤: {error}</div>
      </section>
    );
  }

  return (
    <section className="card card--new-visitors ecom-new-visitors-card">
      <div className="ecom-new-visitors-card__header">
        <h3 className="ecom-new-visitors-card__title">{card.title}</h3>
        <div className="ecom-new-visitors-card__period">{card.periodLabel}</div>
      </div>

      <div className="ecom-new-visitors-card__kpis">
        <div className="ecom-new-visitors-card__percent">{card.percent}%</div>
        <div className={`ecom-new-visitors-card__delta ${isDown ? 'is-down' : 'is-up'}`}>
          <span className="ecom-new-visitors-card__delta-icon">{isDown ? '↓' : '↑'}</span>
          <span>{Math.abs(card.deltaPct)}%</span>
        </div>
      </div>

      <div className="ecom-new-visitors-card__chart">
        <div className="ecom-new-visitors-card__bars">
          {card.weekly.map((d, idx) => (
            <div key={`${d.label}-${idx}`} className="ecom-new-visitors-card__bar-col">
              <div
                className={`ecom-new-visitors-card__bar ${d.highlighted ? 'is-highlighted' : ''}`}
                style={{ height: `${(d.value / max) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div className="ecom-new-visitors-card__labels">
          {card.weekly.map((d, idx) => (
            <div key={`${d.label}-label-${idx}`} className="ecom-new-visitors-card__label">{d.label}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewVisitorsCard;


