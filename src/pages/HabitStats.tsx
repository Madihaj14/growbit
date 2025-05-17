
import { motion } from "framer-motion";
import { useHabits } from "@/contexts/HabitContext";
import { useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, LineChart, Line
} from "recharts";
import { format, subDays, eachDayOfInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HabitStats = () => {
  const { habits } = useHabits();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  
  // Calculate date range for selected time period
  const getDateRange = () => {
    const today = new Date();
    
    switch (timeRange) {
      case "week":
        return { start: subDays(today, 7), end: today };
      case "month":
        return { start: subDays(today, 30), end: today };
      case "year":
        return { start: subDays(today, 365), end: today };
      default:
        return { start: subDays(today, 7), end: today };
    }
  };
  
  // Generate streak data for charts
  const generateStreakData = () => {
    const { start, end } = getDateRange();
    const days = eachDayOfInterval({ start, end });
    
    return days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const completedHabits = habits.filter(habit => 
        habit.completedDates.includes(dateStr)
      ).length;
      
      return {
        date: format(day, 'MMM dd'),
        completed: completedHabits,
        total: habits.length,
        percentage: habits.length > 0 ? (completedHabits / habits.length) * 100 : 0
      };
    });
  };
  
  // Generate heatmap data
  const generateHeatmapData = () => {
    const { start, end } = getDateRange();
    const days = eachDayOfInterval({ start, end });
    
    // Create a 2D array for week days
    const weeks: any[] = [];
    let week: any[] = [];
    
    days.forEach((day, index) => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayOfWeek = day.getDay();
      const completedHabits = habits.filter(habit => 
        habit.completedDates.includes(dateStr)
      ).length;
      
      const percentage = habits.length > 0 ? (completedHabits / habits.length) * 100 : 0;
      
      week.push({
        date: dateStr,
        display: format(day, 'dd'),
        value: percentage,
        completedHabits,
        totalHabits: habits.length
      });
      
      // Start a new week after Sunday or at the end
      if (dayOfWeek === 0 || index === days.length - 1) {
        weeks.push([...week]);
        week = [];
      }
    });
    
    return weeks;
  };
  
  const streakData = generateStreakData();
  const heatmapData = generateHeatmapData();
  
  // Calculate overall stats
  const totalCompletions = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0);
  const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0);
  const bestHabit = habits.reduce((best, habit) => 
    habit.streak > (best?.streak || 0) ? habit : best, habits[0]);
  
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Habit Statistics</h1>
        
        <div className="flex gap-2">
          <Button 
            variant={timeRange === "week" ? "default" : "outline"} 
            onClick={() => setTimeRange("week")}
          >
            Week
          </Button>
          <Button 
            variant={timeRange === "month" ? "default" : "outline"} 
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button 
            variant={timeRange === "year" ? "default" : "outline"} 
            onClick={() => setTimeRange("year")}
          >
            Year
          </Button>
        </div>
      </div>
      
      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Completions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCompletions}</div>
            <p className="text-sm text-muted-foreground">Across all habits</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Longest Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{longestStreak} days</div>
            <p className="text-sm text-muted-foreground">Your best consistency</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Best Habit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bestHabit?.name || "N/A"}</div>
            <p className="text-sm text-muted-foreground">
              {bestHabit ? `${bestHabit.streak} day streak` : "Add habits to see stats"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Visualization Tabs */}
      <Tabs defaultValue="completion-rate">
        <TabsList className="mb-4">
          <TabsTrigger value="completion-rate">Completion Rate</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="streaks">Streak Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="completion-rate" className="p-0">
          <Card>
            <CardHeader>
              <CardTitle>Daily Completion Rate</CardTitle>
              <CardDescription>Percentage of habits completed each day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={streakData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value.toFixed(0)}%`, 'Completion Rate']} />
                    <Legend />
                    <Bar dataKey="percentage" fill="#4ade80" name="Completion Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="heatmap" className="p-0">
          <Card>
            <CardHeader>
              <CardTitle>Habit Completion Heatmap</CardTitle>
              <CardDescription>Visualize your habit consistency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {heatmapData.map((week, weekIndex) => (
                  <div key={`week-${weekIndex}`} className="flex gap-1">
                    {week.map((day: any) => (
                      <div
                        key={day.date}
                        className="relative w-12 h-12 rounded flex items-center justify-center cursor-pointer group"
                        style={{
                          backgroundColor: day.value === 0 
                            ? '#f1f5f9' 
                            : `rgba(74, 222, 128, ${day.value / 100})`
                        }}
                        title={`${format(new Date(day.date), 'MMM dd, yyyy')}: ${day.completedHabits}/${day.totalHabits} habits completed`}
                      >
                        <span className="text-xs">{day.display}</span>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs rounded p-1 hidden group-hover:block z-10 whitespace-nowrap">
                          {format(new Date(day.date), 'MMM dd, yyyy')}: {day.completedHabits}/{day.totalHabits}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                
                {/* Heatmap legend */}
                <div className="flex items-center justify-end mt-4 gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded bg-slate-100 mr-1"></div>
                    <span className="text-xs">0%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded bg-green-200 mr-1"></div>
                    <span className="text-xs">25%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded bg-green-300 mr-1"></div>
                    <span className="text-xs">50%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded bg-green-400 mr-1"></div>
                    <span className="text-xs">75%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded bg-green-500 mr-1"></div>
                    <span className="text-xs">100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="streaks" className="p-0">
          <Card>
            <CardHeader>
              <CardTitle>Habit Streak Trends</CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={streakData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#4ade80" 
                      activeDot={{ r: 8 }} 
                      name="Habits Completed"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#94a3b8" 
                      name="Total Habits"
                      strokeDasharray="3 3"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Individual Habit Performance */}
      {habits.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Individual Habit Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map(habit => {
              const completedCount = habit.completedDates.length;
              const totalDays = Math.max(1, Math.ceil(
                (new Date().getTime() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24)
              ));
              const completionRate = (completedCount / totalDays) * 100;
              
              return (
                <Card key={habit.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{habit.icon || "📝"}</span>
                      <CardTitle>{habit.name}</CardTitle>
                    </div>
                    <CardDescription>Created {format(new Date(habit.createdAt), 'MMM dd, yyyy')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Completion rate</span>
                      <span className="text-sm font-medium">{completionRate.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-growbit-primary h-2 rounded-full"
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Current streak</p>
                        <p className="font-semibold">{habit.streak} days</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Best streak</p>
                        <p className="font-semibold">{habit.bestStreak} days</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total completions</p>
                        <p className="font-semibold">{completedCount} days</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">XP earned</p>
                        <p className="font-semibold">{habit.xp}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-slate-50 rounded-lg">
          <p className="text-slate-500">Add habits to view performance statistics</p>
        </div>
      )}
    </motion.div>
  );
};

export default HabitStats;
