import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import './VendorMarketplacePage.css';

function VendorMarketplacePage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const data = await api.getVendors();
      setVendors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = filterCategory === 'all'
    ? vendors
    : vendors.filter(v => v.category === filterCategory);

  const getCategoryIcon = (category) => {
    const icons = {
      caterer: '🍽️',
      decorator: '🎨',
      dj: '🎵',
      logistics: '🚛'
    };
    return icons[category] || '📦';
  };

  if (loading) {
    return (
      <div className="vendor-marketplace-page">
        <div className="loading">Loading vendors...</div>
      </div>
    );
  }

  return (
    <div className="vendor-marketplace-page">
      <div className="page-header">
        <h1>Vendor Marketplace</h1>
        <p>Browse and select verified vendors for your events</p>
      </div>

      <div className="filter-bar">
        <label>Filter by Category:</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="category-filter"
        >
          <option value="all">All Categories</option>
          <option value="caterer">Caterers</option>
          <option value="decorator">Decorators</option>
          <option value="dj">DJs</option>
          <option value="logistics">Logistics</option>
        </select>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="vendor-grid">
        {filteredVendors.map(vendor => (
          <div key={vendor.id} className="vendor-card">
            <div className="vendor-icon">
              {getCategoryIcon(vendor.category)}
            </div>
            <h3>{vendor.name}</h3>
            <div className="vendor-category">
              {vendor.category.charAt(0).toUpperCase() + vendor.category.slice(1)}
            </div>
            <p className="vendor-description">{vendor.description}</p>
            <div className="vendor-details">
              <div className="detail-item">
                <span className="detail-label">Rating:</span>
                <span className="rating">⭐ {vendor.rating.toFixed(1)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Price Range:</span>
                <span className={`price-badge ${vendor.price_range.toLowerCase()}`}>
                  {vendor.price_range}
                </span>
              </div>
            </div>
            <div className="vendor-contact">
              <div className="contact-item">
                📧 {vendor.contact_email}
              </div>
              <div className="contact-item">
                📞 {vendor.contact_phone}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="no-vendors">
          No vendors found in this category.
        </div>
      )}
    </div>
  );
}

export default VendorMarketplacePage;
