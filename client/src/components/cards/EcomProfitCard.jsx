import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EcomProfitCard.css';

const EcomProfitCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fallback = {
    title: 'Profit',
    amount: 624000,
    months: [
      { label: 'Jan', bars: [48, 40] },
      { label: 'Apr', bars: [32, 18] },
      { label: 'Jul', bars: [46, 60] },
      { label: 'Oct', bars: [100, 90] }
    ]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/dashboard?card=ecomProfit');
        setData(res.data || fallback);
        setError('');
      } catch (err) {
        console.error('Error fetching ecom profit:', err);
        setData(fallback);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const card = data || fallback;
  const max = Math.max(
    ...card.months.flatMap(m => m.bars),
    1
  );

  if (loading) {
    return (
      <section className="card card--profit ecom-profit-card">
        <div className="ecom-profit-card__loading">Loading...</div>
      </section>
    );
  }

  if (error && !card) {
    return (
      <section className="card card--profit ecom-profit-card">
        <div className="ecom-profit-card__error">錯誤: {error}</div>
      </section>
    );
  }

  return (
    <section className="card card--profit ecom-profit-card">
      <div className="ecom-profit-card__title">{card.title}</div>
      <div className="ecom-profit-card__amount">{Math.round(card.amount/1000)}k</div>

      <div className="ecom-profit-card__chart">
        <div className="ecom-profit-card__groups">
          {card.months.map((m, idx) => (
            <div key={`grp-${m.label}-${idx}`} className="ecom-profit-card__group">
              <div className="ecom-profit-card__bars">
                {m.bars.map((v, j) => (
                  <div key={`bar-${j}`} className={`ecom-profit-card__bar ${j === 0 ? 'is-strong' : 'is-light'}`} style={{ height: `${(v / max) * 100}%` }} />
                ))}
              </div>
              <div className="ecom-profit-card__label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcomProfitCard;


