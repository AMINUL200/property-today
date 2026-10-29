import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/public/landing/LandingPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import SiteSettings from "./pages/admin/settings/SiteSettings";
import AdminProfile from "./pages/admin/profile/AdminProfile";
import PropertyDetails from "./pages/public/property/PropertyDetails";
import ContactPage from "./pages/public/contact/ContactPage";
import AboutPage from "./pages/public/about/AboutPage";
import RentPage from "./pages/public/property/RentPage";
import BuyPage from "./pages/public/property/BuyPage";
import SellPage from "./pages/public/property/SellPage";
import ListPropertyPage from "./pages/public/property/ListPropertyPage";
import ListPropertyRentPage from "./pages/public/property/ListPropertyRentPage";
import LandPage from "./pages/public/property/LandPage";
import LocationsPage from "./pages/listing/LocationsPage";
import AgentLayout from "./layout/AgentLayout";
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentProfile from "./pages/agent/AgentProfile";
import ProtectedRoute from "./service/ProtectedRoute";
import ManagePropertyType from "./pages/admin/property/ManagePropertyType";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<AppLayout />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="property/:Id" element={<PropertyDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Rent page */}
          <Route path="/rent/" element={<RentPage />} />
          <Route path="/rent/:category" element={<RentPage />} />
          {/* Buy */}
          <Route path="buy" element={<BuyPage />} />
          <Route path="buy/:category" element={<BuyPage />} />
          <Route path="sell" element={<SellPage />} />
          <Route path="list-property" element={<ListPropertyPage />} />
          <Route path="list-property/rent" element={<ListPropertyRentPage />} />

          <Route path="land" element={<LandPage />} />
          <Route path="land/:category" element={<LandPage />} />

          <Route path="locations" element={<LocationsPage />} />
          <Route path="locations/:cityId" element={<LocationsPage />} />
        </Route>

        <Route
          path="/agent"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentLayout />
             </ProtectedRoute>
          }
        >
          <Route index element={<AgentDashboard />} />
          <Route path="profile" element={<AgentProfile />} />
          {/* Add more agent routes here as you build them */}
        </Route>

        {/* Admin Layout */}
        <Route
          path="/admin"
          element={
            // <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            // </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          {/* Additional admin routes can be added here */}
          <Route path="site-settings" element={<SiteSettings />} />
          <Route path="profile" element={<AdminProfile />} />

          {/* Manage Property routes  */}
          <Route path="properties/types" element={<ManagePropertyType />} />

          
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
