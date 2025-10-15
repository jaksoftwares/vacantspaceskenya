/*
  # Add Helper Functions
  
  ## Functions
  1. increment_listing_views - Safely increment view count for listings
  2. Helper function for updating listing stats
  
  These functions help maintain data integrity and provide better performance.
*/

-- Function to increment listing views
CREATE OR REPLACE FUNCTION increment_listing_views(listing_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE listings
  SET views_count = views_count + 1
  WHERE id = listing_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update listing inquiry count
CREATE OR REPLACE FUNCTION increment_listing_inquiries(listing_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE listings
  SET inquiries_count = inquiries_count + 1
  WHERE id = listing_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-increment inquiry count when new inquiry is created
CREATE OR REPLACE FUNCTION auto_increment_inquiries()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM increment_listing_inquiries(NEW.listing_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_inquiries_trigger
  AFTER INSERT ON inquiries
  FOR EACH ROW
  EXECUTE FUNCTION auto_increment_inquiries();