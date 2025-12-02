import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { PrayerTimesCard } from '@/components/PrayerTimesCard';
import { NextPrayerCountdown } from '@/components/NextPrayerCountdown';
import { DateDisplay } from '@/components/DateDisplay';
import { QuickAccessCards } from '@/components/QuickAccessCards';
import { useLocation } from '@/hooks/useLocation';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';

const Index = () => {
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const { location, loading: locationLoading } = useLocation();
  const { prayerTimes, hijriDate, loading: prayerLoading } = usePrayerTimes(
    location?.latitude ?? null,
    location?.longitude ?? null
  );

  const loading = locationLoading || prayerLoading;

  return (
    <Layout>
      <div className="space-y-4">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-2xl font-bold text-primary">Prayer Times</h1>
        </header>

        {/* Date and Location */}
        <DateDisplay 
          hijriDate={hijriDate} 
          city={location?.city} 
          country={location?.country} 
        />

        {/* Next Prayer Countdown */}
        <NextPrayerCountdown 
          prayerTimes={prayerTimes} 
          onNextPrayerChange={setNextPrayer} 
        />

        {/* Prayer Times Grid */}
        <PrayerTimesCard 
          prayerTimes={prayerTimes} 
          nextPrayer={nextPrayer} 
          loading={loading} 
        />

        {/* Quick Access */}
        <section>
          <h2 className="mb-3 text-lg font-semibold">Quick Access</h2>
          <QuickAccessCards />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
