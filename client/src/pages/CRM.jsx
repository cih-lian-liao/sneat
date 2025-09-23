import React from "react";
import "./CRM.css";
import CustomerRatingsCard from "../components/cards/CustomerRatingsCard";
import OverviewSalesActivityCard from "../components/cards/OverviewSalesActivityCard";
import SessionsCard from "../components/cards/SessionsCard";
import OrdersMiniCard from "../components/cards/OrdersMiniCard";

export default function CRM() {
  return (
    <div className="crm-grid">
      {/* row-1 */}
      <CustomerRatingsCard />

      <OverviewSalesActivityCard />

      {/* 右上兩張小卡 */}
      <SessionsCard />
      <OrdersMiniCard />

      {/* 右下單張 */}
      <section className="card card--leads">
        <header className="card__header">Generated Leads</header>
        <div className="chart-box">{/* <Leads /> */}</div>
      </section>

      {/* row-2 */}
      <section className="card card--top-sales">
        <header className="card__header">Top Products by Sales</header>
        <div className="chart-box">{/* <TopSales /> */}</div>
      </section>

      <section className="card card--top-volume">
        <header className="card__header">Top Products by Volume</header>
        <div className="chart-box">{/* <TopVolume /> */}</div>
      </section>

      <section className="card card--earning">
        <header className="card__header">Earning Report</header>
        <div className="chart-box">{/* <EarningReport /> */}</div>
      </section>

      {/* row-3 */}
      <section className="card card--sales-analytics">
        <header className="card__header">Sales Analytics</header>
        <div className="chart-box">{/* <SalesAnalytics /> */}</div>
      </section>

      <section className="card card--sales-countries">
        <header className="card__header">Sales by Countries</header>
        <div className="chart-box">{/* <SalesByCountries /> */}</div>
      </section>

      <section className="card card--sales-stats">
        <header className="card__header">Sales Stats</header>
        <div className="chart-box">{/* <SalesStats /> */}</div>
      </section>

      {/* row-4 */}
      <section className="card card--team">
        <header className="card__header">Team Members</header>
        <div className="chart-box">{/* <TeamMembers /> */}</div>
      </section>

      <section className="card card--customer-status">
        <header className="card__header">Customer • Amount • Status</header>
        <div className="chart-box">{/* <CustomerTable /> */}</div>
      </section>
    </div>
  );
}
