const API_BASE_URL = '/api';

export const api = {
  async getEvents() {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  },

  async getEvent(id) {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    if (!response.ok) throw new Error('Failed to fetch event');
    return response.json();
  },

  async createEvent(eventData) {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    if (!response.ok) throw new Error('Failed to create event');
    return response.json();
  },

  async updateEvent(id, eventData) {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    if (!response.ok) throw new Error('Failed to update event');
    return response.json();
  },

  async getVendors() {
    const response = await fetch(`${API_BASE_URL}/vendors`);
    if (!response.ok) throw new Error('Failed to fetch vendors');
    return response.json();
  },

  async getEventVendors(eventId) {
    const response = await fetch(`${API_BASE_URL}/event-vendors/event/${eventId}`);
    if (!response.ok) throw new Error('Failed to fetch event vendors');
    return response.json();
  },

  async addEventVendor(eventId, vendorId) {
    const response = await fetch(`${API_BASE_URL}/event-vendors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_id: eventId, vendor_id: vendorId })
    });
    if (!response.ok) throw new Error('Failed to add vendor to event');
    return response.json();
  },

  async removeEventVendor(id) {
    const response = await fetch(`${API_BASE_URL}/event-vendors/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to remove vendor from event');
    return response.json();
  },

  async getEventReport(eventId) {
    const response = await fetch(`${API_BASE_URL}/reports/${eventId}`);
    if (!response.ok) throw new Error('Failed to fetch event report');
    return response.json();
  }
};
