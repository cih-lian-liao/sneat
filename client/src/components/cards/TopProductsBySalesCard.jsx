import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopProductsBySalesCard.css";

export default function TopProductsBySalesCard() {
  const [data, setData] = useState({ title: "Top Products by Sales", items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/dashboard?card=crmTopSales');
        setData(res.data || {});
        setError('');
      } catch (e) {
        // 使用備援資料以確保卡片可顯示，同時回報錯誤訊息
        setError(e?.message || 'fetch failed');
        setData({
          title: 'Top Products by Sales',
          items: [
            { id: '1', name: 'Oneplus Nord', brand: 'Oneplus', amount: 98348, icon: '📱', bg: '#fee2e2' },
            { id: '2', name: 'Smart Band 4', brand: 'Xiaomi', amount: 15459, icon: '⌚️', bg: '#e9d5ff' },
            { id: '3', name: 'Surface Pro X', brand: 'Microsoft', amount: 4589, icon: '💻', bg: '#cffafe' },
            { id: '4', name: 'iPhone 13', brand: 'Apple', amount: 84345, icon: '📱', bg: '#dcfce7' },
            { id: '5', name: 'Bluetooth Earphone', brand: 'Beats', amount: 103748, icon: '🎧', bg: '#e5e7eb' }
          ]
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <section className="card card--top-sales crm-top-sales-card">Loading...</section>;
  if (error) return <section className="card card--top-sales crm-top-sales-card error">錯誤: {error}</section>;

  const formatCurrency = (amount) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <section className="card card--top-sales crm-top-sales-card">
      <header className="crm-top-sales-card__header">
        <h3 className="crm-top-sales-card__title">
          Top Products by <span className="crm-top-sales-card__highlight">Sales</span>
        </h3>
        <button className="crm-top-sales-card__options" aria-label="more">⋯</button>
      </header>

      <div className="crm-top-sales-card__list">
        {Array.isArray(data.items) && data.items.length > 0 ? (
          data.items.map((item) => (
            <div key={item.id || item.name} className="crm-top-sales-card__row">
              <div className="crm-top-sales-card__left">
                <div className="crm-top-sales-card__avatar" style={{ backgroundColor: item.bg }}>
                  <span className="crm-top-sales-card__avatar-icon">{item.icon || '🛒'}</span>
                </div>
                <div className="crm-top-sales-card__text">
                  <div className="crm-top-sales-card__name">{item.name}</div>
                  <div className="crm-top-sales-card__brand">{item.brand}</div>
                </div>
              </div>
              <div className="crm-top-sales-card__amount">{formatCurrency(Number(item.amount || 0))}</div>
            </div>
          ))
        ) : (
          <div className="crm-top-sales-card__empty">No data</div>
        )}
      </div>
    </section>
  );
}


