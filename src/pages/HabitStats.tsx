
import { motion } from "framer-motion";
import { useHabits } from "@/contexts/HabitContext";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, Target, Award } from "lucide-react";
import { format, subDays, eachDayOfInterval } from "date-fns";

const HabitStats = () => {
  const { habits, getTotalXp } = useHabits();

  // Calculate completion rate over last 30 days
  const getLast30DaysData = () => {
    const endDate = new Date();
    const startDate = subDays(endDate, 29);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
    
    return dateRange.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const totalHabits = habits.length;
      const completedHabits = habits.filter(habit => 
        habit.completedDates.includes(dateStr)
      ).length;
      
      return {
        date: format(date, 'MMM dd'),
        completed: completedHabits,
        total: totalHabits,
        rate: totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0
      };
    });
  };

  // Get habit categories data
  const getCategoryData = () => {
    const categories = habits.reduce((acc, habit) => {
      const category = habit.category || 'Other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  };

  // Get streak distribution
  const getStreakData = () => {
    return habits.map(habit => ({
      name: habit.name,
      streak: habit.streak,
      bestStreak: habit.bestStreak
    }));
  };

  // Calculate stats
  const totalCompletions = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0);
  const averageStreak = habits.length > 0 ? 
    Math.round(habits.reduce((sum, habit) => sum + habit.streak, 0) / habits.length) : 0;
  const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.bestStreak), 0);
  const totalXp = getTotalXp();

  const last30DaysData = getLast30DaysData();
  const categoryData = getCategoryData();
  const streakData = getStreakData();

  const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "#8B5CF6",
    },
    rate: {
      label: "Completion Rate",
      color: "#10B981",
    },
    streak: {
      label: "Current Streak",
      color: "#3B82F6",
    },
    bestStreak: {
      label: "Best Streak",
      color: "#F59E0B",
    },
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Habit Statistics</h1>
        <p className="text-growbit-text-secondary">
          Analyze your habit performance and track your progress over time.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletions}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageStreak} days</div>
            <p className="text-xs text-muted-foreground">Current average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{longestStreak} days</div>
            <p className="text-xs text-muted-foreground">Personal best</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalXp}</div>
            <p className="text-xs text-muted-foreground">Experience points</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Rate Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Completion Rate (Last 30 Days)</CardTitle>
            <CardDescription>Daily habit completion percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last30DaysData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [`${value}%`, "Completion Rate"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="var(--color-rate)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-rate)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Habit Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Habit Categories</CardTitle>
            <CardDescription>Distribution of habits by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Streak Comparison */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Streak Comparison</CardTitle>
            <CardDescription>Current vs best streaks for each habit</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={streakData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="streak" fill="var(--color-streak)" name="Current Streak" />
                  <Bar dataKey="bestStreak" fill="var(--color-bestStreak)" name="Best Streak" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default HabitStats;
