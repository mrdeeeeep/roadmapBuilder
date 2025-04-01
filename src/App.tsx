import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Home from "@/pages/Home";
import Roadmaps from "@/pages/Roadmaps";
import Create from "@/pages/Create";
import RoadmapDetail from "@/pages/RoadmapDetail";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Login from '@/pages/Login';
import Register from '@/pages/Register';

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/roadmaps"
              element={
                <PrivateRoute>
                  <Layout>
                    <Roadmaps />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <Layout>
                    <Create />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/roadmap/:id"
              element={
                <PrivateRoute>
                  <Layout>
                    <RoadmapDetail />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
