import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopProductsByVolumeCard.css";

export default function TopProductsByVolumeCard() {
  const [data, setData] = useState({ title: "Top Products by Volume", items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/dashboard?card=crmTopVolume');
        setData(res.data || {});
        setError('');
      } catch (e) {
        // 使用備援資料以確保卡片可顯示，同時回報錯誤訊息
        setError(e?.message || 'fetch failed');
        setData({
          title: 'Top Products by Volume',
          items: [
            { id: '1', name: 'ENVY Laptop', brand: 'HP', volume: 12.4, changePct: 12.4, icon: '💻', bg: '#f3f4f6', iconColor: '#6b7280' },
            { id: '2', name: 'Apple iMac Pro', brand: 'iMac Pro', volume: 74.9, changePct: -8.5, icon: '🖥️', bg: '#fef3c7', iconColor: '#d97706' },
            { id: '3', name: 'Smart Watch', brand: 'Fitbit', volume: 4.4, changePct: 17.6, icon: '⌚️', bg: '#fecaca', iconColor: '#dc2626' },
            { id: '4', name: 'Oneplus Nord', brand: 'Oneplus', volume: 12.34, changePct: 13.9, icon: '📱', bg: '#dcfce7', iconColor: '#16a34a' },
            { id: '5', name: 'Pixel 4a', brand: 'Google', volume: 8.65, changePct: -11.8, icon: '📱', bg: '#e9d5ff', iconColor: '#7c3aed' }
          ]
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <section className="card card--top-volume crm-top-volume-card">載入中...</section>;
  if (error) return <section className="card card--top-volume crm-top-volume-card error">錯誤: {error}</section>;

  const formatVolume = (volume) => `${volume}k`;
  const formatChangePct = (changePct) => `${changePct > 0 ? '+' : ''}${changePct}%`;

  return (
    <section className="card card--top-volume crm-top-volume-card">
      <header className="crm-top-volume-card__header">
        <h3 className="crm-top-volume-card__title">
          Top Products by <span className="crm-top-volume-card__highlight">Volume</span>
        </h3>
        <button className="crm-top-volume-card__options" aria-label="more">⋯</button>
      </header>

      <div className="crm-top-volume-card__list">
        {Array.isArray(data.items) && data.items.length > 0 ? (
          data.items.map((item) => (
            <div key={item.id || item.name} className="crm-top-volume-card__row">
              <div className="crm-top-volume-card__left">
                <div 
                  className="crm-top-volume-card__avatar" 
                  style={{ backgroundColor: item.bg }}
                >
                  <span 
                    className="crm-top-volume-card__avatar-icon"
                    style={{ color: item.iconColor }}
                  >
                    {item.icon || '🛒'}
                  </span>
                </div>
                <div className="crm-top-volume-card__text">
                  <div className="crm-top-volume-card__name">{item.name}</div>
                  <div className="crm-top-volume-card__brand">{item.brand}</div>
                </div>
              </div>
              <div className="crm-top-volume-card__right">
                <div className="crm-top-volume-card__volume">{formatVolume(Number(item.volume || 0))}</div>
                <div 
                  className={`crm-top-volume-card__change ${item.changePct >= 0 ? 'positive' : 'negative'}`}
                >
                  {formatChangePct(Number(item.changePct || 0))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="crm-top-volume-card__empty">No data</div>
        )}
      </div>
    </section>
  );
}
