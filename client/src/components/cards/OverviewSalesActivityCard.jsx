import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OverviewSalesActivityCard.css";

export default function OverviewSalesActivityCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/dashboard?card=overviewActivity');
        setData(res.data || {});
        setError('');
      } catch (e) {
        setError(e.message);
        setData({
          title: 'Overview & Sales Activity',
          subtitle: 'Check out each column for more details',
          months: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
          primary: [92,78,85,88,72,98,83],
          secondary: [35,28,42,48,33,52,41]
        });
        setError('');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <section className="card card--overview">載入中...</section>;
  if (error) return <section className="card card--overview error">錯誤: {error}</section>;

  const { title, subtitle, months = [], primary = [], secondary = [] } = data;
  const maxVal = Math.max(1, ...primary, ...secondary);

  return (
    <section className="card card--overview">
      <header className="overview__header">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </header>

      <div className="overview__columns">
        {months.map((m, i) => {
          const p = primary[i] ?? 0;
          const s = secondary[i] ?? 0;
          const pH = (p / maxVal) * 100;
          const sH = (s / maxVal) * 40 + 20; // 次要柱高度相對較短
          return (
            <div key={m} className="col">
              <div className="bars">
                <div className="bar bar--primary" style={{ height: `${pH}%` }}></div>
                <div className="bar bar--secondary" style={{ height: `${sH}%` }}></div>
              </div>
              <div className="label">{m}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


