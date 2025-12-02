import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface NextPrayerCountdownProps {
  prayerTimes: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  } | null;
  onNextPrayerChange: (prayer: string) => void;
}

const prayerOrder = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

function parseTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function NextPrayerCountdown({ prayerTimes, onNextPrayerChange }: NextPrayerCountdownProps) {
  const [countdown, setCountdown] = useState<string>('--:--:--');
  const [nextPrayer, setNextPrayer] = useState<string>('');

  useEffect(() => {
    if (!prayerTimes) return;

    const updateCountdown = () => {
      const now = new Date();
      let next: { name: string; time: Date } | null = null;

      for (const prayer of prayerOrder) {
        const prayerTime = parseTime(prayerTimes[prayer]);
        if (prayerTime > now) {
          next = { name: prayer, time: prayerTime };
          break;
        }
      }

      // If no prayer found today, use Fajr of next day
      if (!next) {
        const fajrTime = parseTime(prayerTimes.Fajr);
        fajrTime.setDate(fajrTime.getDate() + 1);
        next = { name: 'Fajr', time: fajrTime };
      }

      setNextPrayer(next.name);
      onNextPrayerChange(next.name);

      const diff = next.time.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes, onNextPrayerChange]);

  if (!prayerTimes) return null;

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardContent className="py-6 text-center">
        <p className="text-sm opacity-90">Next Prayer</p>
        <h2 className="text-2xl font-bold">{nextPrayer}</h2>
        <p className="mt-2 font-mono text-4xl font-bold tracking-wider">
          {countdown}
        </p>
      </CardContent>
    </Card>
  );
}
