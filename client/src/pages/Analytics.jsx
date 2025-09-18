// client/src/pages/Analytics.jsx
import "./Analytics.css";
import OrderMiniCard from "../components/cards/OrderMiniCard";
import OrderChartCard from "../components/cards/OrderChartCard";
import SalesStatCard from "../components/cards/SalesStatCard";
import TotalRevenueCard from "../components/cards/TotalRevenueCard";
import PaymentsCard from "../components/cards/PaymentsCard";

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

      <OrderMiniCard />

      <SalesStatCard />

      {/* row-2 */}
      <TotalRevenueCard />

      <PaymentsCard />

      <section className="card card--revenue">
        <header className="card__header">Revenue</header>
        <div className="chart-box"></div>
      </section>

      <section className="card card--profit-report">
        <header className="card__header">Profit Report</header>
        <div className="chart-box"></div>
      </section>

      {/* row-3 */}
      <section className="card card--order-statistics">
        <header className="card__header">Order Statistics</header>
        <div className="chart-box"></div>
      </section>

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
    </div>
  );
}
