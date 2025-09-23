import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SessionsCard.css";

export default function SessionsCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/dashboard?card=sessions');
        setData(res.data || {});
        setError('');
      } catch (e) {
        setError(e.message);
        setData({
          title: 'Sessions', total: 2845,
          chartData: [40,36,30,30,24,28,42,60,58,62,55,85].map(v=>({value:v}))
        });
        setError('');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <section className="card card--sessions">載入中...</section>;
  if (error) return <section className="card card--sessions error">錯誤: {error}</section>;

  const { title='Sessions', total=0, chartData=[] } = data;
  const series = chartData.map(d=>d.value);
  const maxVal = Math.max(1, ...series);

  const buildPath = () => {
    if (series.length === 0) return '';
    const pts = series.map((v,i)=>({ x: (i/(series.length-1))*100, y: 100 - (v/maxVal)*100 }));
    let d = `M ${pts[0].x},${pts[0].y}`;
    for(let i=0;i<pts.length-1;i++){
      const p0 = i>0?pts[i-1]:pts[0];
      const p1 = pts[i];
      const p2 = pts[i+1];
      const p3 = i+2<pts.length?pts[i+2]:p2;
      const cp1x = p1.x + (p2.x - p0.x)/6;
      const cp1y = p1.y + (p2.y - p0.y)/6;
      const cp2x = p2.x - (p3.x - p1.x)/6;
      const cp2y = p2.y - (p3.y - p1.y)/6;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  };

  const lastX = 100;
  const lastY = series.length? (100 - (series[series.length-1]/maxVal)*100) : 100;

  return (
    <section className="card card--sessions">
      <div className="sessions__title">{title}</div>
      <div className="sessions__value">{total}</div>
      <div className="sessions__chart">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sessFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDBA26" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FDBA26" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${buildPath()} L 100,100 L 0,100 Z`} fill="url(#sessFill)" stroke="none" />
          <path d={buildPath()} fill="none" stroke="#FDA214" strokeWidth="2.5" />
          <circle cx={lastX} cy={lastY} r="4" fill="#fff" stroke="#FDA214" strokeWidth="2" />
        </svg>
      </div>
    </section>
  );
}


