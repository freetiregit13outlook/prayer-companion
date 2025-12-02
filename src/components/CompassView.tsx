import { cn } from '@/lib/utils';

interface CompassViewProps {
  qiblaDirection: number;
  compassHeading: number;
}

export function CompassView({ qiblaDirection, compassHeading }: CompassViewProps) {
  // Calculate the rotation needed to point to Qibla
  // When facing north (compassHeading = 0), the Kaaba should be at qiblaDirection degrees
  const rotation = qiblaDirection - compassHeading;

  return (
    <div className="relative flex items-center justify-center">
      {/* Compass background */}
      <div 
        className="relative h-72 w-72 rounded-full border-4 border-primary/20 bg-card shadow-lg"
        style={{ transform: `rotate(${-compassHeading}deg)` }}
      >
        {/* Cardinal directions */}
        <span className="absolute left-1/2 top-4 -translate-x-1/2 text-lg font-bold text-primary">N</span>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">E</span>
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-lg font-bold text-muted-foreground">S</span>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">W</span>
        
        {/* Degree markers */}
        {[...Array(36)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'absolute left-1/2 top-0 h-3 w-0.5 -translate-x-1/2 bg-border',
              i % 9 === 0 && 'h-4 w-1 bg-muted-foreground'
            )}
            style={{
              transformOrigin: '50% 144px',
              transform: `rotate(${i * 10}deg)`,
            }}
          />
        ))}
      </div>

      {/* Kaaba pointer */}
      <div
        className="absolute h-72 w-72"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center">
          <div className="h-24 w-1 bg-primary" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-xs font-bold">🕋</span>
          </div>
        </div>
      </div>

      {/* Center point */}
      <div className="absolute h-4 w-4 rounded-full bg-primary" />
    </div>
  );
}
