import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EcomPerformanceCard.css';

const EcomPerformanceCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fallback = {
    title: 'Performance',
    metrics: {
      earning: 846.17,
      sales: 25.7
    },
    chartData: {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      income: [65, 45, 35, 25, 55, 70],
      earning: [80, 60, 40, 30, 70, 85]
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/dashboard?card=ecomPerformance');
        setData(res.data || fallback);
        setError('');
      } catch (err) {
        console.error('Error fetching ecom performance:', err);
        setData(fallback);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const card = data || fallback;
  const maxValue = Math.max(...card.chartData.income, ...card.chartData.earning);

  // Calculate radar chart points
  const calculatePoints = (values) => {
    const centerX = 50;
    const centerY = 50;
    const radius = 30;
    const angleStep = (2 * Math.PI) / values.length;
    
    return values.map((value, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const normalizedValue = value / maxValue;
      const x = centerX + Math.cos(angle) * radius * normalizedValue;
      const y = centerY + Math.sin(angle) * radius * normalizedValue;
      return { x, y };
    });
  };

  const incomePoints = calculatePoints(card.chartData.income);
  const earningPoints = calculatePoints(card.chartData.earning);

  // Create SVG path for polygon
  const createPath = (points) => {
    return points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';
  };

  if (loading) {
    return (
      <section className="card card--performance ecom-performance-card">
        <div className="ecom-performance-card__loading">載入中...</div>
      </section>
    );
  }

  if (error && !card) {
    return (
      <section className="card card--performance ecom-performance-card">
        <div className="ecom-performance-card__error">錯誤: {error}</div>
      </section>
    );
  }

  return (
    <section className="card card--performance ecom-performance-card">
      <div className="ecom-performance-card__header">
        <div className="ecom-performance-card__title">{card.title}</div>
        <button className="ecom-performance-card__more" aria-label="more">⋮</button>
      </div>

      <div className="ecom-performance-card__metrics">
        <div className="ecom-performance-card__metric">
          <span className="ecom-performance-card__metric-label">Earning:</span>
          <span className="ecom-performance-card__metric-value">${card.metrics.earning}</span>
        </div>
        <div className="ecom-performance-card__metric">
          <span className="ecom-performance-card__metric-label">Sales:</span>
          <span className="ecom-performance-card__metric-value">{card.metrics.sales}M</span>
        </div>
      </div>

      <div className="ecom-performance-card__chart">
        <svg className="ecom-performance-card__svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
            <circle
              key={`grid-${index}`}
              cx="50"
              cy="50"
              r={30 * scale}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.3"
            />
          ))}
          
          {/* Axis lines */}
          {card.chartData.months.map((_, index) => {
            const angle = (index * 2 * Math.PI) / card.chartData.months.length - Math.PI / 2;
            const x2 = 50 + Math.cos(angle) * 30;
            const y2 = 50 + Math.sin(angle) * 30;
            return (
              <line
                key={`axis-${index}`}
                x1="50"
                y1="50"
                x2={x2}
                y2={y2}
                stroke="#e5e7eb"
                strokeWidth="0.3"
              />
            );
          })}

          {/* Data polygons */}
          <path
            d={createPath(incomePoints)}
            fill="#6366f1"
            fillOpacity="0.25"
            stroke="#6366f1"
            strokeWidth="1.2"
          />
          <path
            d={createPath(earningPoints)}
            fill="#3b82f6"
            fillOpacity="0.35"
            stroke="#3b82f6"
            strokeWidth="1.2"
          />

          {/* Month labels */}
          {card.chartData.months.map((month, index) => {
            const angle = (index * 2 * Math.PI) / card.chartData.months.length - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 36;
            const y = 50 + Math.sin(angle) * 36;
            return (
              <text
                key={`label-${month}-${index}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="ecom-performance-card__month-label"
              >
                {month}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="ecom-performance-card__legend">
        <div className="ecom-performance-card__legend-item">
          <div className="ecom-performance-card__legend-dot ecom-performance-card__legend-dot--income"></div>
          <span className="ecom-performance-card__legend-label">Income</span>
        </div>
        <div className="ecom-performance-card__legend-item">
          <div className="ecom-performance-card__legend-dot ecom-performance-card__legend-dot--earning"></div>
          <span className="ecom-performance-card__legend-label">Earning</span>
        </div>
      </div>
    </section>
  );
};

export default EcomPerformanceCard;
