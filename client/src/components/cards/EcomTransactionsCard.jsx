import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EcomTransactionsCard.css';

const EcomTransactionsCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fallback = {
    title: 'Transactions',
    amount: 14854,
    deltaPct: 17.53,
    deltaDirection: 'up',
    iconUrl: 'https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/dashboard?card=ecomTransactions');
        setData(res.data || fallback);
        setError('');
      } catch (err) {
        console.error('Error fetching ecom transactions:', err);
        setData(fallback);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const card = data || fallback;
  const isDown = card.deltaDirection === 'down' || (card.deltaPct || 0) < 0;

  if (loading) {
    return (
      <section className="card card--ecom-transactions ecom-transactions-card">
        <div className="ecom-transactions-card__loading">載入中...</div>
      </section>
    );
  }

  if (error && !card) {
    return (
      <section className="card card--ecom-transactions ecom-transactions-card">
        <div className="ecom-transactions-card__error">錯誤: {error}</div>
      </section>
    );
  }

  return (
    <section className="card card--ecom-transactions ecom-transactions-card">
      <div className="ecom-transactions-card__row">
        <div className="ecom-transactions-card__icon">
          <img src={card.iconUrl} alt="card" />
        </div>
        <button className="ecom-transactions-card__more" aria-label="more">⋮</button>
      </div>

      <div className="ecom-transactions-card__title">{card.title}</div>
      <div className="ecom-transactions-card__amount">${card.amount.toLocaleString()}</div>
      <div className={`ecom-transactions-card__delta ${isDown ? 'is-down' : 'is-up'}`}>
        <span className="ecom-transactions-card__delta-arrow">{isDown ? '↓' : '↑'}</span>
        <span>{Math.abs(card.deltaPct)}%</span>
      </div>
    </section>
  );
};

export default EcomTransactionsCard;


