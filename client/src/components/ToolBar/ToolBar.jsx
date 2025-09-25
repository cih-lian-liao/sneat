import React, { useEffect, useState } from "react";
import "./ToolBar.css";

export default function ToolBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsSearchOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key === "/") setIsSearchOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="app-toolbar" role="toolbar" aria-label="Global toolbar">
      <div className="app-toolbar__search">
        <button
          className="app-toolbar__search-icon"
          aria-label="Open search"
          onClick={() => setIsSearchOpen(true)}
        >
          🔍
        </button>
        <input
          className="app-toolbar__search-input"
          type="search"
          placeholder="Search (Ctrl+/)"
          aria-label="Search"
          onFocus={() => setIsSearchOpen(true)}
        />
      </div>

      <div className="app-toolbar__spacer" />

      <div className="app-toolbar__actions">
        <button className="app-toolbar__action" aria-label="Language">
          <span className="app-toolbar__action-icon" aria-hidden>文</span>
        </button>
        <button className="app-toolbar__action" aria-label="Theme">
          <span className="app-toolbar__action-icon" aria-hidden>☾</span>
        </button>
        <button className="app-toolbar__action" aria-label="Apps">
          <span className="app-toolbar__action-icon" aria-hidden>▦</span>
        </button>
        <button className="app-toolbar__action app-toolbar__action--notification" aria-label="Notifications">
          <span className="app-toolbar__action-icon" aria-hidden>🔔</span>
          <span className="app-toolbar__badge" aria-hidden />
        </button>
        <div className="app-toolbar__user">
          <img src="https://i.pravatar.cc/40?img=5" alt="User" />
          <div className="app-toolbar__user-info">
            <div className="app-toolbar__user-name">Lily</div>
            <div className="app-toolbar__user-role">Admin</div>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="app-search-modal" role="dialog" aria-modal="true" aria-label="Search">
          <div className="app-search-modal__backdrop" onClick={() => setIsSearchOpen(false)} />
          <div className="app-search-modal__container">
            <div className="app-search-modal__header">
              <span className="app-search-modal__icon">🔍</span>
              <span className="app-search-modal__hint">[esc]</span>
              <button className="app-search-modal__close" aria-label="Close" onClick={() => setIsSearchOpen(false)}>×</button>
            </div>

            <div className="app-search-modal__grid">
              <div className="app-search-modal__section">
                <div className="app-search-modal__section-title">POPULAR SEARCHES</div>
                <ul className="app-search-modal__list">
                  <li>📊 Analytics</li>
                  <li>📈 CRM</li>
                  <li>🛒 eCommerce</li>
                  <li>👤 User List</li>
                </ul>
              </div>
              <div className="app-search-modal__section">
                <div className="app-search-modal__section-title">APPS & PAGES</div>
                <ul className="app-search-modal__list">
                  <li>📅 Calendar</li>
                  <li>🧾 Invoice List</li>
                  <li>💲 Pricing</li>
                  <li>⚙️ Account Settings</li>
                </ul>
              </div>
              <div className="app-search-modal__section">
                <div className="app-search-modal__section-title">USER INTERFACE</div>
                <ul className="app-search-modal__list">
                  <li>A Typography</li>
                  <li>🧩 Tabs</li>
                  <li>➕ Buttons</li>
                  <li>📦 Advanced Cards</li>
                </ul>
              </div>
              <div className="app-search-modal__section">
                <div className="app-search-modal__section-title">FORMS & TABLES</div>
                <ul className="app-search-modal__list">
                  <li>≡ Select</li>
                  <li>▢ Autocomplete</li>
                  <li>▦ Table</li>
                  <li>📅 Date Pickers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
