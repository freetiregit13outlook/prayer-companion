import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { SurahList } from '@/components/SurahList';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { fetchAllSurahs, type Surah } from '@/lib/api';

const Quran = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await fetchAllSurahs();
        setSurahs(data);
      } catch (error) {
        console.error('Failed to load surahs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurahs();
  }, []);

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(search.toLowerCase()) ||
      surah.englishNameTranslation.toLowerCase().includes(search.toLowerCase()) ||
      surah.number.toString().includes(search)
  );

  return (
    <Layout>
      <div className="space-y-4">
        <header>
          <h1 className="text-2xl font-bold text-primary">Holy Quran</h1>
          <p className="text-sm text-muted-foreground">114 Surahs</p>
        </header>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search surah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <SurahList surahs={filteredSurahs} loading={loading} />
      </div>
    </Layout>
  );
};

export default Quran;
