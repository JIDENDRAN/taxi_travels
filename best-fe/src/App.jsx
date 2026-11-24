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
      '/': 'Madurai Best Travels | Best Taxi Service in Madurai & Outstation Cabs',
      '/about': 'About Us | Madurai Best Travels | Trusted Cab Operator in Palanganatham',
      '/vehicles': 'Our Fleet - Innova Crysta, Etios & Tempo Travellers | Madurai Best Travels',
      '/packages': 'South India Tour Packages | Madurai Best Travels',
      '/gallery': 'Travel Memories & Fleet Gallery | Madurai Best Travels',
      '/contact': 'Contact Us 24/7 | Madurai Best Travels | Palanganatham, Madurai',
      '/privacy-policy': 'Privacy Policy | Madurai Best Travels',
      '/terms-and-conditions': 'Terms & Conditions | Madurai Best Travels',
      '/blog': 'Travel Guides & Tips | Madurai Best Travels',
      '/madurai-taxi-service': 'Madurai Taxi Service & 24/7 Cab Booking | Madurai Best Travels',
      '/madurai-airport-taxi': 'Madurai Airport Taxi & Transfers | Madurai Best Travels',
      '/madurai-tour-packages': 'Best Madurai Tour Packages | Madurai Best Travels',
      '/madurai-to-rameswaram-taxi': 'Madurai to Rameswaram Taxi & Cabs | Madurai Best Travels',
      '/madurai-to-kodaikanal-taxi': 'Madurai to Kodaikanal Taxi Service | Madurai Best Travels',
      '/tempo-traveller-rental-madurai': 'Tempo Traveller Rental in Madurai | Madurai Best Travels',
      '/madurai-outstation-taxi': 'Madurai Outstation Taxi Service | One-Way & Round Trip Cabs',
      '/madurai-local-sightseeing': 'Madurai Local Sightseeing Taxi | Meenakshi Temple & City Tours',
      '/madurai-one-way-taxi': 'Madurai One Way Taxi & Drop Cabs | Save on Return Fare',
      '/madurai-round-trip-taxi': 'Madurai Round Trip Taxi & Holiday Tour Cabs',
      '/innova-crysta-rental-madurai': 'Innova Crysta Rental in Madurai | 7 Seater Luxury Taxi',
      '/family-tour-packages-madurai': 'Family Tour Packages from Madurai | South India Holidays',
      '/madurai-to-kanyakumari-taxi': 'Madurai to Kanyakumari Taxi Service | Express NH44 Cabs',
      '/madurai-to-thanjavur-taxi': 'Madurai to Thanjavur Taxi Service | Big Temple Cabs',
      '/madurai-to-trichy-taxi': 'Madurai to Trichy Taxi Service | Airport & Srirangam Cabs',
      '/madurai-to-chennai-taxi': 'Madurai to Chennai Taxi Service | Express GST Road Cabs',
      '/madurai-to-tirunelveli-taxi': 'Madurai to Tirunelveli Taxi Service | Express NH44 Cabs',
      '/madurai-to-palani-taxi': 'Madurai to Palani Taxi Service | Murugan Temple Pilgrimage Cabs',
      '/madurai-to-munnar-taxi': 'Madurai to Munnar Taxi Service | Kerala Hill Station Cabs',
      '/madurai-to-ooty-taxi': 'Madurai to Ooty Taxi Service | Nilgiris Hill Tour Cabs'
    };

    if (location.pathname.startsWith('/blog/')) {
      const slug = location.pathname.replace('/blog/', '');
      const formattedTitle = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      document.title = `${formattedTitle} | Madurai Best Travels`;
    } else {
      document.title = routeTitles[location.pathname] || routeTitles['/'];
    }
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
      <div className="min-h-screen flex flex-col bg-sand-50 text-ink-900 pb-0">
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
