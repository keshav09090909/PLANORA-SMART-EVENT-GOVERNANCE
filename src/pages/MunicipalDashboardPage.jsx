import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { api } from '../services/api';
import './MunicipalDashboardPage.css';

function MunicipalDashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalAttendees = events.reduce((sum, event) => sum + event.expected_attendees, 0);
  const totalWaste = events.reduce((sum, event) => sum + parseFloat(event.estimated_waste || 0), 0);

  const eventsByType = events.reduce((acc, event) => {
    acc[event.event_type] = (acc[event.event_type] || 0) + 1;
    return acc;
  }, {});

  const typeChartData = Object.entries(eventsByType).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    count
  }));

  const wasteByType = events.reduce((acc, event) => {
    const type = event.event_type;
    acc[type] = (acc[type] || 0) + parseFloat(event.estimated_waste || 0);
    return acc;
  }, {});

  const wasteChartData = Object.entries(wasteByType).map(([type, waste]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    waste: Math.round(waste)
  }));

  const COLORS = ['#2c5282', '#3182ce', '#4299e1', '#63b3ed'];

  const getStatusBadgeClass = (status) => {
    const classes = {
      pending: 'status-pending',
      approved: 'status-approved',
      rejected: 'status-rejected'
    };
    return classes[status] || 'status-pending';
  };

  if (loading) {
    return (
      <div className="municipal-dashboard-page">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="municipal-dashboard-page">
      <div className="page-header">
        <h1>Municipal Dashboard</h1>
        <p>Monitor and coordinate all registered events</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-value">{events.length}</div>
            <div className="stat-label">Total Events</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{totalAttendees.toLocaleString()}</div>
            <div className="stat-label">Total Attendees</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">♻️</div>
          <div className="stat-content">
            <div className="stat-value">{Math.round(totalWaste)} kg</div>
            <div className="stat-label">Estimated Waste</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-value">
              {events.filter(e => e.status === 'pending').length}
            </div>
            <div className="stat-label">Pending Approvals</div>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Events by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, count }) => `${name}: ${count}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {typeChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Estimated Waste by Event Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wasteChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="waste" fill="#2c5282" name="Waste (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="events-table-section">
        <h2>All Events</h2>
        <div className="table-container">
          <table className="events-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Location</th>
                <th>Type</th>
                <th>Date</th>
                <th>Attendees</th>
                <th>Est. Waste</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td className="event-name">{event.name}</td>
                  <td>{event.location}</td>
                  <td className="event-type">
                    {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                  </td>
                  <td>
                    <div>{formatDate(event.start_date)}</div>
                    <div className="time-text">{formatTime(event.start_date)}</div>
                  </td>
                  <td className="attendees">{event.expected_attendees.toLocaleString()}</td>
                  <td className="waste">{Math.round(event.estimated_waste)} kg</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(event.status)}`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <Link to={`/event-report/${event.id}`} className="view-btn">
                      View Report
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {events.length === 0 && (
          <div className="no-events">
            No events registered yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default MunicipalDashboardPage;
