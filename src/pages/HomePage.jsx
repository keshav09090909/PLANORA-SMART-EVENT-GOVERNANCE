import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to PLANORA</h1>
        <p className="hero-subtitle">
          Smart Urban Event Governance Platform
        </p>
        <p className="hero-description">
          Connecting event organizers, vendors, and municipal authorities for
          seamless event coordination, waste management, and public safety planning.
        </p>
      </section>

      <section className="features">
        <h2>Platform Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Event Registration</h3>
            <p>
              Register events with comprehensive details including location,
              attendees, and event type. Our system automatically estimates
              waste and coordinates resources.
            </p>
            <Link to="/create-event" className="feature-link">
              Create Event →
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏪</div>
            <h3>Vendor Marketplace</h3>
            <p>
              Browse and select from verified vendors including caterers,
              decorators, DJs, and logistics providers for your events.
            </p>
            <Link to="/vendors" className="feature-link">
              Browse Vendors →
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Waste Prediction</h3>
            <p>
              Advanced algorithms estimate waste generation based on attendees,
              event type, and catering scale to help plan sanitation services.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏛️</div>
            <h3>Municipal Coordination</h3>
            <p>
              Comprehensive dashboard for municipal authorities to monitor
              upcoming events, manage resources, and coordinate public services.
            </p>
            <Link to="/municipal-dashboard" className="feature-link">
              View Dashboard →
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Event Reports</h3>
            <p>
              Generate detailed reports with event information, vendor lists,
              waste estimates, and export as PDF for official documentation.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Scalable</h3>
            <p>
              Built with modern technology stack ensuring data security,
              reliability, and scalability for cities of any size.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Get Started Today</h2>
        <p>
          Whether you're an event organizer or municipal authority,
          PLANORA helps you coordinate better and serve the community.
        </p>
        <div className="cta-buttons">
          <Link to="/create-event" className="btn btn-primary">
            Register an Event
          </Link>
          <Link to="/municipal-dashboard" className="btn btn-secondary">
            Municipal Access
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
