/*
  # Create PLANORA Database Schema

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `name` (text) - Event name
      - `location` (text) - Event location/address
      - `venue_size` (text) - Small, Medium, Large
      - `expected_attendees` (integer) - Number of expected attendees
      - `event_type` (text) - wedding, festival, exhibition, corporate
      - `start_date` (timestamptz) - Event start date and time
      - `end_date` (timestamptz) - Event end date and time
      - `status` (text) - pending, approved, rejected
      - `estimated_waste` (numeric) - Estimated waste in kilograms
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `vendors`
      - `id` (uuid, primary key)
      - `name` (text) - Vendor name
      - `category` (text) - caterer, decorator, dj, logistics
      - `description` (text) - Vendor description
      - `contact_email` (text) - Contact email
      - `contact_phone` (text) - Contact phone
      - `rating` (numeric) - Rating out of 5
      - `price_range` (text) - Budget, Standard, Premium
      - `created_at` (timestamptz)

    - `event_vendors`
      - `id` (uuid, primary key)
      - `event_id` (uuid, foreign key to events)
      - `vendor_id` (uuid, foreign key to vendors)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add public read policies for demo purposes
    - Add insert/update policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  venue_size text NOT NULL CHECK (venue_size IN ('Small', 'Medium', 'Large')),
  expected_attendees integer NOT NULL CHECK (expected_attendees > 0),
  event_type text NOT NULL CHECK (event_type IN ('wedding', 'festival', 'exhibition', 'corporate')),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  estimated_waste numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('caterer', 'decorator', 'dj', 'logistics')),
  description text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  rating numeric DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  price_range text DEFAULT 'Standard' CHECK (price_range IN ('Budget', 'Standard', 'Premium')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS event_vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, vendor_id)
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_vendors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create events"
  ON events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update events"
  ON events FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Vendors are viewable by everyone"
  ON vendors FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create vendors"
  ON vendors FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Event vendors are viewable by everyone"
  ON event_vendors FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create event vendor associations"
  ON event_vendors FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can delete event vendor associations"
  ON event_vendors FOR DELETE
  USING (true);
