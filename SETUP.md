# PLANORA - Setup Instructions

## Overview

PLANORA is a Smart Urban Event Governance Platform that connects event organizers, vendors, and municipal authorities to coordinate events, sanitation planning, vendor services, and public safety.

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **PDF Export**: jsPDF

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. **Install Dependencies**

```bash
npm install
```

2. **Seed the Database**

Populate the database with sample vendors and events:

```bash
npm run seed
```

This will create:
- 12 sample vendors (caterers, decorators, DJs, logistics providers)
- 6 sample events (festivals, weddings, corporate events, exhibitions)
- Event-vendor associations

## Running the Application

### Development Mode

Start both backend and frontend servers:

```bash
npm run dev
```

This will start:
- Backend API server on http://localhost:3001
- Frontend development server on http://localhost:5173

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
planora/
├── backend/
│   ├── config/
│   │   └── database.js          # Supabase client configuration
│   ├── routes/
│   │   ├── events.js            # Event management endpoints
│   │   ├── vendors.js           # Vendor management endpoints
│   │   ├── eventVendors.js      # Event-vendor association endpoints
│   │   └── reports.js           # Report generation endpoints
│   ├── services/
│   │   └── wastePredictor.js    # AI waste prediction service
│   ├── scripts/
│   │   └── seedData.js          # Database seeding script
│   └── server.js                # Express server setup
├── src/
│   ├── components/
│   │   ├── Layout.jsx           # Main layout with navigation
│   │   └── Layout.css
│   ├── pages/
│   │   ├── HomePage.jsx         # Landing page
│   │   ├── CreateEventPage.jsx  # Event registration form
│   │   ├── VendorMarketplacePage.jsx  # Vendor browsing
│   │   ├── MunicipalDashboardPage.jsx # Dashboard for authorities
│   │   └── EventReportPage.jsx  # Event report with PDF export
│   ├── services/
│   │   └── api.js               # API client functions
│   ├── App.jsx                  # React Router setup
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles
├── package.json
└── vite.config.js
```

## Features

### 1. Event Registration System
- Create events with comprehensive details
- Automatic waste estimation using AI model
- Event status tracking (pending, approved, rejected)

### 2. Vendor Marketplace
- Browse vendors by category
- View vendor ratings and pricing
- Filter by category (caterer, decorator, DJ, logistics)

### 3. AI Waste Prediction
- Estimates waste based on:
  - Number of attendees
  - Event type
  - Catering scale
- Provides breakdown by waste type

### 4. Municipal Event Coordination
- Generate detailed event reports
- View vendors assigned to events
- Calculate event duration and logistics
- Export reports as PDF

### 5. Municipal Dashboard
- View all registered events
- Statistics and analytics
- Charts showing events by type
- Waste estimation aggregates
- Event status tracking

## API Endpoints

### Events
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Vendors
- `GET /api/vendors` - List all vendors
- `GET /api/vendors/:id` - Get single vendor
- `POST /api/vendors` - Create new vendor

### Event-Vendors
- `GET /api/event-vendors/event/:eventId` - Get vendors for event
- `POST /api/event-vendors` - Add vendor to event
- `DELETE /api/event-vendors/:id` - Remove vendor from event

### Reports
- `GET /api/reports/:eventId` - Get complete event report

## Database Schema

### Events Table
- id (uuid)
- name (text)
- location (text)
- venue_size (Small/Medium/Large)
- expected_attendees (integer)
- event_type (wedding/festival/exhibition/corporate)
- start_date (timestamp)
- end_date (timestamp)
- status (pending/approved/rejected)
- estimated_waste (numeric)

### Vendors Table
- id (uuid)
- name (text)
- category (caterer/decorator/dj/logistics)
- description (text)
- contact_email (text)
- contact_phone (text)
- rating (numeric)
- price_range (Budget/Standard/Premium)

### Event_Vendors Table
- id (uuid)
- event_id (foreign key)
- vendor_id (foreign key)

## Environment Variables

The application uses Supabase for database management. Environment variables are configured in `.env`:

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `PORT` - Backend server port (default: 3001)

## Waste Prediction Algorithm

The AI waste predictor uses a simple but effective model:

```
estimated_waste = attendees × base_waste_per_person × catering_multiplier
```

**Base waste per person by event type:**
- Wedding: 0.8 kg
- Festival: 1.2 kg
- Exhibition: 0.4 kg
- Corporate: 0.5 kg

**Catering scale multipliers:**
- Small: 0.7x
- Medium: 1.0x
- Large: 1.5x

## Usage Guide

### For Event Organizers

1. Navigate to "Create Event"
2. Fill in event details:
   - Event name and location
   - Venue size and expected attendees
   - Event type and date/time range
3. Submit the form
4. System automatically estimates waste generation
5. View the generated event report
6. Export report as PDF if needed

### For Municipal Authorities

1. Access "Municipal Dashboard"
2. View statistics:
   - Total events, attendees, and estimated waste
   - Pending approvals
3. Review event details in the table
4. Click "View Report" for any event
5. Export reports for official documentation

### For Vendors

1. Browse "Vendor Marketplace"
2. Filter by category
3. View vendor details, ratings, and contact information

## Troubleshooting

**Backend server won't start:**
- Ensure Node.js v18+ is installed
- Check if port 3001 is available
- Verify .env file exists with correct credentials

**Frontend won't load:**
- Clear browser cache
- Check if backend is running
- Verify API proxy configuration in vite.config.js

**Database errors:**
- Verify Supabase credentials in .env
- Check if migrations were applied successfully
- Ensure database tables exist

## Future Enhancements

- User authentication and authorization
- Real-time notifications
- Advanced waste prediction with machine learning
- Mobile application
- Integration with payment systems
- Weather-based predictions
- Resource optimization recommendations

## Support

For civic tech innovation challenges and urban governance applications.

## License

MIT License
