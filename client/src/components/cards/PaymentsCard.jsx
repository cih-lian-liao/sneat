import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./PaymentsCard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function formatCurrency(amount, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  } catch { return `$${(Number(amount) || 0).toLocaleString()}`; }
}

export default function PaymentsCard() {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [colors, setColors] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController(); let alive = true;
    (async () => {
      try {
        setLoading(true);
        const API_BASE = "http://127.0.0.1:8080";
        const res = await axios.get(`${API_BASE}/api/payments`, { timeout: 10000, signal: controller.signal });
        if (!alive) return;
        setLabels(res.data?.labels ?? []);
        setValues(res.data?.values ?? []);
        setColors(res.data?.colors ?? []);
        setCurrency(res.data?.currency ?? "USD");
        setErr("");
      } catch (e) {
        if (!alive) return;
        if (axios.isCancel?.(e) || e.code === "ERR_CANCELED" || e.message === "canceled") return;
        setErr(e?.response?.data?.error || e?.message || "Network error");
      } finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; controller.abort(); };
  }, []);

  const total = useMemo(() => values.reduce((s, v) => s + (Number(v) || 0), 0), [values]);

  const data = useMemo(() => ({
    labels,
    datasets: [{ data: values, backgroundColor: colors.length ? colors : ["#7367F0", "#FF9F43", "#28C76F", "#EA5455"] }],
  }), [labels, values, colors]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",
    plugins: { legend: { display: false }, tooltip: { bodyFont: { size: 11 } } },
  }), []);

  return (
    <section className="card card--payments payments-card">
      <header className="card__header">Payments</header>

      <div className="payments-card__body">
        <div className="payments-card__donut">
          {loading || err ? <div className="placeholder" /> : <Doughnut data={data} options={options} />}
          {!loading && !err && (
            <div className="payments-card__center">
              <div className="payments-card__sum">{formatCurrency(total, currency)}</div>
              <div className="payments-card__label">Total</div>
            </div>
          )}
        </div>

        <ul className="payments-card__legend">
          {(labels || []).map((label, i) => (
            <li key={label} className="legend__item">
              <span className="legend__dot" style={{ background: colors[i] || "#ccc" }} />
              <span className="legend__text">{label}</span>
              <span className="legend__value">{formatCurrency(values[i], currency)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


