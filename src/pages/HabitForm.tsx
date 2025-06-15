
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  CalendarClock, Check, ChevronDown, Clock, ListChecks, Palette,
  Activity, Flag, BookOpen, Heart, Dumbbell, PenLine, Coffee
} from "lucide-react";

import { useHabits } from "@/contexts/HabitContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// Define form schema with Zod
const habitSchema = z.object({
  name: z.string().min(1, "Habit name is required").max(50, "Name too long"),
  description: z.string().max(250, "Description too long").optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  category: z.string().optional(),
  frequencyType: z.enum(["daily", "weekly", "custom"]),
  timesPerWeek: z.number().min(1).max(7).optional(),
  customDays: z.array(z.string()).optional(),
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
});

type HabitFormValues = z.infer<typeof habitSchema>;

const COLORS = [
  { name: "Green", value: "#C8E6C9" },
  { name: "Blue", value: "#BBDEFB" },
  { name: "Purple", value: "#D1C4E9" },
  { name: "Pink", value: "#F8BBD0" },
  { name: "Orange", value: "#FFCC80" },
  { name: "Yellow", value: "#FFF59D" },
  { name: "Teal", value: "#B2DFDB" },
  { name: "Red", value: "#FFCDD2" },
];

const ICONS = [
  { label: "Activity", value: "🏃", icon: Activity },
  { label: "Book", value: "📚", icon: BookOpen },
  { label: "Heart", value: "❤️", icon: Heart },
  { label: "Workout", value: "💪", icon: Dumbbell },
  { label: "Write", value: "✍️", icon: PenLine },
  { label: "Coffee", value: "☕", icon: Coffee },
  { label: "Meditate", value: "🧘", icon: Activity },
  { label: "Study", value: "📝", icon: BookOpen },
];

const CATEGORIES = [
  "Fitness",
  "Health",
  "Learning",
  "Productivity",
  "Wellness",
  "Mindfulness",
  "Personal",
  "Work",
];

const DAYS_OF_WEEK = [
  { label: "Mon", value: "monday" },
  { label: "Tue", value: "tuesday" },
  { label: "Wed", value: "wednesday" },
  { label: "Thu", value: "thursday" },
  { label: "Fri", value: "friday" },
  { label: "Sat", value: "saturday" },
  { label: "Sun", value: "sunday" },
];

const HabitForm = () => {
  const navigate = useNavigate();
  const { addHabit } = useHabits();
  const [previewColor, setPreviewColor] = useState("#C8E6C9");
  const [previewIcon, setPreviewIcon] = useState("🏃");

  // Initialize the form
  const form = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: "",
      description: "",
      frequencyType: "daily",
      icon: "🏃",
      color: "#C8E6C9",
      category: "Wellness",
      difficulty: "medium",
      timesPerWeek: 3,
      customDays: ["monday", "wednesday", "friday"],
    },
  });

  // Create a preview of the habit
  const habitPreview = {
    name: form.watch("name") || "New Habit",
    description: form.watch("description") || "Habit description",
    icon: form.watch("icon") || "🏃",
    color: form.watch("color") || "#C8E6C9",
    category: form.watch("category") || "Wellness",
    frequencyType: form.watch("frequencyType"),
    timesPerWeek: form.watch("timesPerWeek") || 3,
    customDays: form.watch("customDays") || ["monday", "wednesday", "friday"],
    difficulty: form.watch("difficulty") || "medium",
  };

  const getFrequencyText = () => {
    switch (habitPreview.frequencyType) {
      case "daily":
        return "Every day";
      case "weekly":
        return `${habitPreview.timesPerWeek}x per week`;
      case "custom":
        return habitPreview.customDays
          .map(day => day.charAt(0).toUpperCase() + day.slice(1, 3))
          .join(", ");
      default:
        return "";
    }
  };

  const getDifficultyEmoji = () => {
    switch (habitPreview.difficulty) {
      case "easy": return "⭐";
      case "medium": return "⭐⭐";
      case "hard": return "⭐⭐⭐";
      default: return "⭐⭐";
    }
  };

  // Handle form submission
  const onSubmit = (data: HabitFormValues) => {
    // Convert form data to habit object
    const frequencyDescription = getFrequencyText();

    // Add the new habit
    addHabit({
      name: data.name,
      description: data.description,
      category: data.category,
      icon: data.icon,
      color: data.color,
    });

    toast.success("Habit created successfully!");
    navigate("/");
  };

  return (
    <motion.div
      className="space-y-8 max-w-3xl mx-auto pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Create New Habit</h1>
        <p className="text-growbit-text-secondary dark:text-gray-400">
          Define a new habit to track and build consistency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Basic Information</h2>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-white">Habit Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a name for your habit..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-white">Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add details about your habit..." 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-white">Category</FormLabel>
                        <FormControl>
                          <Select 
                            value={field.value} 
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Frequency Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                  <CalendarClock className="text-growbit-accent" size={20} />
                  Frequency
                </h2>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="frequencyType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="dark:text-white">How often?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="daily" id="daily" />
                              <label
                                htmlFor="daily"
                                className="flex items-center cursor-pointer dark:text-white"
                              >
                                <span className="ml-2">Every day</span>
                              </label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="weekly" id="weekly" />
                              <label
                                htmlFor="weekly"
                                className="flex items-center cursor-pointer dark:text-white"
                              >
                                <span className="ml-2">Multiple times per week</span>
                              </label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="custom" id="custom" />
                              <label
                                htmlFor="custom"
                                className="flex items-center cursor-pointer dark:text-white"
                              >
                                <span className="ml-2">Specific days</span>
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("frequencyType") === "weekly" && (
                    <FormField
                      control={form.control}
                      name="timesPerWeek"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-white">Times per week</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value?.toString()}
                              onValueChange={(value) => field.onChange(parseInt(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 time per week</SelectItem>
                                <SelectItem value="2">2 times per week</SelectItem>
                                <SelectItem value="3">3 times per week</SelectItem>
                                <SelectItem value="4">4 times per week</SelectItem>
                                <SelectItem value="5">5 times per week</SelectItem>
                                <SelectItem value="6">6 times per week</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {form.watch("frequencyType") === "custom" && (
                    <FormField
                      control={form.control}
                      name="customDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-white">Select days of the week</FormLabel>
                          <div className="grid grid-cols-7 gap-2">
                            {DAYS_OF_WEEK.map((day) => (
                              <div key={day.value} className="flex flex-col items-center">
                                <Checkbox
                                  checked={field.value?.includes(day.value) || false}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...(field.value || []), day.value]);
                                    } else {
                                      field.onChange(
                                        field.value?.filter((value) => value !== day.value) || []
                                      );
                                    }
                                  }}
                                  id={`day-${day.value}`}
                                  className="mb-1"
                                />
                                <label
                                  htmlFor={`day-${day.value}`}
                                  className="text-xs cursor-pointer dark:text-gray-300"
                                >
                                  {day.label}
                                </label>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              {/* Customization Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
                  <Palette className="text-growbit-accent" size={20} />
                  Customization
                </h2>

                <div className="space-y-4">
                  {/* Icon selection */}
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-white">Icon</FormLabel>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                          {ICONS.map((iconOption) => (
                            <button
                              key={iconOption.value}
                              type="button"
                              onClick={() => {
                                field.onChange(iconOption.value);
                                setPreviewIcon(iconOption.value);
                              }}
                              className={cn(
                                "h-10 w-10 flex items-center justify-center rounded-md border",
                                field.value === iconOption.value
                                  ? "border-growbit-primary bg-growbit-primary/10"
                                  : "border-gray-200 dark:border-gray-600 hover:border-growbit-primary/50"
                              )}
                            >
                              <span className="text-lg">{iconOption.value}</span>
                            </button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Color selection */}
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-white">Color</FormLabel>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                          {COLORS.map((color) => (
                            <button
                              key={color.value}
                              type="button"
                              onClick={() => {
                                field.onChange(color.value);
                                setPreviewColor(color.value);
                              }}
                              className={cn(
                                "h-8 w-8 rounded-full border-2",
                                field.value === color.value
                                  ? "border-growbit-primary ring-2 ring-growbit-primary/30"
                                  : "border-gray-200 dark:border-gray-600"
                              )}
                              style={{ backgroundColor: color.value }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Difficulty selection */}
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="dark:text-white">Difficulty Level</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-2"
                          >
                            <div className="flex flex-col items-center">
                              <RadioGroupItem
                                value="easy"
                                id="easy"
                                className="sr-only"
                              />
                              <label
                                htmlFor="easy"
                                className={cn(
                                  "flex flex-col items-center space-y-2 rounded-md border-2 border-muted p-4 hover:border-accent cursor-pointer",
                                  field.value === "easy" &&
                                    "border-growbit-primary bg-growbit-primary/5"
                                )}
                              >
                                <span className="text-xl">⭐</span>
                                <span className="text-xs font-medium dark:text-white">Easy</span>
                              </label>
                            </div>

                            <div className="flex flex-col items-center">
                              <RadioGroupItem
                                value="medium"
                                id="medium"
                                className="sr-only"
                              />
                              <label
                                htmlFor="medium"
                                className={cn(
                                  "flex flex-col items-center space-y-2 rounded-md border-2 border-muted p-4 hover:border-accent cursor-pointer",
                                  field.value === "medium" &&
                                    "border-growbit-primary bg-growbit-primary/5"
                                )}
                              >
                                <span className="text-xl">⭐⭐</span>
                                <span className="text-xs font-medium dark:text-white">Medium</span>
                              </label>
                            </div>

                            <div className="flex flex-col items-center">
                              <RadioGroupItem
                                value="hard"
                                id="hard"
                                className="sr-only"
                              />
                              <label
                                htmlFor="hard"
                                className={cn(
                                  "flex flex-col items-center space-y-2 rounded-md border-2 border-muted p-4 hover:border-accent cursor-pointer",
                                  field.value === "hard" &&
                                    "border-growbit-primary bg-growbit-primary/5"
                                )}
                              >
                                <span className="text-xl">⭐⭐⭐</span>
                                <span className="text-xs font-medium dark:text-white">Hard</span>
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button type="submit" className="gap-2">
                  <Check size={16} />
                  Create Habit
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 dark:text-white">
                <ListChecks size={18} />
                Preview
              </h3>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-inner">
                <div className="habit-card-preview">
                  <div 
                    className="absolute left-0 top-0 h-full w-2 rounded-l-lg"
                    style={{ backgroundColor: habitPreview.color }}
                  />
                  
                  <div className="pl-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-xl">{habitPreview.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          {habitPreview.name || "Habit Name"}
                        </h4>
                        {habitPreview.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                            {habitPreview.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">{getFrequencyText()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Flag size={14} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {getDifficultyEmoji()} {habitPreview.difficulty}
                        </span>
                      </div>
                      
                      {habitPreview.category && (
                        <div className="flex items-center gap-2">
                          <div className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300">
                            {habitPreview.category}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitForm;
