import React from "react";
import "./CRM.css";
import CustomerRatingsCard from "../components/cards/CustomerRatingsCard";
import OverviewSalesActivityCard from "../components/cards/OverviewSalesActivityCard";
import SessionsCard from "../components/cards/SessionsCard";
import OrdersMiniCard from "../components/cards/OrdersMiniCard";
import LeadsCard from "../components/cards/LeadsCard";
import TopProductsBySalesCard from "../components/cards/TopProductsBySalesCard";
import TopProductsByVolumeCard from "../components/cards/TopProductsByVolumeCard";
import EarningReportCard from "../components/cards/EarningReportCard";
import SalesAnalyticsCard from "../components/cards/SalesAnalyticsCard";
import SalesByCountriesCard from "../components/cards/SalesByCountriesCard";
import SalesStatsCard from "../components/cards/SalesStatsCard";
import TeamMembersCard from "../components/cards/TeamMembersCard";

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
      <LeadsCard />

      {/* row-2 */}
      <TopProductsBySalesCard />

      <TopProductsByVolumeCard />

      <EarningReportCard />

      {/* row-3 */}
      <SalesAnalyticsCard />

      <SalesByCountriesCard />

      <SalesStatsCard />

      {/* row-4 */}
      <TeamMembersCard />

      <section className="card card--customer-status">
        <header className="card__header">Customer • Amount • Status</header>
        <div className="chart-box">{/* <CustomerTable /> */}</div>
      </section>
    </div>
  );
}
