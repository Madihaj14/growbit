
import { useUser } from "@/contexts/UserContext";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

const Profile = () => {
  const { user } = useUser();
  
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      return data;
    },
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <img src={profile?.avatar_url || '/placeholder.svg'} alt="Profile" />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{profile?.username || 'User'}</h1>
              <p className="text-muted-foreground">Joined {new Date(user.joinedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{user.totalHabitsCompleted}</div>
            <div className="text-sm text-muted-foreground">Habits Completed</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{user.longestStreak}</div>
            <div className="text-sm text-muted-foreground">Longest Streak</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{user.level}</div>
            <div className="text-sm text-muted-foreground">Level</div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {user.badges.map((badge) => (
            <Badge
              key={badge.id}
              variant={badge.unlocked ? "default" : "secondary"}
              className="p-2 flex items-center gap-2 justify-center"
            >
              {badge.icon} {badge.name}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Profile;
