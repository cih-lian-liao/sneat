import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./PaymentsCard.css";

function formatCurrency(amount, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  } catch { return `$${(Number(amount) || 0).toLocaleString()}`; }
}

// PayPal 風格的圖標組件
function PayPalIcon() {
  return (
    <div className="payments-icon">
      <div className="payments-icon__background">
        <span className="payments-icon__letter">P</span>
      </div>
    </div>
  );
}

// 變化指示器組件
function ChangeIndicator({ changePct, changeType }) {
  const isIncrease = changeType === 'increase';
  
  return (
    <div className={`change-indicator ${isIncrease ? 'increase' : 'decrease'}`}>
      <svg 
        className="change-indicator__arrow" 
        width="12" 
        height="12" 
        viewBox="0 0 12 12"
        style={{ transform: isIncrease ? 'rotate(0deg)' : 'rotate(180deg)' }}
      >
        <path d="M6 2L10 8H2L6 2Z" fill="currentColor" />
      </svg>
      <span className="change-indicator__text">{changePct}%</span>
    </div>
  );
}

export default function PaymentsCard() {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:8080';
        const res = await axios.get(`${API_BASE}/api/payments`, {
          timeout: 10000,
          signal: controller.signal,
        });
        if (!alive) return;
        setCardData(res.data || {});
        setErr("");
      } catch (e) {
        if (!alive) return;
        if (
          axios.isCancel?.(e) ||
          e.code === "ERR_CANCELED" ||
          e.message === "canceled"
        )
          return;
        setErr(e?.response?.data?.error || e?.message || "Network error");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <section className="card card--payments payments-card">
        <div className="loading">載入中...</div>
      </section>
    );
  }

  if (err) {
    return (
      <section className="card card--payments payments-card">
        <div className="error">載入失敗: {err}</div>
      </section>
    );
  }

  if (!cardData) {
    return (
      <section className="card card--payments payments-card">
        <div className="no-data">暫無數據</div>
      </section>
    );
  }

  // 調試信息
  console.log('PaymentsCard data:', cardData);

  return (
    <section className="card card--payments payments-card">
      <div className="payments-card__header">
        <PayPalIcon />
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
          {formatCurrency(cardData.totalAmount, cardData.currency)}
        </div>
        <ChangeIndicator 
          changePct={cardData.changePct} 
          changeType={cardData.changeType} 
        />
      </div>
    </section>
  );
}


