import React from "react";
import "./ToolBar.css";

export default function ToolBar() {
  return (
    <div className="app-toolbar" role="toolbar" aria-label="Global toolbar">
      <div className="app-toolbar__search">
        <span className="app-toolbar__search-icon" aria-hidden>🔍</span>
        <input
          className="app-toolbar__search-input"
          type="search"
          placeholder="Search (Ctrl+/)"
          aria-label="Search"
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
        <div className="app-toolbar__avatar" title="Profile status: online">
          <img src="https://i.pravatar.cc/64?img=12" alt="User avatar" />
          <span className="app-toolbar__avatar-status" aria-hidden />
        </div>
      </div>
    </div>
  );
}
