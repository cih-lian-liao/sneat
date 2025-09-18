import "./Ecommerce.css";

export default function Ecommerce() {
  return (
    <div className="ecom-grid">
      {/* Row 1 */}
      <section className="card card--congrats">
        <div className="congrats">
          <div className="congrats__text">
            <h2>Congratulations Katie! 🎉</h2>
            <p>Best seller of the month</p>
            <div className="congrats__kpi">
              <strong>$48.9k</strong>
              <span>78% of target</span>
            </div>
            <button className="btn">VIEW SALES</button>
          </div>
          <img
            className="congrats__img"
            src="https://greakproject.vercel.app/images/misc/trophy.png"
            alt="Best seller illustration"
          />
        </div>
      </section>

      <section className="card card--visitors">
        <header className="card__header">New Visitors Activity</header>
        <div className="chart-box">{/* <VisitorsChart /> */}</div>
      </section>

      {/* Row 2 */}
      <section className="card card--sales">
        <header className="card__header">Sales</header>
        <div className="chart-box">{/* <SalesMini /> */}</div>
      </section>

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
