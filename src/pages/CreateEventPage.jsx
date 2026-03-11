import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './CreateEventPage.css';

function CreateEventPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    venue_size: 'Medium',
    expected_attendees: '',
    event_type: 'corporate',
    start_date: '',
    end_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const eventData = {
        ...formData,
        expected_attendees: parseInt(formData.expected_attendees)
      };

      const newEvent = await api.createEvent(eventData);
      navigate(`/event-report/${newEvent.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <div className="page-header">
        <h1>Register New Event</h1>
        <p>Fill in the details to register your event with the municipal authority</p>
      </div>

      <form onSubmit={handleSubmit} className="event-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Event Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter event name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter event location/address"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="venue_size">Venue Size *</label>
            <select
              id="venue_size"
              name="venue_size"
              value={formData.venue_size}
              onChange={handleChange}
              required
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="expected_attendees">Expected Attendees *</label>
            <input
              type="number"
              id="expected_attendees"
              name="expected_attendees"
              value={formData.expected_attendees}
              onChange={handleChange}
              required
              min="1"
              placeholder="Number of attendees"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="event_type">Event Type *</label>
          <select
            id="event_type"
            name="event_type"
            value={formData.event_type}
            onChange={handleChange}
            required
          >
            <option value="wedding">Wedding</option>
            <option value="festival">Festival</option>
            <option value="exhibition">Exhibition</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="start_date">Start Date & Time *</label>
            <input
              type="datetime-local"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="end_date">End Date & Time *</label>
            <input
              type="datetime-local"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}

export default CreateEventPage;
