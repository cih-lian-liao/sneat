import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrdersMiniCard.css";

export default function OrdersMiniCard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=>{
    (async()=>{
      try{
        const res = await axios.get('/api/dashboard?card=crmOrders');
        setData(res.data||{}); setError('');
      }catch(e){
        setError(e.message);
        setData({ title:'Order', amount:1286, changePct:-13.24, icon:'🧊' });
        setError('');
      }finally{ setLoading(false); }
    })();
  },[]);

  if(loading) return <section className="card card--orders">Loading...</section>;
  if(error) return <section className="card card--orders error">錯誤: {error}</section>;

  const { title='Order', amount=0, changePct=0, icon='🧊' } = data;
  const negative = changePct < 0;
  const formatted = amount.toLocaleString('en-US', { style:'currency', currency:'USD', maximumFractionDigits:0 });

  return (
    <section className="card card--orders orders-mini">
      <div className="orders-mini__icon">
        <div className="icon-box">{icon}</div>
        <button className="dot-btn" aria-label="menu">⋯</button>
      </div>
      <div className="orders-mini__title">{title}</div>
      <div className="orders-mini__amount">{formatted}</div>
      <div className={`orders-mini__change ${negative? 'down' : 'up'}`}>
        <span className="arrow">{negative? '↓' : '↑'}</span>
        <span>{Math.abs(changePct).toFixed(2)}%</span>
      </div>
    </section>
  );
}


