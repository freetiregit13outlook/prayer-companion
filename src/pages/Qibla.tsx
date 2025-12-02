import { Layout } from '@/components/Layout';
import { CompassView } from '@/components/CompassView';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from '@/hooks/useLocation';
import { useQibla } from '@/hooks/useQibla';
import { MapPin, Compass } from 'lucide-react';

const Qibla = () => {
  const { location, loading: locationLoading } = useLocation();
  const { qiblaDirection, compassHeading, loading: qiblaLoading, error } = useQibla(
    location?.latitude ?? null,
    location?.longitude ?? null
  );

  const loading = locationLoading || qiblaLoading;

  return (
    <Layout>
      <div className="space-y-4">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-primary">Qibla Direction</h1>
          <p className="text-sm text-muted-foreground">Find the direction to Makkah</p>
        </header>

        {loading ? (
          <div className="flex h-80 items-center justify-center">
            <div className="h-72 w-72 animate-pulse rounded-full bg-muted" />
          </div>
        ) : error ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-destructive">{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Please enable location services to find Qibla direction.
              </p>
            </CardContent>
          </Card>
        ) : qiblaDirection !== null ? (
          <>
            <div className="flex justify-center py-4">
              <CompassView qiblaDirection={qiblaDirection} compassHeading={compassHeading} />
            </div>

            <Card>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Qibla Direction</span>
                  </div>
                  <span className="font-semibold">{qiblaDirection.toFixed(1)}°</span>
                </div>
              </CardContent>
            </Card>

            {location && (
              <Card>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Your Location</span>
                    </div>
                    <span className="font-semibold">
                      {location.city}, {location.country}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            <p className="text-center text-xs text-muted-foreground">
              Point your phone in the direction of the arrow to face the Kaaba.
              For best results, hold your phone flat and rotate slowly.
            </p>
          </>
        ) : null}
      </div>
    </Layout>
  );
};

export default Qibla;
