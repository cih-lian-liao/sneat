import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentsCard.css";

export default function PaymentsCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 直接使用 localhost:54112，不依賴環境變量
        const res = await axios.get('http://localhost:54112/api/payments/card');
        console.log('PaymentsCard API response:', res.data);
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching payments data:', error);
        setError(error.message);
        setData({});
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="card card--payments payments-card">
        <div>載入中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--payments payments-card">
        <div style={{ color: 'red' }}>錯誤: {error}</div>
      </section>
    );
  }

  const amount = data.totalAmount || 0;
  const changePct = data.changePct || 0;
  const changeType = data.changeType || 'increase';

  console.log('PaymentsCard data:', data);
  console.log('PaymentsCard amount:', amount);
  console.log('PaymentsCard changePct:', changePct);
  console.log('PaymentsCard changeType:', changeType);

  return (
    <section className="card card--payments payments-card">
      <div className="payments-card__header">
        <div className="payments-icon">
          <div className="payments-icon__background">
            <span className="payments-icon__letter">P</span>
          </div>
        </div>
        <div className="payments-card__menu">
          <div className="menu-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="payments-card__content">
        <h3 className="payments-card__title">Payments</h3>
        <div className="payments-card__amount">
          ${amount.toLocaleString()}
        </div>
        <div className={`change-indicator ${changeType === 'increase' ? 'increase' : 'decrease'}`}>
          <span className="change-indicator__arrow">
            {changeType === 'increase' ? '↑' : '↓'}
          </span>
          <span className="change-indicator__text">{Math.abs(changePct)}%</span>
        </div>
      </div>
    </section>
  );
}