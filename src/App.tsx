import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HabitProvider } from "./contexts/HabitContext";
import { UserProvider } from "./contexts/UserContext";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";

// Import other pages when we create them
// import Habits from "./pages/Habits";
// import Leaderboard from "./pages/Leaderboard";
// import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HabitProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Dashboard /></Layout>} />
              {/* Placeholder routes - to be implemented */}
              {/* Using Dashboard for all routes temporarily. These would be replaced with proper pages */}
              <Route path="/habits" element={<Layout><Dashboard /></Layout>} />
              <Route path="/leaderboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/profile" element={<Layout><Dashboard /></Layout>} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </HabitProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
