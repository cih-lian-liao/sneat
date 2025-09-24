import React from "react";
import "./Ecommerce.css";
import NewVisitorsCard from "../components/cards/NewVisitorsCard";
import ActivityCard from "../components/cards/ActivityCard";
import EcomSalesStatCard from "../components/cards/EcomSalesStatCard";
import EcomProfitCard from "../components/cards/EcomProfitCard";
import EcomExpensesCard from "../components/cards/EcomExpensesCard";
import EcomTransactionsCard from "../components/cards/EcomTransactionsCard";
import EcomTotalIncomeCard from "../components/cards/EcomTotalIncomeCard";
import EcomPerformanceCard from "../components/cards/EcomPerformanceCard";
import EcomConversionRateCard from "../components/cards/EcomConversionRateCard";

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

      <EcomProfitCard />

      <EcomExpensesCard />

      <EcomTransactionsCard />

      <EcomTotalIncomeCard />

      {/* Row 3 */}
      <EcomPerformanceCard />

      <EcomConversionRateCard />

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
