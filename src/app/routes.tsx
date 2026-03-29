import { createBrowserRouter, Outlet } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { NavigationPage } from "./pages/NavigationPage";
import { ExplorePage } from "./pages/ExplorePage";
import { ComparePage } from "./pages/ComparePage";
import { TripsPage } from "./pages/TripsPage";
import { LiveTrackingPage } from "./pages/LiveTrackingPage";
import { PaymentPage } from "./pages/PaymentPage";
import { BookingPage } from "./pages/BookingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

// Wrapper component for protected routes
function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

export const router = createBrowserRouter([
  // Public routes
  { path: "/login", Component: LoginPage },
  { path: "/signup", Component: SignupPage },
  
  // Protected routes - require authentication
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/", Component: HomePage },
      { path: "/planner", Component: NavigationPage },
      { path: "/explore", Component: ExplorePage },
      { path: "/compare", Component: ComparePage },
      { path: "/booking", Component: BookingPage },
      { path: "/trips", Component: TripsPage },
      { path: "/live-tracking", Component: LiveTrackingPage },
      { path: "/payment", Component: PaymentPage },
    ]
  }
]);
