import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend,
} from "chart.js";
import "./OrderMiniCard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function formatK(n) {
  const num = Number(n) || 0;
  const abs = Math.abs(num);
  if (abs >= 1000) {
    const decimals = abs >= 100000 ? 0 : 1;
    return `${(num / 1000).toFixed(decimals)}k`;
  }
  return `${num}`;
}

export default function OrderMiniCard() {
  const [series, setSeries] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController(); let alive = true;
    (async () => {
      try {
        setLoading(true);
        const API_BASE = "http://127.0.0.1:8080";
        const res = await axios.get(`${API_BASE}/api/orderchart`, {
          timeout: 10000, signal: controller.signal,
        });
        if (!alive) return;
        setSeries(res.data?.values ?? []);
        setTotal(res.data?.total ?? (res.data?.values ?? []).reduce((s, v) => s + (Number(v) || 0), 0));
        setErr("");
      } catch (e) {
        if (!alive) return;
        if (axios.isCancel?.(e) || e.code === "ERR_CANCELED" || e.message === "canceled") return;
        setErr(e?.response?.data?.error || e?.message || "Network error");
      } finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; controller.abort(); };
  }, []);

  // —— Chart data（迷你曲線，不顯示軸與格線） —— //
  const data = useMemo(() => {
    const labels = series.map((_, i) => String(i + 1)); // 迷你圖不顯示軸，label 無意義即可
    return {
      labels,
      datasets: [{
        data: series,
        borderColor: "#57C84D",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
        fill: true,
        backgroundColor: (ctx) => {
          const { chartArea, ctx: c } = ctx.chart;
          if (!chartArea) return "rgba(87,200,77,0.12)";
          const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          g.addColorStop(0, "rgba(87,200,77,0.35)");
          g.addColorStop(1, "rgba(87,200,77,0.02)");
          return g;
        },
      }],
    };
  }, [series]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        displayColors: false,
        callbacks: { label: (ctx) => `${ctx.parsed.y.toLocaleString()}` }
      },
    },
    scales: {
      x: { display: false },
      y: { display: false, beginAtZero: true },
    },
    elements: {
      point: { hitRadius: 8 }, // 滑鼠更好 hover
    },
  }), []);

  return (
    <section className="card order-mini">
      <div className="order-mini__title">Order</div>
      <div className="order-mini__value">
        {loading ? "—" : err ? "—" : formatK(total)}
      </div>

      <div className="order-mini__sparkline">
        {loading || err || series.length === 0 ? (
          <div className="order-mini__placeholder" />
        ) : (
          <Line data={data} options={options} />
        )}
      </div>

      {/* 右下角結尾圓點（純視覺，加分） */}
      {!loading && !err && series.length > 0 && (
        <div className="order-mini__dot" />
      )}
    </section>
  );
}
