import React, { useEffect, useState } from "react";
import "./ToolBar.css";

export default function ToolBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsLanguageOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "/") setIsSearchOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 點擊外部關閉語言選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageOpen && !event.target.closest('.app-toolbar__language-dropdown')) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageOpen]);

  // 暗色模式切換
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // 保存到 localStorage
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  // 初始化暗色模式
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
        <div className="app-toolbar__language-dropdown">
          <button 
            className="app-toolbar__action" 
            aria-label="Language"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            <span className="app-toolbar__action-icon" aria-hidden>文</span>
          </button>
          {isLanguageOpen && (
            <div className="app-toolbar__language-menu">
              <div className="app-toolbar__language-option is-selected">
                English
              </div>
              <div className="app-toolbar__language-option">
                French
              </div>
              <div className="app-toolbar__language-option">
                Arabic
              </div>
            </div>
          )}
        </div>
        <button 
          className="app-toolbar__action" 
          aria-label="Theme"
          onClick={toggleDarkMode}
        >
          <span className="app-toolbar__action-icon" aria-hidden>
            {isDarkMode ? '☀️' : '☾'}
          </span>
        </button>
        <button className="app-toolbar__action" aria-label="Apps">
          <span className="app-toolbar__action-icon app-toolbar__grid-icon" aria-hidden></span>
        </button>
        <button className="app-toolbar__action app-toolbar__action--notification" aria-label="Notifications">
          <span className="app-toolbar__action-icon" aria-hidden>🔔</span>
          <span className="app-toolbar__badge" aria-hidden />
        </button>
        <div className="app-toolbar__avatar">
          <img src="https://i.pravatar.cc/40?img=5" alt="User" />
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
