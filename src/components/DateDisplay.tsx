import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';

interface DateDisplayProps {
  hijriDate: {
    day: string;
    month: { en: string; ar: string };
    year: string;
  } | null;
  city?: string;
  country?: string;
}

export function DateDisplay({ hijriDate, city, country }: DateDisplayProps) {
  const gregorianDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {gregorianDate}
            </div>
            {hijriDate && (
              <p className="text-lg font-semibold text-primary">
                {hijriDate.day} {hijriDate.month.en} {hijriDate.year} AH
              </p>
            )}
          </div>
          {city && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{city}{country ? `, ${country}` : ''}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
