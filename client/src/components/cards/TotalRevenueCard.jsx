import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./TotalRevenueCard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function formatCurrency(amount, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    const num = Number(amount) || 0;
    return `$${num.toLocaleString()}`;
  }
}

export default function TotalRevenueCard() {
  const [labels, setLabels] = useState([]);
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController(); let alive = true;
    (async () => {
      try {
        setLoading(true);
        const API_BASE = "http://127.0.0.1:8080";
        const res = await axios.get(`${API_BASE}/api/totalrevenue`, { timeout: 10000, signal: controller.signal });
        if (!alive) return;
        setLabels(res.data?.labels ?? []);
        setIncome(res.data?.income ?? []);
        setExpenses(res.data?.expenses ?? []);
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

  const totals = useMemo(() => {
    const sum = (arr) => arr.reduce((s, v) => s + (Number(v) || 0), 0);
    const incomeTotal = sum(income);
    const expensesTotal = sum(expenses);
    const profitTotal = incomeTotal - expensesTotal;
    return { incomeTotal, expensesTotal, profitTotal };
  }, [income, expenses]);

  const barData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: "Income",
        data: income,
        backgroundColor: "#7367F0",
        borderRadius: 6,
        maxBarThickness: 26,
      },
      {
        label: "Expenses",
        data: expenses,
        backgroundColor: "#E3DDFD",
        borderRadius: 6,
        maxBarThickness: 26,
      },
    ],
  }), [labels, income, expenses]);

  const barOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { displayColors: false } },
    scales: {
      x: { stacked: false, grid: { display: false }, border: { display: false } },
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.06)", drawBorder: false } },
    },
  }), []);

  const donutData = useMemo(() => {
    const values = [totals.incomeTotal, totals.expensesTotal, Math.max(totals.profitTotal, 0)];
    return {
      labels: ["Income", "Expenses", "Profit"],
      datasets: [{ data: values, backgroundColor: ["#7367F0", "#FF9F43", "#28C76F"] }],
    };
  }, [totals]);

  const donutOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
    cutout: "65%",
  }), []);

  return (
    <section className="card card--total-revenue total-revenue">
      <header className="card__header">Total Revenue</header>

      <div className="total-revenue__kpis">
        <div className="kpi">
          <div className="kpi__label">Income</div>
          <div className="kpi__value">{loading || err ? "—" : formatCurrency(totals.incomeTotal, currency)}</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Expenses</div>
          <div className="kpi__value">{loading || err ? "—" : formatCurrency(totals.expensesTotal, currency)}</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Profit</div>
          <div className="kpi__value">{loading || err ? "—" : formatCurrency(totals.profitTotal, currency)}</div>
        </div>
      </div>

      <div className="total-revenue__charts">
        <div className="total-revenue__bar">
          {loading || err ? <div className="placeholder" /> : <Bar data={barData} options={barOptions} />}
        </div>
        <div className="total-revenue__donut">
          {loading || err ? <div className="placeholder" /> : <Doughnut data={donutData} options={donutOptions} />}
        </div>
      </div>
    </section>
  );
}


