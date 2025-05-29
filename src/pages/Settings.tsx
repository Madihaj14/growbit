
import { useUser } from "@/contexts/UserContext";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Moon, Sun, Bell, Shield, Trash2, Download } from "lucide-react";

const Settings = () => {
  const { user, toggleTheme, updateUser } = useUser();
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  // Initialize settings state from user preferences
  useEffect(() => {
    setNotificationsEnabled(user.notificationsEnabled ?? true);
    setEmailNotifications(user.emailNotifications ?? true);
    setSoundEffects(user.soundEffects ?? true);
    setAutoSave(user.autoSave ?? true);
  }, [user]);

  const handleNotificationsToggle = async (checked: boolean) => {
    try {
      updateUser({ notificationsEnabled: checked });
      setNotificationsEnabled(checked);
      toast({
        title: "Settings updated",
        description: `Notifications ${checked ? 'enabled' : 'disabled'} successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings.",
        variant: "destructive"
      });
    }
  };

  const handleEmailNotificationsToggle = async (checked: boolean) => {
    try {
      updateUser({ emailNotifications: checked });
      setEmailNotifications(checked);
      toast({
        title: "Settings updated",
        description: `Email notifications ${checked ? 'enabled' : 'disabled'} successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update email notification settings.",
        variant: "destructive"
      });
    }
  };

  const handleSoundEffectsToggle = async (checked: boolean) => {
    try {
      updateUser({ soundEffects: checked });
      setSoundEffects(checked);
      toast({
        title: "Settings updated",
        description: `Sound effects ${checked ? 'enabled' : 'disabled'} successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update sound effects settings.",
        variant: "destructive"
      });
    }
  };

  const handleAutoSaveToggle = async (checked: boolean) => {
    try {
      updateUser({ autoSave: checked });
      setAutoSave(checked);
      toast({
        title: "Settings updated",
        description: `Auto-save ${checked ? 'enabled' : 'disabled'} successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update auto-save settings.",
        variant: "destructive"
      });
    }
  };

  const handleExportData = () => {
    toast({
      title: "Export initiated",
      description: "Your data export will be ready shortly."
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Appearance Settings */}
      <Card className="p-6 space-y-6 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          {user.theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          Appearance
        </h2>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Dark Mode</Label>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark mode
            </p>
          </div>
          <Switch
            checked={user.theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 space-y-6 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </h2>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Push Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive reminders and achievement notifications
            </p>
          </div>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={handleNotificationsToggle}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive weekly progress reports via email
            </p>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={handleEmailNotificationsToggle}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Sound Effects</Label>
            <p className="text-sm text-muted-foreground">
              Play sounds for habit completions and achievements
            </p>
          </div>
          <Switch
            checked={soundEffects}
            onCheckedChange={handleSoundEffectsToggle}
          />
        </div>
      </Card>

      {/* App Preferences */}
      <Card className="p-6 space-y-6 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">App Preferences</h2>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Auto-save</Label>
            <p className="text-sm text-muted-foreground">
              Automatically save changes as you type
            </p>
          </div>
          <Switch
            checked={autoSave}
            onCheckedChange={handleAutoSaveToggle}
          />
        </div>
      </Card>

      {/* Account Information */}
      <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Account
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b dark:border-gray-600">
            <span className="text-muted-foreground">Email</span>
            <span>{user.email || "No email provided"}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b dark:border-gray-600">
            <span className="text-muted-foreground">Member since</span>
            <span>{new Date(user.joinedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b dark:border-gray-600">
            <span className="text-muted-foreground">Current Level</span>
            <span>Level {user.level}</span>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Data Management</h2>
        
        <div className="space-y-3">
          <Button 
            variant="outline" 
            onClick={handleExportData}
            className="w-full justify-start gap-2"
          >
            <Download className="h-4 w-4" />
            Export My Data
          </Button>
          
          <Button 
            variant="destructive" 
            onClick={handleDeleteAccount}
            className="w-full justify-start gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
