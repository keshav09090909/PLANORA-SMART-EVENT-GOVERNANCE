import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>PLANORA</h1>
            <p className="tagline">Smart Urban Event Governance</p>
          </Link>
          <nav className="nav">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/create-event"
              className={`nav-link ${isActive('/create-event') ? 'active' : ''}`}
            >
              Create Event
            </Link>
            <Link
              to="/vendors"
              className={`nav-link ${isActive('/vendors') ? 'active' : ''}`}
            >
              Vendors
            </Link>
            <Link
              to="/municipal-dashboard"
              className={`nav-link ${isActive('/municipal-dashboard') ? 'active' : ''}`}
            >
              Municipal Dashboard
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2026 PLANORA. Smart Urban Event Governance Platform.</p>
      </footer>
    </div>
  );
}

export default Layout;
