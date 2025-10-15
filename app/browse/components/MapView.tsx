'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Square, Star } from 'lucide-react';

// Fix Leaflet marker icon paths (Next.js quirk)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface MapViewProps {
  listings: any[];
}

export default function MapView({ listings }: MapViewProps) {
  const kenyaCenter: [number, number] = [-0.0236, 37.9062]; // center on Kenya

  return (
    <div className="w-full h-[80vh] rounded-lg overflow-hidden border shadow-sm">
      <MapContainer
        center={kenyaCenter}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup chunkedLoading>
          {listings
            .filter((l) => l.latitude && l.longitude)
            .map((l) => (
              <Marker key={l.id} position={[l.latitude, l.longitude]}>
                <Popup maxWidth={300} minWidth={220}>
                  <ListingPopup listing={l} />
                </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>

        <FitBounds listings={listings} />
      </MapContainer>
    </div>
  );
}

// Fit map to bounds of listings
function FitBounds({ listings }: { listings: any[] }) {
  const map = useMap();

  useEffect(() => {
    const coords = listings
      .filter((l) => l.latitude && l.longitude)
      .map((l) => [l.latitude, l.longitude]);
    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [listings, map]);

  return null;
}

// Popup component for each listing
function ListingPopup({ listing }: { listing: any }) {
  const image =
    listing.listing_images?.find((i: any) => i.is_primary)?.url ||
    listing.listing_images?.[0]?.url ||
    '/placeholder.jpg';

  return (
    <Card className="overflow-hidden border-none shadow-none w-[240px]">
      <div className="relative h-32 w-full">
        <Image
          src={image}
          alt={listing.title}
          fill
          className="object-cover rounded-md"
        />
        {listing.verification_status === 'verified' && (
          <Badge className="absolute top-2 left-2 bg-green-600">Verified</Badge>
        )}
      </div>
      <CardContent className="p-3 space-y-1">
        <Link href={`/listings/${listing.id}`}>
          <h3 className="font-semibold text-base line-clamp-1 hover:text-primary transition-colors">
            {listing.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {listing.town || listing.counties?.name}
        </p>
        <p className="font-bold text-primary text-lg">
          KES {listing.price.toLocaleString()}
        </p>
        {listing.size_sqm && (
          <p className="text-sm flex items-center gap-1 text-muted-foreground">
            <Square className="h-3 w-3" /> {listing.size_sqm} m²
          </p>
        )}
        {listing.avg_rating && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            {listing.avg_rating.toFixed(1)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
