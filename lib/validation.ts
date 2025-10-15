// Zod schema validations for input data
import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  slug: z.string().min(2, "Slug is required"),
  parent_id: z.string().uuid().optional().nullable(),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  sort_order: z.number().optional(),
});

export type CategoryInput = z.infer<typeof CategorySchema>;

export const ListingSchema = z.object({
  title: z.string().min(3),
  category_id: z.string().uuid(),
  subcategory_id: z.string().uuid().optional().nullable(),
  owner_id: z.string().uuid(),
  description: z.string().optional().nullable(),
  county: z.string().min(2),
  town: z.string().optional().nullable(),
  neighborhood: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  price: z.number().min(0),
  currency: z.string().length(3),
  price_type: z.enum(["monthly", "daily", "hourly", "sale"]),
  size_sqm: z.number().optional().nullable(),
  rooms: z.number().optional().nullable(),
  availability_date: z.string().optional().nullable(),
  amenities: z.array(z.string()).optional().nullable(),
  listing_type: z.enum(["owner", "agent", "developer"]),
  verification_status: z
    .enum(["unverified", "phone_verified", "verified"])
    .optional(),
  tags: z.array(z.string()).optional().nullable(),
});

export const AuthSignupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  full_name: z.string().optional(),
  phone: z.string().optional(),
  role: z.enum(["owner", "agent", "developer", "student", "admin"]).optional(),
});

export const AuthLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6),
});


export const UserProfileSchema = z.object({
  email: z.string().email(),
  full_name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  role: z.enum(["owner", "agent", "developer", "student", "admin"]).optional(),
  avatar_url: z.string().url().optional().nullable(),
  verification_status: z
    .enum(["unverified", "phone_verified", "verified"])
    .optional(),
});

export const AmenitySchema = z.object({
  name: z.string().min(2, "Amenity name must be at least 2 characters"),
  icon: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
});



export const LocationSchema = z.object({
  name: z.string().min(2, "Location name is too short"),
  slug: z.string().min(2, "Slug is required"),
  type: z.enum(["county", "constituency", "town", "neighborhood"]),
  parent_id: z.string().uuid().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});

export const ReviewSchema = z.object({
  listing_id: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional().nullable(),
});