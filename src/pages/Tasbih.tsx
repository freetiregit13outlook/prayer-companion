import { Layout } from '@/components/Layout';
import { TasbihButton } from '@/components/TasbihButton';
import { Card, CardContent } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const Tasbih = () => {
  const [count, setCount] = useLocalStorage('tasbih-count', 0);

  const handleTap = () => {
    setCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <Layout>
      <div className="space-y-4">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-primary">Tasbih Counter</h1>
          <p className="text-sm text-muted-foreground">Digital prayer beads</p>
        </header>

        <Card>
          <CardContent className="py-8">
            <TasbihButton count={count} onTap={handleTap} onReset={handleReset} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <h3 className="mb-2 font-semibold">Common Dhikr</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>SubhanAllah</strong> - Glory be to Allah (33x)</p>
              <p><strong>Alhamdulillah</strong> - Praise be to Allah (33x)</p>
              <p><strong>Allahu Akbar</strong> - Allah is the Greatest (34x)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Tasbih;
