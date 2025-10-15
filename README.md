🏠 VacantSpacesKenya (VSK)

VacantSpacesKenya is a nationwide platform that connects Kenyans with available vacant spaces — from residential homes, business premises, industrial storage, to land and event venues.

Built with Next.js (App Router), Supabase, and Cloudinary, it empowers users, agents, and developers to discover, list, and manage spaces anywhere in Kenya.

🚀 Tech Stack
Layer	Technology
Frontend Framework	Next.js 14 (App Router + Serverless API)
Backend / Auth / DB	Supabase (PostgreSQL + Row Level Security)
File Storage / Media	Cloudinary
Styling	TailwindCSS + shadcn/ui
Deployment	Vercel (Edge Functions compatible)
Geolocation	PostgreSQL earthdistance + cube extensions
Type Safety	TypeScript
API Structure	RESTful endpoints under /app/api/
🧩 Core Features

🧭 Nationwide Listings — residential, commercial, industrial, land, event, and specialty spaces

🧑‍💼 User Roles — agents, owners, and admins

🔐 Secure Auth — Supabase email/password, magic link, or OAuth

📸 Media Uploads — integrated Cloudinary image and video management

⭐ Ratings & Reviews — transparent feedback for spaces and agents

🏷️ Categories & Filters — dynamic filters by type, county, price, and features

📊 Analytics — track listings, views, favorites, and user engagement

📍 Kenya Location Data — counties, constituencies, and towns built-in

🏗️ Project Structure
vacantspaceskenya/
├── app/
│   ├── api/
│   │   ├── auth/              # Supabase Auth handlers
│   │   ├── users/             # User & profile management
│   │   ├── listings/          # CRUD + filters for listings
│   │   ├── categories/        # Space type management
│   │   ├── amenities/         # Amenity CRUD
│   │   ├── locations/         # Counties, constituencies, etc.
│   │   ├── reviews/           # Ratings & comments
│   │   ├── uploads/           # Cloudinary integration
│   │   └── stats/             # Admin analytics and metrics
│   ├── dashboard/             # Agent & admin dashboard
│   ├── listings/              # Public listings UI
│   └── layout.tsx             # Root layout
│
├── lib/
│   ├── supabaseClient.ts      # Supabase instance
│   ├── cloudinary.ts          # Cloudinary setup
│   └── utils.ts               # Helpers and constants
│
├── types/
│   ├── index.ts               # Global types
│   ├── listings.ts            # Listing type definitions
│   ├── user.ts                # User profile & role types
│   └── reviews.ts             # Review interfaces
│
├── middleware.ts              # Supabase auth middleware
├── .env.example               # Example environment variables
├── README.md                  # This file
└── package.json

⚙️ Environment Variables

Create a .env.local file in the root directory and configure the following:

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# App
NEXT_PUBLIC_APP_URL=https://vacantspaceskenya.vercel.app

🗄️ Database Setup (Supabase)

Create a new Supabase project

Enable the following extensions:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "cube";
CREATE EXTENSION IF NOT EXISTS "earthdistance";


Run the SQL schema from supabase/schema.sql (our enhanced schema).

Insert the seed data:

\i supabase/seed/categories.sql
\i supabase/seed/amenities.sql
\i supabase/seed/counties.sql

☁️ Media Setup (Cloudinary)

Create a free account on https://cloudinary.com

Get your cloud name, API key, and API secret

Configure the credentials in your .env.local

The app uses the /app/api/uploads endpoint to:

Upload images

Return secure URLs for listings

🧠 API Endpoints
Resource	Endpoint	Methods	Description
Auth	/api/auth	POST /login, POST /signup, POST /logout	Supabase Auth
Users	/api/users	GET, PUT, DELETE	Manage users & profiles
Listings	/api/listings	GET, POST, PUT, DELETE	CRUD for vacant spaces
Categories	/api/categories	GET, POST, PUT, DELETE	Manage space types
Amenities	/api/amenities	GET, POST, PUT, DELETE	Amenities list
Locations	/api/locations	GET	Counties, constituencies
Reviews	/api/reviews	GET, POST, DELETE	Ratings & feedback
Uploads	/api/uploads	POST	Upload to Cloudinary
Stats	/api/stats	GET	Admin metrics & dashboards
🧰 Running Locally
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Visit
http://localhost:3000

🌍 Deployment

Recommended: Vercel

This project is optimized for Vercel’s Edge Functions.

Push your repo to GitHub

Import it into Vercel

Add your .env variables via the Vercel Dashboard

Deploy 🚀

🧑‍💻 Contributing

We welcome contributions from the Kenyan tech community 🇰🇪

Fork this repository

Create your feature branch:

git checkout -b feature/new-feature


Commit your changes

Push to your branch

Open a Pull Request

🗺️ Roadmap

 Full-text search for listings

 Map view with Leaflet or Mapbox

 Advanced filters (price range, amenities, etc.)

 Payment integration (M-Pesa & Stripe)

 SMS verification

 AI-powered space recommendations

 Admin analytics dashboard

🧑‍🚀 Team

VacantSpacesKenya — a platform by Vacant Spaces Developers

“Connecting Kenyans to the spaces that move them.”

🪪 License

MIT License © 2025 VacantSpacesKenya