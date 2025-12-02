import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrayerTimesCardProps {
  prayerTimes: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  } | null;
  nextPrayer: string | null;
  loading: boolean;
}

const prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
const prayerLabels: Record<string, string> = {
  Fajr: 'Fajr',
  Sunrise: 'Sunrise',
  Dhuhr: 'Dhuhr',
  Asr: 'Asr',
  Maghrib: 'Maghrib',
  Isha: 'Isha',
};

export function PrayerTimesCard({ prayerTimes, nextPrayer, loading }: PrayerTimesCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5" />
            Prayer Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prayerTimes) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Prayer Times
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {prayerNames.map((prayer) => (
            <div
              key={prayer}
              className={cn(
                'flex flex-col items-center rounded-lg p-3 transition-colors',
                nextPrayer === prayer
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary'
              )}
            >
              <span className="text-xs font-medium opacity-80">
                {prayerLabels[prayer]}
              </span>
              <span className="text-sm font-bold">
                {prayerTimes[prayer as keyof typeof prayerTimes]}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
