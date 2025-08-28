import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Analytics from "./pages/Analytics.jsx";
import CRM from "./pages/CRM.jsx";
import Ecommerce from "./pages/Ecommerce.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // 內含固定 Sidebar/ToolBar 與 <Outlet />
    children: [
      { index: true, element: <Navigate to="analytics" replace /> }, // 預設導到 /analytics
      { path: "analytics", element: <Analytics /> },
      { path: "crm", element: <CRM /> },
      { path: "ecommerce", element: <Ecommerce /> },
      { path: "*", element: <div style={{ padding: 24 }}>Not Found</div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
