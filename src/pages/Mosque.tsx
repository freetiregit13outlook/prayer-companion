import { useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from '@/hooks/useLocation';
import { MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Mosque = () => {
  const { location, loading, error } = useLocation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!location || !mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(
      [location.latitude, location.longitude],
      15
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add user location marker
    const userMarker = L.marker([location.latitude, location.longitude])
      .addTo(map)
      .bindPopup('You are here')
      .openPopup();

    // Create a custom green icon for mosques
    const mosqueIcon = L.divIcon({
      className: 'mosque-marker',
      html: '<div style="background-color: hsl(145, 85%, 32%); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">🕌</div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Add some placeholder mosque markers (in real app, use Google Places API via Capacitor)
    const placeholderMosques = [
      { lat: location.latitude + 0.003, lng: location.longitude + 0.002, name: 'Local Mosque 1' },
      { lat: location.latitude - 0.002, lng: location.longitude + 0.004, name: 'Community Mosque' },
      { lat: location.latitude + 0.001, lng: location.longitude - 0.003, name: 'Central Masjid' },
    ];

    placeholderMosques.forEach((mosque) => {
      L.marker([mosque.lat, mosque.lng], { icon: mosqueIcon })
        .addTo(map)
        .bindPopup(mosque.name);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [location]);

  return (
    <Layout>
      <div className="space-y-4">
        <header>
          <h1 className="text-2xl font-bold text-primary">Mosque Finder</h1>
          <p className="text-sm text-muted-foreground">Find mosques near you</p>
        </header>

        {loading ? (
          <div className="h-80 animate-pulse rounded-lg bg-muted" />
        ) : error ? (
          <Card>
            <CardContent className="py-8 text-center">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-destructive">{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Please enable location services to find nearby mosques.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div ref={mapRef} className="h-80 overflow-hidden rounded-lg border" />

            {location && (
              <Card>
                <CardContent className="py-4">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">
                        {location.city}, {location.country}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <p className="text-center text-xs text-muted-foreground">
              Showing placeholder mosque locations. Full mosque search will be available with Google Places API via Capacitor.
            </p>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Mosque;
