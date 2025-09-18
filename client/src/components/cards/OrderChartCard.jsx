// client/src/components/cards/OrderChartCard.jsx
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import OrderChart from "../charts/OrderChart";
import "./OrderChartCard.css";

function formatK(n) {
  const num = Number(n) || 0;
  const sign = num < 0 ? "-" : "";
  const abs = Math.abs(num);
  if (abs >= 1000) {
    const decimals = abs >= 100000 ? 0 : 1;
    return `${sign}${(abs / 1000).toFixed(decimals)}k`;
  }
  return `${sign}${abs}`;
}

export default function OrderChartCard({ height = 200 }) {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const total = useMemo(
    () => values.reduce((s, v) => s + (Number(v) || 0), 0),
    [values]
  );

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:8080';
        const res = await axios.get(`${API_BASE}/api/orderchart`, {
          timeout: 10000,
          signal: controller.signal,
        });
        if (!alive) return;
        setLabels(res.data?.labels ?? []);
        setValues(res.data?.values ?? []);
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

  return (
    <section className="card card--order-analysis">
      <header className="card__header">Order</header>
      <p
        className={`card__kpi${loading ? " card__kpi--loading" : ""}${
          err ? " card__kpi--error" : ""
        }`}
      >
        {loading ? "計算中…" : err ? "—" : `${formatK(total)}`}
      </p>

      <div className="chart-box" style={{ minHeight: height }}>
        {loading ? (
          <div>Loading…</div>
        ) : err ? (
          <div style={{ color: "tomato" }}>{err}</div>
        ) : labels.length === 0 ? (
          <div>目前沒有資料</div>
        ) : (
          <OrderChart labels={labels} values={values} height={height} />
        )}
      </div>
    </section>
  );
}
