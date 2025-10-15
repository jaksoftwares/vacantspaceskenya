/*
  # Seed Constituencies and Setup Instructions
  
  ## Seeds
  1. Constituencies for major counties (Nairobi, Kiambu, Mombasa, Nakuru)
  2. Setup instructions for admin and test accounts
  
  ## Test Accounts Setup
  These accounts must be created through the signup flow at /register:
  
  ### Admin Account
  - Email: admin@vacantspaceskenya.com
  - Password: VskAdmin@2025
  - After signup, run: UPDATE profiles SET role = 'admin' WHERE email = 'admin@vacantspaceskenya.com';
  
  ### Agent Account  
  - Email: agent@vacantspaceskenya.com
  - Password: VskAgent@2025
  - After signup, run: UPDATE profiles SET role = 'agent' WHERE email = 'agent@vacantspaceskenya.com';
  
  ### User Account
  - Email: user@vacantspaceskenya.com
  - Password: VskUser@2025
  - Default role is 'user' - no changes needed
*/

-- Insert constituencies for major counties
DO $$
DECLARE
  nairobi_id uuid;
  kiambu_id uuid;
  mombasa_id uuid;
  nakuru_id uuid;
BEGIN
  SELECT id INTO nairobi_id FROM counties WHERE name = 'Nairobi';
  SELECT id INTO kiambu_id FROM counties WHERE name = 'Kiambu';
  SELECT id INTO mombasa_id FROM counties WHERE name = 'Mombasa';
  SELECT id INTO nakuru_id FROM counties WHERE name = 'Nakuru';
  
  IF nairobi_id IS NOT NULL THEN
    INSERT INTO constituencies (county_id, name) VALUES
      (nairobi_id, 'Westlands'),
      (nairobi_id, 'Dagoretti North'),
      (nairobi_id, 'Langata'),
      (nairobi_id, 'Roysambu'),
      (nairobi_id, 'Kasarani'),
      (nairobi_id, 'Embakasi South'),
      (nairobi_id, 'Embakasi East'),
      (nairobi_id, 'Starehe'),
      (nairobi_id, 'Mathare')
    ON CONFLICT (county_id, name) DO NOTHING;
  END IF;
  
  IF kiambu_id IS NOT NULL THEN
    INSERT INTO constituencies (county_id, name) VALUES
      (kiambu_id, 'Kikuyu'),
      (kiambu_id, 'Limuru'),
      (kiambu_id, 'Ruiru'),
      (kiambu_id, 'Thika Town')
    ON CONFLICT (county_id, name) DO NOTHING;
  END IF;
  
  IF mombasa_id IS NOT NULL THEN
    INSERT INTO constituencies (county_id, name) VALUES
      (mombasa_id, 'Changamwe'),
      (mombasa_id, 'Kisauni'),
      (mombasa_id, 'Nyali'),
      (mombasa_id, 'Mvita')
    ON CONFLICT (county_id, name) DO NOTHING;
  END IF;
  
  IF nakuru_id IS NOT NULL THEN
    INSERT INTO constituencies (county_id, name) VALUES
      (nakuru_id, 'Nakuru Town East'),
      (nakuru_id, 'Nakuru Town West'),
      (nakuru_id, 'Bahati'),
      (nakuru_id, 'Gilgil')
    ON CONFLICT (county_id, name) DO NOTHING;
  END IF;
END $$;