import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { fetchSurahWithTranslation, type SurahDetail } from '@/lib/api';

const QuranSurah = () => {
  const { id } = useParams<{ id: string }>();
  const [surah, setSurah] = useState<{ arabic: SurahDetail; english: SurahDetail } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSurah = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await fetchSurahWithTranslation(parseInt(id));
        setSurah(data);
      } catch (error) {
        console.error('Failed to load surah:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurah();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="space-y-4">
          <div className="h-8 w-32 animate-pulse rounded bg-muted" />
          <div className="h-24 animate-pulse rounded-lg bg-muted" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </Layout>
    );
  }

  if (!surah) {
    return (
      <Layout>
        <div className="text-center">
          <p>Surah not found</p>
          <Button asChild className="mt-4">
            <Link to="/quran">Go Back</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-4">
        <header className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/quran">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-primary">{surah.arabic.englishName}</h1>
            <p className="text-sm text-muted-foreground">
              {surah.arabic.englishNameTranslation} • {surah.arabic.numberOfAyahs} Ayahs
            </p>
          </div>
          <p className="ml-auto font-arabic text-2xl text-primary">{surah.arabic.name}</p>
        </header>

        {/* Bismillah for all surahs except At-Tawbah */}
        {surah.arabic.number !== 9 && (
          <Card className="bg-primary/5">
            <CardContent className="py-4 text-center">
              <p className="font-arabic text-2xl text-primary">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <p className="mt-2 text-sm text-muted-foreground">
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </CardContent>
          </Card>
        )}

        {/* Ayahs */}
        <div className="space-y-3">
          {surah.arabic.ayahs.map((ayah, index) => (
            <Card key={ayah.number}>
              <CardContent className="py-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {ayah.numberInSurah}
                  </span>
                </div>
                <p className="mb-4 text-right font-arabic text-xl leading-loose" dir="rtl">
                  {ayah.text}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {surah.english.ayahs[index]?.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default QuranSurah;
