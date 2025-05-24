
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "@/hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";

// Admin routes
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import CompanySettings from "./pages/admin/CompanySettings";
import LogsView from "./pages/admin/LogsView";

// Employee routes
import MapView from "./pages/employee/MapView";
import SavedViews from "./pages/employee/SavedViews";
import SavedFilters from "./pages/employee/SavedFilters";
import Reports from "./pages/employee/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<PrivateRoute allowedRole="admin"><AdminLayout /></PrivateRoute>}>
              <Route path="" element={<Navigate to="/admin/dashboard" />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="settings" element={<CompanySettings />} />
              <Route path="logs" element={<LogsView />} />
            </Route>
            
            {/* Employee routes */}
            <Route path="/properties" element={<PrivateRoute allowedRole="employee"><EmployeeLayout /></PrivateRoute>}>
              <Route path="" element={<Navigate to="/properties/map" />} />
              <Route path="map" element={<MapView />} />
              <Route path="saved-views" element={<SavedViews />} />
              <Route path="filters" element={<SavedFilters />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
