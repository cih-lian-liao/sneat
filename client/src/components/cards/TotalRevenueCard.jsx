import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./TotalRevenueCard.css";

function formatCurrency(amount, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    const num = Number(amount) || 0;
    return `$${num.toLocaleString()}`;
  }
}

export default function TotalRevenueCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:8080';
        const res = await axios.get(`${API_BASE}/api/totalrevenue`, {
          timeout: 10000,
          signal: controller.signal,
        });
        if (!alive) return;
        setData(res.data || {});
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

  // 計算總收入
  const totalRevenue = useMemo(() => {
    if (!data || !data.year1 || !data.year2) return 0;
    const year1Total = data.year1.total || 0;
    const year2Total = data.year2.total || 0;
    return year1Total + year2Total;
  }, [data]);

  // 計算增長百分比
  const growthPercentage = useMemo(() => {
    if (!data || !data.year1 || !data.year2) return 0;
    const year1Total = data.year1.total || 0;
    const year2Total = data.year2.total || 0;
    if (year2Total === 0) return 0;
    return ((year1Total - year2Total) / year2Total) * 100;
  }, [data]);

  const isUp = growthPercentage >= 0;

  return (
    <section className="card card--total-revenue">
      <header className="card__header">Total Revenue</header>
      <p
        className={`card__kpi${loading ? " card__kpi--loading" : ""}${
          err ? " card__kpi--error" : ""
        }`}
      >
        {loading ? "計算中…" : err ? "—" : formatCurrency(totalRevenue)}
      </p>
      
      <div className={`card__delta ${isUp ? "is-up" : "is-down"}`}>
        {loading || err ? "—" : (
          <>
            <span className="card__arrow">{isUp ? "↑" : "↓"}</span>
            <span>{Math.abs(growthPercentage).toFixed(1)}%</span>
          </>
        )}
      </div>
    </section>
  );
}