import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/context/SettingsContext';

export function ThemeToggle() {
  const { settings, updateSettings } = useSettings();

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="flex gap-2">
      {themes.map(({ value, icon: Icon, label }) => (
        <Button
          key={value}
          variant={settings.theme === value ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateSettings({ theme: value })}
          className="flex-1"
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
