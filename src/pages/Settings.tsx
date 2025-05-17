
import { useUser } from "@/contexts/UserContext";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const Settings = () => {
  const { user, toggleTheme, updateUser } = useUser();
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Initialize notifications state from user preferences
  useEffect(() => {
    setNotificationsEnabled(user.notificationsEnabled ?? true);
  }, [user.notificationsEnabled]);

  const handleNotificationsToggle = async (checked: boolean) => {
    try {
      // Update the user's notification preferences in context
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

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Theme</Label>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark mode
            </p>
          </div>
          <Switch
            checked={user.theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive reminders and achievement notifications
            </p>
          </div>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={handleNotificationsToggle}
          />
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Email</span>
            <span>{user.email || "No email provided"}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Member since</span>
            <span>{new Date(user.joinedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
