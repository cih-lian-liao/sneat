import "./App.css";
import DashboardLayout from './layout/DashboardLayout';

export default function App() {
  // 固定 Sidebar / ToolBar，主內容用 <Outlet />
  return <DashboardLayout />;
}
