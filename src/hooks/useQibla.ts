import { useState, useEffect } from 'react';

export function useQibla(latitude: number | null, longitude: number | null) {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [compassHeading, setCompassHeading] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Qibla direction from API
  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchQibla = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`
        );
        const data = await response.json();
        
        if (data.code === 200) {
          setQiblaDirection(data.data.direction);
        } else {
          setError('Failed to fetch Qibla direction');
        }
      } catch {
        setError('Failed to fetch Qibla direction');
      } finally {
        setLoading(false);
      }
    };

    fetchQibla();
  }, [latitude, longitude]);

  // Device orientation for compass
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        // Alpha is the compass direction the device is facing
        setCompassHeading(event.alpha);
      }
    };

    // Request permission for iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return { qiblaDirection, compassHeading, loading, error };
}
