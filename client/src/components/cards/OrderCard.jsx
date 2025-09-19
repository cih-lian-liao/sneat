import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderCard.css";

// 移除未使用的 formatNumber 函數

export default function OrderCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let alive = true;
    
    (async () => {
      try {
        setLoading(true);
        const API_BASE = 'http://localhost:54112';
        const res = await axios.get(`${API_BASE}/api/orderchart`, {
          timeout: 10000,
          signal: controller.signal
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

  // 計算當前值和變化趨勢
  const currentValue = data?.values?.[data.values.length - 1] || 0;
  const previousValue = data?.values?.[data.values.length - 2] || 0;
  const changePct = previousValue > 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;
  const isUp = changePct >= 0;
  
  // 格式化顯示值 - 根據附圖顯示 276k
  const formatDisplayValue = (value) => {
    if (value >= 1000) {
      return `${Math.round(value / 1000)}k`;
    }
    return value.toString();
  };

  // 生成 SVG 線圖數據
  const generateChartPath = () => {
    if (!data?.values || data.values.length === 0) return "";
    
    const values = data.values;
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;
    
    const width = 200;
    const height = 60;
    const padding = 5;
    
    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * (width - 2 * padding) + padding;
      const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };
  
  // 獲取最後一個數據點的座標
  const getLastPointCoords = () => {
    if (!data?.values || data.values.length === 0) return { x: 195, y: 30 };
    
    const values = data.values;
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;
    
    const width = 200;
    const height = 60;
    const padding = 5;
    
    const x = width - padding;
    const y = height - padding - ((values[values.length - 1] - minValue) / range) * (height - 2 * padding);
    
    return { x, y };
  };

  return (
    <section className="card card--order-analysis order-card">
      <div className="order-card__content">
        <div className="order-card__header">
          <div className="order-card__title">Order</div>
        </div>
        
        <div className="order-card__value">
          {(() => {
            if (loading) return "—";
            if (err) return "—";
            return formatDisplayValue(currentValue);
          })()}
        </div>
        
        <div className="order-card__chart">
          <svg width="200" height="60" viewBox="0 0 200 60" className="order-chart">
            <defs>
              <linearGradient id="orderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05"/>
              </linearGradient>
            </defs>
            
            {/* 填充區域 */}
            <path
              d={`${generateChartPath()} L 195,60 L 5,60 Z`}
              fill="url(#orderGradient)"
              className="order-chart__area"
            />
            
            {/* 線條 */}
            <path
              d={generateChartPath()}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              className="order-chart__line"
            />
            
            {/* 最後一個數據點 */}
            {data?.values && data.values.length > 0 && (() => {
              const coords = getLastPointCoords();
              return (
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="4"
                  fill="#22c55e"
                  className="order-chart__point"
                />
              );
            })()}
          </svg>
        </div>
        
        <div className={`order-card__delta ${isUp ? "is-up" : "is-down"}`}>
          {loading || err ? "—" : (
            <>
              <span className="order-card__arrow">{isUp ? "↑" : "↓"}</span>
              <span>{Math.abs(changePct).toFixed(1)}%</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
