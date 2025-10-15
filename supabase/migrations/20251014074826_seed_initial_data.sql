/*
  # Seed Initial Data for VSK Platform
  
  ## Seeds
  1. Categories - All space types with subcategories
  2. Counties - All 47 Kenyan counties
  3. Amenities - Common amenities for listings
  
  This provides the foundational data needed for the platform to function.
*/

-- Insert main categories and subcategories
INSERT INTO categories (name, slug, parent_id, description, icon, sort_order) VALUES
  ('Residential', 'residential', NULL, 'Residential spaces for living', 'Home', 1),
  ('Commercial', 'commercial', NULL, 'Commercial spaces for business', 'Building', 2),
  ('Industrial & Storage', 'industrial-storage', NULL, 'Industrial and storage facilities', 'Warehouse', 3),
  ('Land', 'land', NULL, 'Vacant land and plots', 'MapPin', 4),
  ('Event & Public', 'event-public', NULL, 'Event venues and public spaces', 'Calendar', 5),
  ('Specialty & Niche', 'specialty-niche', NULL, 'Specialized spaces', 'Star', 6),
  ('Short-term / On-demand', 'short-term', NULL, 'Short-term and hourly spaces', 'Clock', 7)
ON CONFLICT (slug) DO NOTHING;

-- Get parent IDs for subcategories
DO $$
DECLARE
  residential_id uuid;
  commercial_id uuid;
  industrial_id uuid;
  land_id uuid;
  event_id uuid;
  specialty_id uuid;
  short_term_id uuid;
BEGIN
  SELECT id INTO residential_id FROM categories WHERE slug = 'residential';
  SELECT id INTO commercial_id FROM categories WHERE slug = 'commercial';
  SELECT id INTO industrial_id FROM categories WHERE slug = 'industrial-storage';
  SELECT id INTO land_id FROM categories WHERE slug = 'land';
  SELECT id INTO event_id FROM categories WHERE slug = 'event-public';
  SELECT id INTO specialty_id FROM categories WHERE slug = 'specialty-niche';
  SELECT id INTO short_term_id FROM categories WHERE slug = 'short-term';

  -- Residential subcategories
  INSERT INTO categories (name, slug, parent_id, description, icon, sort_order) VALUES
    ('Apartments / Flats', 'apartments-flats', residential_id, '1BR, 2BR, 3BR apartments', 'Building2', 1),
    ('Houses', 'houses', residential_id, 'Detached and semi-detached houses', 'Home', 2),
    ('Bedsitters / Studios', 'bedsitters-studios', residential_id, 'Single room units', 'DoorClosed', 3),
    ('Serviced Apartments', 'serviced-apartments', residential_id, 'Fully serviced apartments', 'Building', 4),
    ('Hostels / Dorms', 'hostels-dorms', residential_id, 'Hostel and dormitory rooms', 'Users', 5),
    ('Short-term Rentals', 'short-term-rentals', residential_id, 'Nightly/weekly rentals', 'CalendarClock', 6),
    ('Residential Plots', 'residential-plots', residential_id, 'Vacant plots for residential development', 'Map', 7)
  ON CONFLICT (slug) DO NOTHING;

  -- Commercial subcategories
  INSERT INTO categories (name, slug, parent_id, description, icon, sort_order) VALUES
    ('Retail Shops', 'retail-shops', commercial_id, 'Shop fronts and kiosks', 'Store', 1),
    ('Office Spaces', 'office-spaces', commercial_id, 'Private offices and suites', 'Briefcase', 2),
    ('Co-working Spaces', 'co-working-spaces', commercial_id, 'Co-working desks and meeting rooms', 'Users2', 3),
    ('Market Stalls', 'market-stalls', commercial_id, 'Street stalls and market stalls', 'ShoppingBag', 4),
    ('Mall Kiosks', 'mall-kiosks', commercial_id, 'Shopping mall kiosks', 'ShoppingCart', 5),
    ('Restaurants / Cafés', 'restaurants-cafes', commercial_id, 'Ready-to-use food spaces', 'Utensils', 6),
    ('Showrooms', 'showrooms', commercial_id, 'Display and showroom spaces', 'Eye', 7)
  ON CONFLICT (slug) DO NOTHING;

  -- Industrial & Storage subcategories
  INSERT INTO categories (name, slug, parent_id, description, icon, sort_order) VALUES
    ('Warehouses', 'warehouses', industrial_id, 'Large storage warehouses', 'Warehouse', 1),
    ('Industrial Units', 'industrial-units', industrial_id, 'Factories and industrial spaces', 'Factory', 2),
    ('Cold Storage', 'cold-storage', industrial_id, 'Refrigerated storage units', 'Snowflake', 3),
    ('Storage Lockers', 'storage-lockers', industrial_id, 'Self-storage units', 'Package', 4)
  ON CONFLICT (slug) DO NOTHING;

  -- Land subcategories
  INSERT INTO categories (name, slug, parent_id, description, icon, sort_order) VALUES
    ('Commercial Plots', 'commercial-plots', land_id, 'Vacant plots for commercial use', 'MapPin', 1),
    ('Agricultural Land', 'agricultural-land', land_id, 'Farms and agricultural plots', 'TreePine', 2),
    ('Grazing Land', 'grazing-land', land_id, 'Pastoral and grazing land', 'Beef', 3)
  ON CONFLICT (slug) DO NOTHING;

  -- Event & Public subcategories
  INSERT INTO categories (name, slug, parent_id, description, icon, sort_order) VALUES
    ('Event Halls', 'event-halls', event_id, 'Conference and event centers', 'Calendar', 1),
    ('Community Centers', 'community-centers', event_id, 'Church halls, school halls', 'Church', 2),
    ('Sports Grounds', 'sports-grounds', event_id, 'Stadium slots and sports facilities', 'Trophy', 3),
    ('Open Grounds', 'open-grounds', event_id, 'Rooftop and open event spaces', 'Sun', 4)
  ON CONFLICT (slug) DO NOTHING;

  -- Specialty & Niche subcategories
  INSERT INTO categories (name, slug, parent_id, description, icon, sort_order) VALUES
    ('Parking Spaces', 'parking-spaces', specialty_id, 'Parking lots and garages', 'ParkingCircle', 1),
    ('Billboard Spaces', 'billboard-spaces', specialty_id, 'Advertising spaces', 'Monitor', 2),
    ('Film Locations', 'film-locations', specialty_id, 'Photo and film shoot locations', 'Camera', 3),
    ('Medical Spaces', 'medical-spaces', specialty_id, 'Clinic spaces and labs', 'Stethoscope', 4),
    ('Training Rooms', 'training-rooms', specialty_id, 'Classrooms and training facilities', 'GraduationCap', 5)
  ON CONFLICT (slug) DO NOTHING;

  -- Short-term subcategories
  INSERT INTO categories (name, slug, parent_id, description, icon, sort_order) VALUES
    ('Hourly Meeting Rooms', 'hourly-meeting-rooms', short_term_id, 'Meeting rooms by the hour', 'Clock', 1),
    ('Pop-up Spaces', 'pop-up-spaces', short_term_id, 'Pop-up markets and temporary spaces', 'Zap', 2),
    ('Temporary Storage', 'temporary-storage', short_term_id, 'Short-term storage pods', 'Archive', 3)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- Insert all 47 Kenyan counties
INSERT INTO counties (name, code) VALUES
  ('Mombasa', '001'),
  ('Kwale', '002'),
  ('Kilifi', '003'),
  ('Tana River', '004'),
  ('Lamu', '005'),
  ('Taita Taveta', '006'),
  ('Garissa', '007'),
  ('Wajir', '008'),
  ('Mandera', '009'),
  ('Marsabit', '010'),
  ('Isiolo', '011'),
  ('Meru', '012'),
  ('Tharaka Nithi', '013'),
  ('Embu', '014'),
  ('Kitui', '015'),
  ('Machakos', '016'),
  ('Makueni', '017'),
  ('Nyandarua', '018'),
  ('Nyeri', '019'),
  ('Kirinyaga', '020'),
  ('Murang''a', '021'),
  ('Kiambu', '022'),
  ('Turkana', '023'),
  ('West Pokot', '024'),
  ('Samburu', '025'),
  ('Trans Nzoia', '026'),
  ('Uasin Gishu', '027'),
  ('Elgeyo Marakwet', '028'),
  ('Nandi', '029'),
  ('Baringo', '030'),
  ('Laikipia', '031'),
  ('Nakuru', '032'),
  ('Narok', '033'),
  ('Kajiado', '034'),
  ('Kericho', '035'),
  ('Bomet', '036'),
  ('Kakamega', '037'),
  ('Vihiga', '038'),
  ('Bungoma', '039'),
  ('Busia', '040'),
  ('Siaya', '041'),
  ('Kisumu', '042'),
  ('Homa Bay', '043'),
  ('Migori', '044'),
  ('Kisii', '045'),
  ('Nyamira', '046'),
  ('Nairobi', '047')
ON CONFLICT (name) DO NOTHING;

-- Insert common amenities
INSERT INTO amenities (name, icon, category) VALUES
  ('Electricity', 'Zap', 'utilities'),
  ('Water Supply', 'Droplet', 'utilities'),
  ('Internet/WiFi', 'Wifi', 'utilities'),
  ('Air Conditioning', 'Wind', 'utilities'),
  ('Heating', 'Flame', 'utilities'),
  ('Parking', 'ParkingCircle', 'access'),
  ('Security', 'Shield', 'security'),
  ('CCTV', 'Camera', 'security'),
  ('Security Guard', 'UserCheck', 'security'),
  ('Perimeter Fence', 'Home', 'security'),
  ('Electric Fence', 'Zap', 'security'),
  ('Gate', 'DoorClosed', 'security'),
  ('Elevator/Lift', 'ArrowUpDown', 'access'),
  ('Disabled Access', 'Accessibility', 'access'),
  ('Loading Bay', 'Truck', 'access'),
  ('Generator', 'Battery', 'utilities'),
  ('Backup Water', 'Droplets', 'utilities'),
  ('Toilets', 'Bath', 'facilities'),
  ('Kitchen', 'ChefHat', 'facilities'),
  ('Reception Area', 'Users', 'facilities'),
  ('Waiting Area', 'Armchair', 'facilities'),
  ('Conference Room', 'Presentation', 'facilities'),
  ('Furnished', 'Sofa', 'features'),
  ('Unfurnished', 'Package', 'features'),
  ('Garden/Yard', 'TreePine', 'features'),
  ('Balcony', 'Wind', 'features'),
  ('Swimming Pool', 'Waves', 'features'),
  ('Gym', 'Dumbbell', 'features'),
  ('Playground', 'Smile', 'features'),
  ('Pet Friendly', 'Dog', 'features')
ON CONFLICT (name) DO NOTHING;