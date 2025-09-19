import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentsCard.css";

export default function PaymentsCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:54112';
        const res = await axios.get(`${API_BASE}/api/payments/card`);
        setData(res.data || {});
      } catch (error) {
        console.error('Error fetching payments data:', error);
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

  const amount = data.totalAmount || 0;
  const changePct = data.changePct || 0;
  const changeType = data.changeType || 'increase';

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