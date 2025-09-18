import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navs = [
    { to: "/analytics", label: "Analytics" },
    { to: "/crm", label: "CRM" },
    { to: "/ecommerce", label: "eCommerce" },
  ];

  return (
    <nav className="sidenav">
      <div className="sidenav__brand">
        <div className="fake-logo" />
        <span className="brand-name">Sneat Clone</span>
      </div>

      <ul className="sidenav__list">
        {navs.map((n) => (
          <li key={n.to}>
            <NavLink
              to={n.to}
              className={({ isActive }) =>
                "sidenav__link" + (isActive ? " is-active" : "")
              }
              end
            >
              {n.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
