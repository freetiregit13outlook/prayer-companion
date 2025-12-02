import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import { User, LogOut, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const calculationMethods = [
  { value: 'MWL', label: 'Muslim World League' },
  { value: 'ISNA', label: 'Islamic Society of North America' },
  { value: 'Egypt', label: 'Egyptian General Authority' },
  { value: 'Makkah', label: 'Umm al-Qura, Makkah' },
  { value: 'Karachi', label: 'University of Islamic Sciences, Karachi' },
  { value: 'Tehran', label: 'Institute of Geophysics, Tehran' },
  { value: 'Jafari', label: 'Shia Ithna-Ashari, Jafari' },
];

const madhabs = [
  { value: 'Hanafi', label: 'Hanafi' },
  { value: 'Shafi', label: "Shafi'i" },
];

const Settings = () => {
  const { settings, updateSettings } = useSettings();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Layout>
      <div className="space-y-4">
        <header>
          <h1 className="text-2xl font-bold text-primary">Settings</h1>
        </header>

        {/* Account Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent>
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {user?.photo && (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">Not signed in</p>
                </div>
                <Button asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <Label className="mb-2 block text-sm">Theme</Label>
            <ThemeToggle />
          </CardContent>
        </Card>

        {/* Prayer Settings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Prayer Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-2 block text-sm">Calculation Method</Label>
              <Select
                value={settings.calculationMethod}
                onValueChange={(value) =>
                  updateSettings({ calculationMethod: value as any })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {calculationMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block text-sm">Madhab (for Asr)</Label>
              <Select
                value={settings.madhab}
                onValueChange={(value) => updateSettings({ madhab: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {madhabs.map((madhab) => (
                    <SelectItem key={madhab.value} value={madhab.value}>
                      {madhab.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Prayer Reminders</p>
                <p className="text-sm text-muted-foreground">
                  Get notified before prayer times
                </p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) =>
                  updateSettings({ notifications: checked })
                }
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Full notification support coming with Capacitor integration.
            </p>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold">Prayer Times App</p>
                <p className="text-sm text-muted-foreground">Version 1.0.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
