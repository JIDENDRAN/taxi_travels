import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DesktopLayout from './components/desktop/DesktopLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import FloatingButtons from './components/FloatingButtons';
import MobileBottomNav from './components/MobileBottomNav';
import { BookingProvider } from './context/BookingContext';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'AW-18225094695', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  // Dynamic Route Titles
  useEffect(() => {
    const routeTitles = {
      '/': 'Madurai Best Taxi Travels | Outstation Cabs, Airport Transfers & South India Tours',
      '/about': 'About Us | Madurai Best Taxi Travels | Trusted Cab Operator in Palanganatham',
      '/vehicles': 'Our Fleet - Innova Crysta, Etios & Tempo Travellers | Madurai Best Taxi Travels',
      '/packages': 'South India Tour Packages | Madurai Best Taxi Travels',
      '/gallery': 'Travel Memories & Fleet Gallery | Madurai Best Taxi Travels',
      '/contact': 'Contact Us 24/7 | Madurai Best Taxi Travels | Palanganatham, Madurai',
      '/privacy-policy': 'Privacy Policy | Madurai Best Taxi Travels',
      '/terms-and-conditions': 'Terms & Conditions | Madurai Best Taxi Travels',
      '/madurai-taxi-service': 'Madurai Taxi Service & 24/7 Cab Booking | Madurai Best Taxi Travels',
      '/madurai-airport-taxi': 'Madurai Airport Taxi & Transfers | Madurai Best Taxi Travels',
      '/madurai-tour-packages': 'Best Madurai Tour Packages | Madurai Best Taxi Travels',
      '/madurai-to-rameswaram-taxi': 'Madurai to Rameswaram Taxi & Cabs | Madurai Best Taxi Travels',
      '/madurai-to-kodaikanal-taxi': 'Madurai to Kodaikanal Taxi Service | Madurai Best Taxi Travels',
      '/tempo-traveller-rental-madurai': 'Tempo Traveller Rental in Madurai | Madurai Best Taxi Travels'
    };

    document.title = routeTitles[location.pathname] || routeTitles['/'];
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-sand-50 text-ink-900">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    );
  }

  return (
    <BookingProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] btn btn-dark">
        Skip to content
      </a>
      <div className="min-h-screen flex flex-col bg-sand-50 text-ink-900 pb-[72px] lg:pb-0">
        <DesktopLayout />
        <FloatingButtons />
        <MobileBottomNav />
      </div>
    </BookingProvider>
  );
};

export default function App() {
  return <AppContent />;
}
