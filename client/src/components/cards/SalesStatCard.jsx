import { useEffect, useState } from "react";
import axios from "axios";
import "./SalesStatCard.css";

function formatCurrency(amount, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    // 後備：只做千分位與 $ 符號
    const num = Number(amount) || 0;
    return `$${num.toLocaleString()}`;
  }
}

export default function SalesStatCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController(); let alive = true;
    (async () => {
      try {
        setLoading(true);
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : '';
        const res = await axios.get(`${API_BASE}/api/salesstat.json`, {
          timeout: 10000, signal: controller.signal
        });
        if (!alive) return;
        setData(res.data || {});
        setErr("");
      } catch (e) {
        if (!alive) return;
        if (axios.isCancel?.(e) || e.code === "ERR_CANCELED" || e.message === "canceled") return;
        setErr(e?.response?.data?.error || e?.message || "Network error");
      } finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; controller.abort(); };
  }, []);

  // 顯示邏輯
  const title = "Sales";
  const amount = data?.total ?? 0;
  const currency = data?.currency ?? "USD";
  const changePct = 12.5; // 固定增長百分比
  const isUp = changePct >= 0;

  return (
    <section className="card card--sales-analysis sales-stat">
      <div className="sales-stat__row">
        <img
          className="sales-stat__icon"
          src={data?.iconUrl || "https://greakproject.vercel.app/images/cards/stats-vertical-wallet.png"}
          alt="wallet"
          width="40" height="40"
          loading="lazy"
        />
        <button className="sales-stat__more" aria-label="More actions">⋮</button>
      </div>

      <div className="sales-stat__title">{title}</div>

      <div className="sales-stat__value">
        {loading ? "—" : err ? "—" : formatCurrency(amount, currency)}
      </div>

      <div className={`sales-stat__delta ${isUp ? "is-up" : "is-down"}`}>
        {loading || err ? "—" : (
          <>
            <span className="sales-stat__arrow">{isUp ? "↑" : "↓"}</span>
            <span>{Math.abs(changePct).toFixed(2)}%</span>
          </>
        )}
      </div>
    </section>
  );
}
