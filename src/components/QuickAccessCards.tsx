import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Compass, MapPin, Circle } from 'lucide-react';

const quickLinks = [
  { path: '/quran', icon: BookOpen, label: 'Quran', color: 'bg-primary/10 text-primary' },
  { path: '/qibla', icon: Compass, label: 'Qibla', color: 'bg-accent text-accent-foreground' },
  { path: '/tasbih', icon: Circle, label: 'Tasbih', color: 'bg-secondary text-secondary-foreground' },
  { path: '/mosque', icon: MapPin, label: 'Mosque', color: 'bg-muted text-muted-foreground' },
];

export function QuickAccessCards() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {quickLinks.map(({ path, icon: Icon, label, color }) => (
        <Link key={path} to={path}>
          <Card className="transition-transform hover:scale-105 active:scale-95">
            <CardContent className="flex flex-col items-center justify-center p-4">
              <div className={`rounded-full p-3 ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="mt-2 text-xs font-medium">{label}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
