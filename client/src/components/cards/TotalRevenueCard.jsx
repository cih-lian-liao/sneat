import { useEffect, useMemo, useState } from "react";
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
    if (num === 0) return "$0";
    
    return new Intl.NumberFormat("en-US", { 
      style: "currency", 
      currency, 
      maximumFractionDigits: 1,
      notation: "compact"
    }).format(num);
  } catch (error) {
    console.error('formatCurrency error:', error);
    const num = Number(amount) || 0;
    return `$${(num / 1000).toFixed(1)}k`;
  }
}

// 增長儀表組件
function GrowthGauge({ percentage = 0 }) {
  try {
    // 安全的百分比值
    const safePercentage = Number(percentage) || 0;
    const circumference = 2 * Math.PI * 45; // 半圓周長
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (safePercentage / 100) * circumference;

    return (
      <div className="growth-gauge">
        <svg width="120" height="60" viewBox="0 0 120 60">
          {/* 背景圓弧 */}
          <path
            d="M 10 50 A 45 45 0 0 1 110 50"
            fill="none"
            stroke="#E3DDFD"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* 進度圓弧 */}
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
          {/* 漸變定義 */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7367F0" />
              <stop offset="100%" stopColor="#9C88FF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="growth-gauge__text">
          <div className="growth-gauge__percentage">{safePercentage}%</div>
          <div className="growth-gauge__label">Growth</div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('GrowthGauge error:', error);
    return <div className="growth-gauge">Error loading gauge</div>;
  }
}

// 收入卡片組件
function RevenueCard({ year, amount, icon, isActive = false }) {
  try {
    // 安全的默認值
    const safeIcon = icon || { type: 'dollar', color: '#7367F0' };
    const safeYear = year || 2024;
    const safeAmount = amount || 0;
    
    return (
      <div className={`revenue-card ${isActive ? 'is-active' : ''}`}>
        <div className="revenue-card__icon" style={{ backgroundColor: safeIcon.color }}>
          {safeIcon.type === 'dollar' ? '$' : '📊'}
        </div>
        <div className="revenue-card__content">
          <div className="revenue-card__year">{String(safeYear)}</div>
          <div className="revenue-card__amount">{formatCurrency(safeAmount)}</div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('RevenueCard error:', error);
    return <div className="revenue-card">Error loading card</div>;
  }
}

export default function TotalRevenueCard() {
  const [data, setData] = useState(null);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // 獲取可用年份
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:8080';
        const res = await axios.get(`${API_BASE}/api/totalrevenue`);
        // 從主要 API 獲取年份數據，而不是單獨的 years 端點
        if (res.data && res.data.year1 && res.data.year2) {
          setAvailableYears([res.data.year1.year, res.data.year2.year]);
        }
      } catch (e) {
        console.error('Failed to fetch years:', e);
      }
    };
    fetchYears();
  }, []);

  // 獲取數據
  useEffect(() => {
    const controller = new AbortController();
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const API_BASE = process.env.NODE_ENV === 'production' ? '/api' : 'http://127.0.0.1:8080/api';
        const res = await axios.get(`${API_BASE}/totalrevenue.json`, {
          timeout: 10000,
          signal: controller.signal,
        });
        if (!alive) return;
        setData(res.data);
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

  // 圖表數據
  const chartData = useMemo(() => {
    try {
      if (!data || !data.year1 || !data.year2) return null;

      // 確保 labels 和 data 都是有效的數組
      const labels = Array.isArray(data.year1.labels) ? data.year1.labels : [];
      const year1Data = Array.isArray(data.year1.netRevenue) ? data.year1.netRevenue : [];
      const year2Data = Array.isArray(data.year2.netRevenue) ? data.year2.netRevenue : [];

      return {
        labels: labels,
        datasets: [
          {
            label: String(data.year1.year || 'Year 1'),
            data: year1Data,
            backgroundColor: "#7367F0",
            borderRadius: 6,
            maxBarThickness: 20,
          },
          {
            label: String(data.year2.year || 'Year 2'),
            data: year2Data,
            backgroundColor: "#E3DDFD",
            borderRadius: 6,
            maxBarThickness: 20,
          },
        ],
      };
    } catch (error) {
      console.error('TotalRevenue chartData error:', error);
      return null;
    }
  }, [data]);

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
            try {
              const value = ctx.parsed?.y || 0;
              const label = ctx.dataset?.label || 'Unknown';
              return `${label}: ${formatCurrency(value)}`;
            } catch (error) {
              console.error('Tooltip callback error:', error);
              return 'Error';
            }
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
          callback: (v) => {
            try {
              return formatCurrency(v);
            } catch (error) {
              console.error('Y-axis callback error:', error);
              return String(v || 0);
            }
          }
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
        
        {/* 年份選擇器 */}
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
        {/* 左側：圖表區域 */}
        <div className="total-revenue__chart-section">
          <div className="chart-container">
            {chartData ? <Bar data={chartData} options={chartOptions} /> : <div>載入圖表中...</div>}
          </div>
        </div>

        {/* 右側：增長儀表和收入卡片 */}
        <div className="total-revenue__stats-section">
          {/* 增長儀表 */}
          <div className="growth-section">
            <GrowthGauge percentage={data?.growthPercentage || 0} />
            <div className="company-growth">
              <span className="company-growth__percentage">{data?.growthPercentage || 0}%</span>
              <span className="company-growth__text">Company Growth</span>
            </div>
          </div>

          {/* 收入卡片 */}
          <div className="revenue-cards">
            {data?.year1 && (
              <RevenueCard
                year={data.year1.year}
                amount={data.year1.total || 0}
                icon={{ type: 'dollar', color: '#7367F0' }}
                isActive={true}
              />
            )}
            {data?.year2 && (
              <RevenueCard
                year={data.year2.year}
                amount={data.year2.total || 0}
                icon={{ type: 'chart', color: '#E3DDFD' }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}