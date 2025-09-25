import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import logoUrl from "../../assets/logo-s.svg";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  // 小螢幕預設折疊
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    setCollapsed(mq.matches);
    const onChange = (e) => setCollapsed(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const navs = [
    { to: "/analytics", label: "Analytics", icon: "📊" },
    { to: "/crm", label: "CRM", icon: "📈" },
    { to: "/ecommerce", label: "eCommerce", icon: "🛒" },
  ];

  return (
    <nav className={"app-sidebar" + (collapsed ? " is-collapsed" : "") }>
      <div className="app-sidebar__brand">
        <img className="app-sidebar__logo" src={logoUrl} alt="Sneat Logo" />
        <span className="app-sidebar__brand-name">Sneat</span>
        <button
          className="app-sidebar__toggle"
          aria-label="Toggle sidebar"
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? "➤" : "◀"}
        </button>
      </div>

      <ul className="app-sidebar__nav">
        {navs.map((n) => (
          <li key={n.to} className="app-sidebar__item">
            <NavLink
              to={n.to}
              className={({ isActive }) =>
                "app-sidebar__link" + (isActive ? " is-active" : "")
              }
              end
            >
              <span className="app-sidebar__icon" aria-hidden>{n.icon}</span>
              <span className="app-sidebar__label">{n.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="app-sidebar__footer">
        <div className="app-sidebar__user">
          <img src="https://i.pravatar.cc/40?img=5" alt="User" />
          <div className="app-sidebar__user-info">
            <div className="app-sidebar__user-name">Lily Liao</div>
            <div className="app-sidebar__user-role">Admin</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
