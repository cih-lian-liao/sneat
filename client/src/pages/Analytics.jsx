// client/src/pages/Analytics.jsx
import React from "react";
import "./Analytics.css";
import OrderCard from "../components/cards/OrderCard";
import SalesStatCard from "../components/cards/SalesStatCard";
import PaymentsCard from "../components/cards/PaymentsCard";
import TotalRevenueCard from "../components/cards/TotalRevenueCard";
import RevenueCard from "../components/cards/RevenueCard";
import ProfitReportCard from "../components/cards/ProfitReportCard";
import OrderStatisticsCard from "../components/cards/OrderStatisticsCard";
import IncomeExpenseCard from "../components/cards/IncomeExpenseCard";
import TransactionsCard from "../components/cards/TransactionsCard";
export default function Analytics() {
  return (
    <div className="analytics-grid">
      {/* row-1 */}
      <section className="card card--congrats">
        <div className="congrats">
          <div className="congrats__text">
            <h2>Congratulations John! 🎉</h2>
            <p>
              You have done 72% more sales today. <br />
              Check your new badge in your profile.
            </p>
            <button className="btn">VIEW BADGES</button>
          </div>
          <img
            className="congrats__img"
            src="https://greakproject.vercel.app/images/cards/illustration-john-light.png"
            alt="John earned a new badge"
          />
        </div>
      </section>

      <OrderCard />

      <SalesStatCard />

      {/* row-2 */}
      <TotalRevenueCard />

      <PaymentsCard />

      <RevenueCard />

      <ProfitReportCard />

      {/* row-3 */}
      <OrderStatisticsCard />

      <section className="card card--income-expense">
        <header className="card__header">Income vs Expense</header>
        <div className="chart-box"></div>
      </section>

      <section className="card card--transactions">
        <header className="card__header">Transactions</header>
        <div className="chart-box"></div>
      </section>

      {/* row-4 */}
      <section className="card card--timeline">
        <header className="card__header">Activity Timeline</header>
        <div className="chart-box"></div>
      </section>

      <section className="card card--visit-resources">
        <header className="card__header">Visit & Sources</header>
        <div className="chart-box"></div>
      </section>

      {/* row-5 - Income Expense 卡片 */}
      <IncomeExpenseCard />

      {/* row-6 - Transactions 卡片 */}
      <TransactionsCard />
    </div>
  );
}
