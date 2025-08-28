import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import ToolBar from "../components/ToolBar/ToolBar.jsx";
import "./dashboard-layout.css";

export default function DashboardLayout() {
  return (
    <div className="layout">
      <aside className="layout__sidebar">
        <Sidebar />
      </aside>

      <div className="layout__body">
        <header className="layout__header">
          <ToolBar />
        </header>

        <main className="layout__main" role="main">
          {/* 路由頁面會渲染在這 */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
