import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EcomExpensesCard.css';

const CIRCUMFERENCE = 2 * Math.PI * 45; // r=45

const EcomExpensesCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fallback = {
    title: 'Expenses',
    percent: 72,
    note: '$2k Expenses more than last month'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/dashboard?card=ecomExpenses');
        setData(res.data || fallback);
        setError('');
      } catch (err) {
        console.error('Error fetching ecom expenses:', err);
        setData(fallback);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const card = data || fallback;
  const pct = Math.max(0, Math.min(100, card.percent || 0));
  const dash = (pct / 100) * (CIRCUMFERENCE);
  const gap = CIRCUMFERENCE - dash;

  if (loading) {
    return (
      <section className="card card--expenses ecom-expenses-card">
        <div className="ecom-expenses-card__loading">載入中...</div>
      </section>
    );
  }

  if (error && !card) {
    return (
      <section className="card card--expenses ecom-expenses-card">
        <div className="ecom-expenses-card__error">錯誤: {error}</div>
      </section>
    );
  }

  return (
    <section className="card card--expenses ecom-expenses-card">
      <div className="ecom-expenses-card__title">{card.title}</div>

      <div className="ecom-expenses-card__gauge">
        <svg className="ecom-expenses-card__svg" viewBox="0 0 120 70" width="100%" height="90">
          <g transform="translate(60,60)">
            <path d="M -50 0 A 50 50 0 0 1 50 0" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round"/>
            <path d="M -50 0 A 50 50 0 0 1 50 0" fill="none" stroke="#6366f1" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${dash} ${gap}`} strokeDashoffset="0"/>
          </g>
        </svg>
        <div className="ecom-expenses-card__percent">{pct}%</div>
      </div>

      <div className="ecom-expenses-card__note">{card.note}</div>
    </section>
  );
};

export default EcomExpensesCard;


