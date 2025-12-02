import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TasbihButtonProps {
  count: number;
  onTap: () => void;
  onReset: () => void;
}

export function TasbihButton({ count, onTap, onReset }: TasbihButtonProps) {
  const handleTap = () => {
    // Trigger vibration if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    onTap();
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Count display */}
      <div className="text-center">
        <p className="text-7xl font-bold text-primary">{count}</p>
        <p className="mt-2 text-muted-foreground">Tap to count</p>
      </div>

      {/* Main tap button */}
      <button
        onClick={handleTap}
        className={cn(
          'h-48 w-48 rounded-full bg-primary text-primary-foreground',
          'flex items-center justify-center',
          'shadow-lg transition-all duration-150',
          'hover:bg-primary/90 hover:shadow-xl',
          'active:scale-95 active:shadow-md'
        )}
      >
        <span className="text-6xl">☪</span>
      </button>

      {/* Reset button */}
      <Button variant="outline" onClick={onReset}>
        Reset Counter
      </Button>

      {/* Target markers */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span className={cn(count >= 33 && 'text-primary font-semibold')}>33</span>
        <span className={cn(count >= 99 && 'text-primary font-semibold')}>99</span>
        <span className={cn(count >= 100 && 'text-primary font-semibold')}>100</span>
      </div>
    </div>
  );
}
