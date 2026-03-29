import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { NavigationPage } from "./pages/NavigationPage";
import { ExplorePage } from "./pages/ExplorePage";
import { ComparePage } from "./pages/ComparePage";
import { TripsPage } from "./pages/TripsPage";
import { LiveTrackingPage } from "./pages/LiveTrackingPage";
import { PaymentPage } from "./pages/PaymentPage";
import { BookingPage } from "./pages/BookingPage";

export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/planner", Component: NavigationPage },
  { path: "/explore", Component: ExplorePage },
  { path: "/compare", Component: ComparePage },
  { path: "/booking", Component: BookingPage },
  { path: "/trips", Component: TripsPage },
  { path: "/live-tracking", Component: LiveTrackingPage },
  { path: "/payment", Component: PaymentPage },
]);
