import React from "react";
import "./Ecommerce.css";
import NewVisitorsCard from "../components/cards/NewVisitorsCard";
import ActivityCard from "../components/cards/ActivityCard";
import EcomSalesStatCard from "../components/cards/EcomSalesStatCard";

export default function Ecommerce() {
  return (
    <div className="ecom-grid">
      {/* Row 1 */}
      <section className="card card--ecom-congrats ecom-congrats-card">
        <div className="ecom-congrats-card__grid">
          <div className="ecom-congrats-card__text">
            <h2 className="ecom-congrats-card__title">Congratulations Katie!</h2>
            <p className="ecom-congrats-card__subtitle">Best seller of the month</p>
            <div className="ecom-congrats-card__kpi">
              <strong className="ecom-congrats-card__amount">$48.9k</strong>
              <span className="ecom-congrats-card__note">78% of target</span>
            </div>
            <button className="ecom-congrats-card__button">VIEW SALES</button>
          </div>
          <img
            className="ecom-congrats-card__img"
            src="https://greakproject.vercel.app/images/misc/trophy.png"
            alt="Best seller illustration"
          />
        </div>
      </section>

      {/* New Visitors */}
      <NewVisitorsCard />

      {/* Activity */}
      <ActivityCard />

      {/* Row 2 */}
      <EcomSalesStatCard />

      <section className="card card--profit">
        <header className="card__header">Profit</header>
        <div className="chart-box">{/* <ProfitMini /> */}</div>
      </section>

      <section className="card card--expenses">
        <header className="card__header">Expenses</header>
        <div className="chart-box">{/* <ExpensesMini /> */}</div>
      </section>

      <section className="card card--transactions">
        <header className="card__header">Transactions</header>
        <div className="chart-box">{/* <TransactionsMini /> */}</div>
      </section>

      <section className="card card--total-income">
        <header className="card__header">Total Income Report</header>
        <div className="chart-box">{/* <TotalIncomeChart /> */}</div>
      </section>

      {/* Row 3 */}
      <section className="card card--performance">
        <header className="card__header">Performance</header>
        <div className="chart-box">{/* <PerformanceChart /> */}</div>
      </section>

      <section className="card card--conversion">
        <header className="card__header">Conversion Rate</header>
        <div className="chart-box">{/* <ConversionChart /> */}</div>
      </section>

      <section className="card card--rev-right">
        <header className="card__header">Revenue</header>
        <div className="chart-box">{/* <RevenueSpark /> */}</div>
      </section>

      <section className="card card--sales-right">
        <header className="card__header">Sales</header>
        <div className="chart-box">{/* <SalesSpark /> */}</div>
      </section>

      <section className="card card--exp-right">
        <header className="card__header">Expenses</header>
        <div className="chart-box">{/* <ExpensesSpark /> */}</div>
      </section>

      {/* Row 4 */}
      <section className="card card--product-table">
        <header className="card__header">Product / Category / Payment / Order Status</header>
        <div className="table-box">
          {/* <ProductTable /> 或多欄組合區塊 */}
        </div>
      </section>

      <section className="card card--total-balance">
        <header className="card__header">Total Balance</header>
        <div className="chart-box">{/* <BalanceDonut /> */}</div>
      </section>
    </div>
  );
}
