import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerRatingsCard.css";

export default function CustomerRatingsCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/dashboard?card=customerRatings");
        setData(res.data || {});
        setError("");
      } catch (e) {
        setError(e.message);
        setData({
          title: "Customer Ratings",
          rating: 4.0,
          changePoints: 5.0,
          chartData: {
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            current: [2.2, 1.8, 4.1, 3.2, 3.4, 2.1, 4.5],
            previous: [1.6, 2.4, 2.2, 1.9, 1.7, 1.5, 2.0],
          },
        });
        setError("");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <section className="card card--ratings">Loading...</section>;
  if (error) return <section className="card card--ratings error">錯誤: {error}</section>;

  const { title = "Customer Ratings", rating = 4.0, changePoints = 5.0 } = data;
  const { months = [], current = [] } = data.chartData || {};

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const empty = 5 - fullStars - (hasHalf ? 1 : 0);

  const maxVal = Math.max(1, ...current);
  const getPoints = (series) =>
    series.map((v, i) => {
      const x = (i / (series.length - 1 || 1)) * 100;
      const y = 100 - (v / maxVal) * 100;
      return { x, y };
    });

  // 以 Catmull-Rom 轉貝茲曲線，製作平滑單條曲線
  const buildSmoothPath = (series) => {
    const pts = getPoints(series);
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x},${pts[0].y}`;
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[0];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i + 2 < pts.length ? pts[i + 2] : p2;
      // Catmull-Rom to Bezier
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  };

  return (
    <section className="card card--ratings">
      <header className="ratings__header">
        <h3>{title}</h3>
        <button className="dot-btn" aria-label="menu">⋯</button>
      </header>

      <div className="ratings__main">
        <div className="ratings__value">{rating.toFixed(1)}</div>
        <div className="ratings__stars">
          {Array.from({ length: fullStars }).map((_, i) => (
            <span key={`s${i}`}>⭐</span>
          ))}
          {hasHalf && <span>⭐</span>}
          {Array.from({ length: empty }).map((_, i) => (
            <span key={`e${i}` } className="star--empty">☆</span>
          ))}
        </div>
      </div>

      <div className="ratings__delta">
        <span className="badge">+{changePoints.toFixed(1)}</span>
        <span className="delta-text">Points from last month</span>
      </div>

      <div className="ratings__chart">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#8b5cf6" floodOpacity="0.15" />
            </filter>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* 填充區域 */}
          <path
            d={`${buildSmoothPath(current)} L 100,100 L 0,100 Z`}
            fill="url(#lineGrad)"
            stroke="none"
          />
          {/* 單條平滑曲線 */}
          <path
            d={buildSmoothPath(current)}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            filter="url(#softShadow)"
          />
          {/* 兩個重點節點：三月黑環、最後一個紫點 */}
          {current.length > 0 && (
            <>
              <circle cx={(2 / (current.length - 1)) * 100} cy={100 - (current[2] / maxVal) * 100} r="4" fill="#fff" stroke="#000" strokeWidth="1" />
              <circle cx={100} cy={100 - (current[current.length - 1] / maxVal) * 100} r="4" fill="#6366f1" stroke="#fff" strokeWidth="2" />
            </>
          )}
        </svg>
        <div className="ratings__labels">
          {months.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
    </section>
  );
}


