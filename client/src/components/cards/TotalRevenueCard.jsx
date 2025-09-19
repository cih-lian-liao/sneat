import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./TotalRevenueCard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function formatCurrency(amount, currency = "USD") {
  try {
    const num = Number(amount) || 0;
    if (num >= 1000) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 1,
        notation: "compact"
      }).format(num);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0
    }).format(num);
  } catch {
    const num = Number(amount) || 0;
    return `$${(num / 1000).toFixed(1)}k`;
  }
}

// 增長儀表盤組件
function GrowthGauge({ percentage = 0 }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="growth-gauge">
      <svg width="120" height="60" viewBox="0 0 120 60">
        <path 
          d="M 10 50 A 45 45 0 0 1 110 50" 
          fill="none" 
          stroke="#E3DDFD" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
        <path 
          d="M 10 50 A 45 45 0 0 1 110 50" 
          fill="none" 
          stroke="url(#gradient)" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7367F0" />
            <stop offset="100%" stopColor="#9C88FF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="growth-gauge__text">
        <div className="growth-gauge__percentage">{percentage}%</div>
        <div className="growth-gauge__label">Growth</div>
      </div>
    </div>
  );
}

// 收入卡片組件
function RevenueCard({ year, amount, icon, isActive = false }) {
  return (
    <div className={`revenue-card ${isActive ? 'is-active' : ''}`}>
      <div className="revenue-card__icon" style={{ backgroundColor: icon.color }}>
        {icon.type === 'dollar' ? '$' : '📊'}
      </div>
      <div className="revenue-card__content">
        <div className="revenue-card__year">{year}</div>
        <div className="revenue-card__amount">{formatCurrency(amount)}</div>
      </div>
    </div>
  );
}

export default function TotalRevenueCard() {
  const [data, setData] = useState(null);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const API_BASE = '';
        const res = await axios.get(`${API_BASE}/api/totalrevenue.json`);
        if (res.data) {
          const years = [];
          if (res.data.year1) years.push(res.data.year1.year);
          if (res.data.year2) years.push(res.data.year2.year);
          if (res.data.year3) years.push(res.data.year3.year);
          const sortedYears = [...years].sort((a, b) => b - a);
          setAvailableYears(sortedYears);
          if (sortedYears.length > 0) {
            setSelectedYear(sortedYears[0]);
          }
        }
      } catch (e) {
        console.error('Failed to fetch years:', e);
      }
    };
    fetchYears();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const API_BASE = '';
        const res = await axios.get(`${API_BASE}/api/totalrevenue.json`, {
          timeout: 10000,
          signal: controller.signal,
        });
        if (!alive) return;
        setData(res.data || {});
        setErr("");
      } catch (e) {
        if (!alive) return;
        if (axios.isCancel?.(e) || e.code === "ERR_CANCELED" || e.message === "canceled") return;
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

  const chartData = useMemo(() => {
    if (!data) return null;

    let year1Data, year2Data, labels;
    
    if (selectedYear === 2025 && data.year3) {
      year1Data = data.year3.netRevenue || [];
      year2Data = data.year2.netRevenue || [];
      labels = data.year3.labels || [];
    } else if (selectedYear === 2024 && data.year1) {
      year1Data = data.year1.netRevenue || [];
      year2Data = data.year2.netRevenue || [];
      labels = data.year1.labels || [];
    } else {
      year1Data = data.year1?.netRevenue || [];
      year2Data = data.year2?.netRevenue || [];
      labels = data.year1?.labels || [];
    }

    return {
      labels: labels,
      datasets: [
        {
          label: selectedYear.toString(),
          data: year1Data,
          backgroundColor: "#7367F0",
          borderRadius: 6,
          maxBarThickness: 20,
        },
        {
          label: (selectedYear - 1).toString(),
          data: year2Data,
          backgroundColor: "#E3DDFD",
          borderRadius: 6,
          maxBarThickness: 20,
        },
      ],
    };
  }, [data, selectedYear]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        }
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed?.y || 0;
            const label = ctx.dataset?.label || 'Unknown';
            return `${label}: ${formatCurrency(value)}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: false,
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#666" }
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.06)", drawBorder: false },
        ticks: {
          color: "#666",
          callback: (v) => formatCurrency(v)
        }
      },
    },
  }), []);

  if (loading) {
    return (
      <section className="card card--total-revenue">
        <div className="loading">載入中...</div>
      </section>
    );
  }

  if (err) {
    return (
      <section className="card card--total-revenue">
        <div className="error">載入失敗: {err}</div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="card card--total-revenue">
        <div className="no-data">暫無數據</div>
      </section>
    );
  }

  return (
    <section className="card card--total-revenue total-revenue">
      <div className="total-revenue__header">
        <h3 className="card__title">Total Revenue</h3>
        <div className="year-selector">
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="year-selector__dropdown"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="total-revenue__content">
        <div className="total-revenue__chart-section">
          <div className="chart-container">
            {chartData ? <Bar data={chartData} options={chartOptions} /> : <div>載入圖表中...</div>}
          </div>
        </div>

        <div className="total-revenue__stats-section">
          <div className="growth-section">
            <GrowthGauge percentage={data?.growthPercentage || 0} />
            <div className="company-growth">
              <span className="company-growth__percentage">{data?.companyGrowthPercentage || 0}%</span>
              <span className="company-growth__text">Company Growth</span>
            </div>
          </div>

          <div className="revenue-cards">
            {data?.year1 && (
              <RevenueCard
                year={data.year1.year}
                amount={data.year1.total || 0}
                icon={{ type: 'dollar', color: '#7367F0' }}
                isActive={selectedYear === data.year1.year}
              />
            )}
            {data?.year2 && (
              <RevenueCard
                year={data.year2.year}
                amount={data.year2.total || 0}
                icon={{ type: 'chart', color: '#E3DDFD' }}
                isActive={selectedYear === data.year2.year}
              />
            )}
            {data?.year3 && (
              <RevenueCard
                year={data.year3.year}
                amount={data.year3.total || 0}
                icon={{ type: 'dollar', color: '#7367F0' }}
                isActive={selectedYear === data.year3.year}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}