/*
  ========================================================
  VacantSpacesKenya (VSK) - Enhanced Database Schema
  ========================================================
  Version: 1.2
  Purpose: Full-featured property & vacant space marketplace backend
  Author: ChatGPT (GPT-5)
*/

-- ========================
-- USER & PROFILE STRUCTURE
-- ========================

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'agent', 'admin', 'inspector')),
  avatar_url text,
  verified_phone boolean DEFAULT false,
  verified_id boolean DEFAULT false,
  agency_name text,
  agency_license text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Optional: allows creation of role hierarchies
CREATE TABLE IF NOT EXISTS role_hierarchy (
  role text PRIMARY KEY,
  inherits_from text REFERENCES role_hierarchy(role),
  description text
);

INSERT INTO role_hierarchy (role, inherits_from, description) VALUES
('user', NULL, 'Regular user'),
('agent', 'user', 'Registered property agent'),
('inspector', 'agent', 'Field inspector'),
('admin', NULL, 'Platform administrator')
ON CONFLICT DO NOTHING;

-- =========================
-- LOCATION HIERARCHY
-- =========================

CREATE TABLE IF NOT EXISTS counties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  code text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS constituencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  county_id uuid REFERENCES counties(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(county_id, name)
);

CREATE TABLE IF NOT EXISTS towns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  constituency_id uuid REFERENCES constituencies(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(constituency_id, name)
);

-- =========================
-- CATEGORIES & AMENITIES
-- =========================

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  parent_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  description text,
  icon text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS amenities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  icon text,
  category text,
  created_at timestamptz DEFAULT now()
);

-- =========================
-- LISTINGS CORE
-- =========================

CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  category_id uuid REFERENCES categories(id) NOT NULL,
  
  -- Location
  county_id uuid REFERENCES counties(id) NOT NULL,
  constituency_id uuid REFERENCES constituencies(id),
  town_id uuid REFERENCES towns(id),
  neighborhood text,
  street_address text,
  latitude decimal(10,8),
  longitude decimal(11,8),
  nearby_landmarks text,

  -- Pricing
  price decimal(12,2) NOT NULL,
  currency text DEFAULT 'KES',
  price_frequency text DEFAULT 'monthly' CHECK (price_frequency IN ('hourly','daily','weekly','monthly','yearly','sale')),
  deposit_amount decimal(12,2),
  service_charge decimal(12,2),
  other_fees text,

  -- Space details
  size_sqm decimal(10,2),
  number_of_rooms integer,
  floor_level text,
  furnished boolean DEFAULT false,

  -- Lease
  available_from date,
  available_to date,
  min_lease_period text,
  max_lease_period text,
  lease_terms text,

  -- Features
  zoning text,
  permitted_uses text[],
  restrictions text[],

  -- Access & security
  road_access text,
  public_transport_distance text,
  has_parking boolean DEFAULT false,
  parking_spaces integer,
  has_security boolean DEFAULT false,
  security_features text[],
  disabled_access boolean DEFAULT false,

  -- Utilities
  has_electricity boolean DEFAULT false,
  has_water boolean DEFAULT false,
  has_internet boolean DEFAULT false,
  has_ac boolean DEFAULT false,

  -- Verification & status
  listing_type text DEFAULT 'agent' CHECK (listing_type IN ('owner','agent','developer')),
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending','verified','rejected')),
  verified_by uuid REFERENCES profiles(id),
  verified_at timestamptz,
  onsite_verified boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('draft','active','rented','sold','inactive','expired')),
  expiry_date timestamptz DEFAULT (now() + interval '90 days'),

  -- Contact
  contact_name text,
  contact_phone text NOT NULL,
  contact_email text,
  preferred_contact_hours text,

  -- Documents
  has_title_deed boolean DEFAULT false,
  has_occupation_cert boolean DEFAULT false,
  has_building_plan boolean DEFAULT false,

  -- Analytics
  views_count integer DEFAULT 0,
  inquiries_count integer DEFAULT 0,
  avg_rating decimal(3,2),
  reviews_count integer DEFAULT 0,

  featured boolean DEFAULT false,
  featured_until timestamptz,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable required extensions (run once per database)
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

-- Create the geospatial index properly
CREATE INDEX IF NOT EXISTS idx_listings_geo
ON listings
USING GIST (ll_to_earth(latitude::float8, longitude::float8));

-- =========================
-- LISTING SUPPORTING TABLES
-- =========================

CREATE TABLE IF NOT EXISTS listing_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  caption text,
  is_primary boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS listing_amenities (
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  amenity_id uuid REFERENCES amenities(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (listing_id, amenity_id)
);

-- =========================
-- USER ENGAGEMENT
-- =========================

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(listing_id, user_id)
);

CREATE TABLE IF NOT EXISTS favorites (
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, listing_id)
);

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new','read','responded','closed')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  reporter_id uuid REFERENCES profiles(id),
  reason text NOT NULL,
  details text,
  status text DEFAULT 'pending' CHECK (status IN ('pending','reviewed','dismissed','resolved')),
  created_at timestamptz DEFAULT now()
);

-- =========================
-- VERIFICATION & PAYMENTS
-- =========================

CREATE TABLE IF NOT EXISTS verification_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  verification_type text NOT NULL CHECK (verification_type IN ('phone','id','agency','onsite')),
  document_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  admin_notes text,
  reviewed_by uuid REFERENCES profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  amount decimal(12,2) NOT NULL,
  currency text DEFAULT 'KES',
  purpose text NOT NULL CHECK (purpose IN ('subscription','promotion','deposit','rent')),
  status text DEFAULT 'pending' CHECK (status IN ('pending','completed','failed','refunded')),
  reference text,
  payment_method text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan_name text NOT NULL,
  features text[],
  price decimal(12,2),
  currency text DEFAULT 'KES',
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  status text DEFAULT 'active' CHECK (status IN ('active','expired','cancelled')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  type text CHECK (type IN ('featured','highlight','boost')),
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  status text DEFAULT 'active' CHECK (status IN ('active','expired')),
  created_at timestamptz DEFAULT now()
);

-- =========================
-- ANALYTICS & LOGGING
-- =========================

CREATE TABLE IF NOT EXISTS views_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  viewer_id uuid REFERENCES profiles(id),
  viewed_at timestamptz DEFAULT now(),
  ip_address text
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- =========================
-- TRIGGERS & INDEXES
-- =========================

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_listings BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_reviews BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_category_id ON listings(category_id);
CREATE INDEX IF NOT EXISTS idx_listings_county_id ON listings(county_id);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_listing_id ON reviews(listing_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_listing_id ON inquiries(listing_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
