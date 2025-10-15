# VacantSpacesKenya (VSK) - Setup Instructions

## Overview
VacantSpacesKenya is a comprehensive multi-vendor platform for finding and advertising vacant spaces across Kenya. Built by Dovepeak Digital Solutions.

## Test Account Credentials

### 1. Create Admin Account
Visit `/register` and create an account with:
- **Email**: `admin@vacantspaceskenya.com`
- **Password**: `VskAdmin@2025`
- **Role**: Select "Space Seeker" initially

After signup, run this SQL in Supabase SQL Editor to make the account an admin:
```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'admin@vacantspaceskenya.com';
```

Then login at `/login` and access admin panel at `/admin`

### 2. Create Agent Account
Visit `/register` and create an account with:
- **Email**: `agent@vacantspaceskenya.com`
- **Password**: `VskAgent@2025`
- **Role**: Select "Property Agent"

After signup, login at `/login` and access agent dashboard at `/agent`

###3. Create User Account
Visit `/register` and create an account with:
- **Email**: `user@vacantspaceskenya.com`
- **Password**: `VskUser@2025`
- **Role**: Select "Space Seeker"

After signup, login at `/login` and access user dashboard at `/dashboard`

## Adding Sample Listings

Once you have created the agent account, login as the agent and navigate to `/agent` to access the agent dashboard.

To add sample listings, you'll need to create them through the agent interface. Alternatively, run this SQL in Supabase to add sample listings:

```sql
-- First get the agent user_id
DO $$
DECLARE
  agent_user_id uuid;
  nairobi_id uuid;
  westlands_id uuid;
  apartments_id uuid;
  offices_id uuid;
  retail_id uuid;
BEGIN
  -- Get the agent's user_id
  SELECT id INTO agent_user_id FROM profiles WHERE email = 'agent@vacantspaceskenya.com';

  -- Get location IDs
  SELECT id INTO nairobi_id FROM counties WHERE name = 'Nairobi';
  SELECT id INTO westlands_id FROM constituencies WHERE name = 'Westlands' LIMIT 1;

  -- Get category IDs
  SELECT id INTO apartments_id FROM categories WHERE slug = 'apartments-flats';
  SELECT id INTO offices_id FROM categories WHERE slug = 'office-spaces';
  SELECT id INTO retail_id FROM categories WHERE slug = 'retail-shops';

  IF agent_user_id IS NOT NULL AND nairobi_id IS NOT NULL THEN
    -- Insert sample listings
    INSERT INTO listings (
      user_id, title, description, category_id, county_id, constituency_id,
      town, neighborhood, price, price_frequency, size_sqm, number_of_rooms,
      has_electricity, has_water, has_internet, has_parking, has_security,
      status, verification_status, contact_phone, contact_email
    ) VALUES
    (
      agent_user_id,
      'Modern 2 Bedroom Apartment in Westlands',
      'Beautiful spacious 2-bedroom apartment in the heart of Westlands. Features modern finishes, ample natural light, and great views. Perfect for young professionals or small families.',
      apartments_id,
      nairobi_id,
      westlands_id,
      'Nairobi',
      'Westlands',
      85000,
      'monthly',
      120,
      2,
      true,
      true,
      true,
      true,
      true,
      'active',
      'verified',
      '+254712345678',
      'agent@vacantspaceskenya.com'
    ),
    (
      agent_user_id,
      'Prime Office Space - Westlands CBD',
      'Premium office space in Westlands commercial district. Ideal for startups and SMEs. Includes reception area, meeting rooms, and backup power.',
      offices_id,
      nairobi_id,
      westlands_id,
      'Nairobi',
      'Westlands',
      150000,
      'monthly',
      200,
      6,
      true,
      true,
      true,
      true,
      true,
      'active',
      'verified',
      '+254712345678',
      'agent@vacantspaceskenya.com'
    ),
    (
      agent_user_id,
      'Retail Shop on Busy Street',
      'High-traffic retail space perfect for boutique, electronics, or general merchandise. Ground floor with excellent visibility.',
      retail_id,
      nairobi_id,
      westlands_id,
      'Nairobi',
      'Westlands',
      120000,
      'monthly',
      80,
      NULL,
      true,
      true,
      false,
      false,
      true,
      'active',
      'pending',
      '+254712345678',
      'agent@vacantspaceskenya.com'
    );

    RAISE NOTICE 'Sample listings created successfully!';
  ELSE
    RAISE NOTICE 'Please create the agent account first!';
  END IF;
END $$;
```

## Platform Features

### For Users (Space Seekers)
- Browse thousands of listings
- Advanced search and filtering
- Save favorite listings
- Send inquiries to agents
- View detailed listing information
- Access personal dashboard

### For Agents
- Create and manage listings
- Track views and inquiries
- Manage multiple properties
- View analytics and statistics
- Respond to client inquiries
- Get verified badge

### For Admins
- Manage all users and agents
- Moderate listings
- Approve verification requests
- View platform analytics
- Manage categories and locations
- Full platform control

## Database Structure

The platform includes:
- **13+ Tables**: Users, listings, categories, counties, constituencies, amenities, reviews, favorites, inquiries, etc.
- **47 Kenyan Counties**: Pre-seeded
- **7 Main Categories**: Residential, Commercial, Industrial, Land, Event Spaces, Specialty, Short-term
- **40+ Subcategories**: Apartments, offices, warehouses, retail shops, etc.
- **30+ Amenities**: Electricity, water, parking, security, internet, etc.

## Key Pages

### Public Pages
- `/` - Homepage with hero section and features
- `/browse` - Browse and search listings
- `/listings/[id]` - Detailed listing view
- `/about` - About VSK and Dovepeak
- `/how-it-works` - Platform explanation
- `/login` - User login
- `/register` - User registration

### User Pages
- `/dashboard` - User dashboard
- `/favorites` - Saved listings
- `/inquiries` - User inquiries

### Agent Pages
- `/agent` - Agent dashboard
- `/agent/listings/new` - Create new listing (to be implemented)
- `/agent/listings/[id]/edit` - Edit listing (to be implemented)

### Admin Pages
- `/admin` - Admin dashboard
- User management
- Listing moderation
- Verification management
- Platform analytics

## Environment Variables

Ensure your `.env` file contains:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Design & Branding

- **Primary Color**: Navy Blue (#1a2744)
- **Secondary Color**: Orange (#ff6600)
- **Logo**: Dovepeak Digital Solutions logo with wings
- **Font**: Inter (default Next.js font)
- **UI Library**: shadcn/ui components with Tailwind CSS

## Security

- Row Level Security (RLS) enabled on all tables
- Role-based access control (user, agent, admin)
- Email/password authentication via Supabase Auth
- Verified listings and agents
- Secure API routes

## Next Steps

1. Create the three test accounts as described above
2. Make the first account an admin using the SQL command
3. Add sample listings using the provided SQL
4. Explore the platform with different user roles
5. Customize and extend as needed

## Support

For issues or questions, contact Dovepeak Digital Solutions.

---

**Built with ❤️ by Dovepeak Digital Solutions**
