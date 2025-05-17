
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HabitProvider } from "./contexts/HabitContext";
import { UserProvider } from "./contexts/UserContext";
import Dashboard from "./pages/Dashboard";
import HabitForm from "./pages/HabitForm";
import HabitStats from "./pages/HabitStats"; // Add import for HabitStats
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <HabitProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/auth" 
                element={user ? <Navigate to="/" /> : <Auth />} 
              />
              <Route
                path="/"
                element={
                  user ? (
                    <Layout>
                      <Dashboard />
                    </Layout>
                  ) : (
                    <Navigate to="/auth" />
                  )
                }
              />
              <Route
                path="/habits/new"
                element={
                  user ? (
                    <Layout>
                      <HabitForm />
                    </Layout>
                  ) : (
                    <Navigate to="/auth" />
                  )
                }
              />
              {/* Add Route for HabitStats */}
              <Route
                path="/stats"
                element={
                  user ? (
                    <Layout>
                      <HabitStats />
                    </Layout>
                  ) : (
                    <Navigate to="/auth" />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  user ? (
                    <Layout>
                      <Profile />
                    </Layout>
                  ) : (
                    <Navigate to="/auth" />
                  )
                }
              />
              <Route
                path="/settings"
                element={
                  user ? (
                    <Layout>
                      <Settings />
                    </Layout>
                  ) : (
                    <Navigate to="/auth" />
                  )
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </HabitProvider>
    </QueryClientProvider>
  );
};

export default App;
