import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import type { Surah } from '@/lib/api';

interface SurahListProps {
  surahs: Surah[];
  loading: boolean;
}

export function SurahList({ surahs, loading }: SurahListProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {surahs.map((surah) => (
        <Link key={surah.number} to={`/quran/${surah.number}`}>
          <Card className="transition-colors hover:bg-accent">
            <CardContent className="flex items-center gap-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                {surah.number}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{surah.englishName}</h3>
                <p className="text-sm text-muted-foreground">
                  {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayahs
                </p>
              </div>
              <div className="text-right">
                <p className="font-arabic text-xl text-primary">{surah.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {surah.revelationType}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
