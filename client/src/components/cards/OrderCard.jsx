import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderCard.css";

export default function OrderCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 直接使用 localhost:54112，不依賴環境變量
        const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:54112';
        const res = await axios.get(`${API_BASE}/api/orderchart`);
        setData(res.data || {});
        setError('');
      } catch (error) {
        console.error('Error fetching order data:', error);
        setError(error.message);
        setData({});
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="card card--order-analysis order-card">
        <div>載入中...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card card--order-analysis order-card">
        <div style={{ color: 'red' }}>錯誤: {error}</div>
      </section>
    );
  }

  const values = data.values || [];
  const currentValue = values[values.length - 1] || 276000; // 默認值 276k
  const previousValue = values[values.length - 2] || 0;
  const changePct = previousValue > 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0;
  const isUp = changePct >= 0;

  // 格式化數值
  const formatValue = (value) => {
    if (value >= 1000) {
      return `${Math.round(value / 1000)}k`;
    }
    return value.toString();
  };

  // 生成波浪線圖數據
  const generateWaveData = () => {
    const points = 20;
    const width = 200;
    const height = 60;
    const amplitude = 15;
    const frequency = 0.3;
    
    let pathData = '';
    let maxY = 0;
    let maxX = 0;
    
    for (let i = 0; i <= points; i++) {
      const x = (i / points) * width;
      const baseY = height * 0.6; // 基礎高度
      const waveY = Math.sin(i * frequency) * amplitude;
      const trendY = (i / points) * 20; // 上升趨勢
      const y = baseY - waveY - trendY;
      
      if (i === 0) {
        pathData += `M ${x} ${y}`;
      } else {
        pathData += ` L ${x} ${y}`;
      }
      
      if (y < maxY || i === points) {
        maxY = y;
        maxX = x;
      }
    }
    
    return { pathData, maxX, maxY };
  };

  const { pathData, maxX, maxY } = generateWaveData();

  return (
    <section className="card card--order-analysis order-card">
      <div className="order-card__content">
        <div className="order-card__header">
          <div className="order-card__title">Order</div>
        </div>
        
        <div className="order-card__value">
          {formatValue(currentValue)}
        </div>
        
        <div className="order-card__chart">
          <svg className="order-chart" viewBox="0 0 200 60" preserveAspectRatio="none">
            {/* 漸變定義 */}
            <defs>
              <linearGradient id="orderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05"/>
              </linearGradient>
            </defs>
            
            {/* 填充區域 */}
            <path
              d={`${pathData} L 200 60 L 0 60 Z`}
              fill="url(#orderGradient)"
              className="order-chart__area"
            />
            
            {/* 波浪線 */}
            <path
              d={pathData}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="order-chart__line"
            />
            
            {/* 最高點圓圈標記 */}
            <circle
              cx={maxX}
              cy={maxY}
              r="4"
              fill="#22c55e"
              stroke="#ffffff"
              strokeWidth="2"
              className="order-chart__point"
            />
          </svg>
        </div>
        
        <div className={`order-card__delta ${isUp ? "is-up" : "is-down"}`}>
          <span className="order-card__arrow">{isUp ? "↑" : "↓"}</span>
          <span>{Math.abs(changePct).toFixed(1)}%</span>
        </div>
      </div>
    </section>
  );
}