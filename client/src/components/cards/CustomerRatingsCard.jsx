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

  if (loading) return <section className="card card--ratings">載入中...</section>;
  if (error) return <section className="card card--ratings error">錯誤: {error}</section>;

  const { title = "Customer Ratings", rating = 4.0, changePoints = 5.0 } = data;
  const { months = [], current = [], previous = [] } = data.chartData || {};

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const empty = 5 - fullStars - (hasHalf ? 1 : 0);

  const maxVal = Math.max(1, ...current, ...previous);
  const points = (series) =>
    series.map((v, i) => {
      const x = (i / (series.length - 1)) * 100;
      const y = 100 - (v / maxVal) * 100;
      return `${x},${y}`;
    });

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
          </defs>
          {/* previous dashed */}
          <polyline
            points={points(previous).join(" ")}
            fill="none"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* current solid with shadow */}
          <polyline
            points={points(current).join(" ")}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            filter="url(#softShadow)"
          />
          {/* highlight dots */}
          {current.map((v, i) => (
            <circle
              key={i}
              cx={(i / (current.length - 1)) * 100}
              cy={100 - (v / maxVal) * 100}
              r={i === 2 || i === current.length - 1 ? 3.5 : 0}
              fill="#fff"
              stroke="#111827"
              strokeWidth={i === 2 ? 1 : 0}
            />
          ))}
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


