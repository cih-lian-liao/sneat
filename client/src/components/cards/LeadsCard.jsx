import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LeadsCard.css";

export default function LeadsCard(){
  const [data,setData]=useState({});
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  useEffect(()=>{(async()=>{
    try{ const res=await axios.get('/api/dashboard?card=crmLeads'); setData(res.data||{}); setError(''); }
    catch(e){ setError(e.message); setData({ title:'Generated Leads', subtitle:'Monthly Report', total:4234, changePct:12.8, gaugePct:25 }); setError(''); }
    finally{ setLoading(false); }
  })();},[]);

  if(loading) return <section className="card card--leads">載入中...</section>;
  if(error) return <section className="card card--leads error">錯誤: {error}</section>;

  const { title='Generated Leads', subtitle='Monthly Report', total=0, changePct=0, gaugePct=25 } = data;
  const circumference = 2*Math.PI*36; // r=36 in viewBox space
  const dash = (gaugePct/100)*circumference;

  return (
    <section className="card card--leads leads-card">
      <div className="leads__left">
        <h3 className="leads__title">{title}</h3>
        <div className="leads__subtitle">{subtitle}</div>
        <div className="leads__total">{total.toLocaleString()}</div>
        <div className={`leads__change ${changePct>=0?'up':'down'}`}>
          <span className="arrow">{changePct>=0?'↑':'↓'}</span>
          <span>{Math.abs(changePct)}%</span>
        </div>
      </div>
      <div className="leads__gauge">
        <svg viewBox="0 0 100 100">
          <defs>
            <linearGradient id="leadsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#a3e635" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="36" fill="none" stroke="#e5f5df" strokeWidth="12" />
          <circle cx="50" cy="50" r="36" fill="none" stroke="url(#leadsGrad)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${dash} ${circumference}`} transform="rotate(-90 50 50)" />
          <text x="50" y="45" textAnchor="middle" className="gauge__value">{gaugePct}%</text>
          <text x="50" y="62" textAnchor="middle" className="gauge__label">Average</text>
        </svg>
      </div>
    </section>
  );
}


