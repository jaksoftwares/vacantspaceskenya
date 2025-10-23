'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Heart,
  MapPin,
  Square,
  Star,
  Eye,
  Share2,
  Verified,
  TrendingUp,
  Calendar,
  Bed,
  Bath,
  Car,
  Wifi,
  Shield,
  Clock,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

interface PropertyCardProps {
  listing: any;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  view?: 'grid' | 'list';
}

export function PropertyCard({ 
  listing, 
  isFavorite = false, 
  onToggleFavorite,
  view = 'grid' 
}: PropertyCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const getPrimaryImage = () => {
    if (imageError) return '/placeholder.jpg';
    return listing.listing_images?.find((img: any) => img.is_primary)?.url ||
           listing.listing_images?.[0]?.url ||
           '/placeholder.jpg';
  };

  const getImageCount = () => {
    return listing.listing_images?.length || 0;
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          text: `Check out this property: ${listing.title}`,
          url: `/listings/${listing.id}`,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  if (view === 'list') {
    return <PropertyCardHorizontal {...{ listing, isFavorite, onToggleFavorite, getPrimaryImage, getImageCount, handleShare, imageError, setImageError, isImageLoading, setIsImageLoading }} />;
  }

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-md bg-white">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Link href={`/listings/${listing.id}`}>
          <div className="relative w-full h-full">
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <Image
              src={getPrimaryImage()}
              alt={listing.title}
              fill
              className={cn(
                "object-cover transition-all duration-700",
                "group-hover:scale-110 group-hover:rotate-1",
                isImageLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setIsImageLoading(false)}
              onError={() => {
                setImageError(true);
                setIsImageLoading(false);
              }}
            />
          </div>

          {/* Image Count Badge */}
          {getImageCount() > 1 && (
            <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white rounded-lg text-xs font-semibold flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              {getImageCount()} Photos
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {listing.featured && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0 shadow-lg backdrop-blur-sm animate-pulse">
              <Star className="h-3 w-3 mr-1 fill-white" />
              Featured
            </Badge>
          )}
          {listing.verification_status === 'verified' && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 border-0 shadow-lg backdrop-blur-sm">
              <Verified className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
          {listing.is_new && (
            <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg backdrop-blur-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              New
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/90 backdrop-blur-md hover:bg-white shadow-lg hover:scale-110 transition-all"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite?.(listing.id);
            }}
          >
            <Heart 
              className={cn(
                "h-4 w-4 transition-all",
                isFavorite && "fill-red-500 text-red-500 scale-110"
              )} 
            />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/90 backdrop-blur-md hover:bg-white shadow-lg hover:scale-110 transition-all"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <Badge variant="secondary" className="bg-white/95 backdrop-blur-md shadow-lg font-semibold">
            {listing.categories?.name || 'Property'}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-5 space-y-4">
        {/* Title & Location */}
        <div className="space-y-2">
          <Link href={`/listings/${listing.id}`}>
            <h3 className="font-bold text-lg line-clamp-2 hover:text-orange-600 transition-colors leading-tight min-h-[3.5rem]">
              {listing.title}
            </h3>
          </Link>
          
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
            <span className="line-clamp-1 flex-1">
              {listing.town && `${listing.town}, `}
              {listing.counties?.name}
            </span>
          </div>
        </div>

        {/* Property Stats */}
        {(listing.bedrooms || listing.bathrooms || listing.parking_spaces) && (
          <div className="flex items-center gap-4 py-3 border-y border-gray-100">
            {listing.bedrooms && (
              <div className="flex items-center gap-1.5 text-sm">
                <Bed className="h-4 w-4 text-gray-500" />
                <span className="font-semibold text-gray-700">{listing.bedrooms}</span>
                <span className="text-gray-500 text-xs">Beds</span>
              </div>
            )}
            {listing.bathrooms && (
              <div className="flex items-center gap-1.5 text-sm">
                <Bath className="h-4 w-4 text-gray-500" />
                <span className="font-semibold text-gray-700">{listing.bathrooms}</span>
                <span className="text-gray-500 text-xs">Baths</span>
              </div>
            )}
            {listing.parking_spaces && (
              <div className="flex items-center gap-1.5 text-sm">
                <Car className="h-4 w-4 text-gray-500" />
                <span className="font-semibold text-gray-700">{listing.parking_spaces}</span>
                <span className="text-gray-500 text-xs">Parking</span>
              </div>
            )}
          </div>
        )}

        {/* Amenities Preview */}
        {listing.listing_amenities && listing.listing_amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {listing.listing_amenities.slice(0, 3).map((la: any, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs font-normal bg-gray-50 border-gray-200 text-gray-700"
              >
                {la.amenities?.name === 'wifi' && <Wifi className="h-3 w-3 mr-1" />}
                {la.amenities?.name === 'security' && <Shield className="h-3 w-3 mr-1" />}
                {la.amenities?.name}
              </Badge>
            ))}
            {listing.listing_amenities.length > 3 && (
              <Badge variant="outline" className="text-xs font-semibold bg-orange-50 border-orange-200 text-orange-700">
                +{listing.listing_amenities.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Price & Size Section */}
        <div className="flex items-end justify-between pt-2">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-orange-600 leading-none">
              KES {listing.price.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              per {listing.price_frequency}
            </p>
          </div>
          {listing.size_sqm && (
            <div className="flex items-center gap-1.5 text-sm bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-xl border border-gray-200">
              <Square className="h-4 w-4 text-gray-600" />
              <span className="font-bold text-gray-900">{listing.size_sqm}</span>
              <span className="text-gray-500 text-xs">m²</span>
            </div>
          )}
        </div>

        {/* Rating & Reviews */}
        {listing.avg_rating && (
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4 transition-all",
                    i < Math.round(listing.avg_rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
              <span className="text-sm font-bold ml-1.5 text-gray-900">
                {listing.avg_rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {listing.reviews_count} {listing.reviews_count === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        )}

        {/* Posted Date */}
        {listing.created_at && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-gray-100">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              Listed {new Date(listing.created_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        )}

        {/* CTA Button */}
        <Link href={`/listings/${listing.id}`} className="block">
          <Button className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-semibold shadow-md hover:shadow-lg transition-all h-11 group">
            View Full Details
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

// Horizontal Card Component for List View
function PropertyCardHorizontal({ 
  listing, 
  isFavorite, 
  onToggleFavorite, 
  getPrimaryImage, 
  getImageCount,
  handleShare,
  imageError,
  setImageError,
  isImageLoading,
  setIsImageLoading
}: any) {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-md bg-white">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative lg:w-96 h-64 lg:h-auto overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shrink-0">
          <Link href={`/listings/${listing.id}`}>
            <div className="relative w-full h-full">
              {isImageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <Image
                src={getPrimaryImage()}
                alt={listing.title}
                fill
                className={cn(
                  "object-cover transition-all duration-700",
                  "group-hover:scale-110",
                  isImageLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setIsImageLoading(false);
                }}
              />
            </div>

            {getImageCount() > 1 && (
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                {getImageCount()} Photos
              </div>
            )}
          </Link>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {listing.featured && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0 shadow-lg">
                <Star className="h-3 w-3 mr-1 fill-white" />
                Featured
              </Badge>
            )}
            {listing.verification_status === 'verified' && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 border-0 shadow-lg">
                <Verified className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
            {listing.is_new && (
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 shadow-lg">
                <TrendingUp className="h-3 w-3 mr-1" />
                New
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/90 backdrop-blur-md hover:bg-white shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite?.(listing.id);
              }}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-red-500 text-red-500")} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white/90 backdrop-blur-md hover:bg-white shadow-lg"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 space-y-2">
                <Badge variant="secondary" className="mb-2 font-semibold">
                  {listing.categories?.name || 'Property'}
                </Badge>
                <Link href={`/listings/${listing.id}`}>
                  <h3 className="font-bold text-2xl hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                    {listing.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <span>
                    {listing.town && `${listing.town}, `}
                    {listing.counties?.name}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-orange-600 leading-none mb-1">
                  KES {listing.price.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                  <Clock className="h-3 w-3" />
                  per {listing.price_frequency}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
              {listing.description || 'No description available for this property.'}
            </p>

            {/* Property Stats */}
            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-100 mb-4">
              {listing.size_sqm && (
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Square className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{listing.size_sqm} m²</p>
                    <p className="text-xs text-muted-foreground">Area</p>
                  </div>
                </div>
              )}
              {listing.bedrooms && (
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Bed className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{listing.bedrooms}</p>
                    <p className="text-xs text-muted-foreground">Bedrooms</p>
                  </div>
                </div>
              )}
              {listing.bathrooms && (
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Bath className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{listing.bathrooms}</p>
                    <p className="text-xs text-muted-foreground">Bathrooms</p>
                  </div>
                </div>
              )}
              {listing.parking_spaces && (
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Car className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{listing.parking_spaces}</p>
                    <p className="text-xs text-muted-foreground">Parking</p>
                  </div>
                </div>
              )}
              {listing.avg_rating && (
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{listing.avg_rating.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">{listing.reviews_count} reviews</p>
                  </div>
                </div>
              )}
            </div>

            {/* Amenities */}
            {listing.listing_amenities && listing.listing_amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {listing.listing_amenities.slice(0, 5).map((la: any, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs bg-gray-50 border-gray-200"
                  >
                    {la.amenities?.name}
                  </Badge>
                ))}
                {listing.listing_amenities.length > 5 && (
                  <Badge variant="outline" className="text-xs font-semibold bg-orange-50 border-orange-200 text-orange-700">
                    +{listing.listing_amenities.length - 5} more
                  </Badge>
                )}
              </div>
            )}

            {/* Footer Actions */}
            <div className="mt-auto flex items-center gap-3 pt-4">
              <Link href={`/listings/${listing.id}`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-semibold shadow-md h-11">
                  View Full Details
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              {listing.agent_phone && (
                <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
                  <Phone className="h-4 w-4" />
                </Button>
              )}
              {listing.agent_email && (
                <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
                  <Mail className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}