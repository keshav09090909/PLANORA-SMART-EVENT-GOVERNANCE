import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreateEventPage from './pages/CreateEventPage';
import VendorMarketplacePage from './pages/VendorMarketplacePage';
import MunicipalDashboardPage from './pages/MunicipalDashboardPage';
import EventReportPage from './pages/EventReportPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/vendors" element={<VendorMarketplacePage />} />
        <Route path="/municipal-dashboard" element={<MunicipalDashboardPage />} />
        <Route path="/event-report/:eventId" element={<EventReportPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
