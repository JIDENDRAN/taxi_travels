// src/components/desktop/DesktopLayout.jsx
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Vehicles from '../../pages/Vehicles';
import Packages from '../../pages/Packages';
import PackageDetail from '../../pages/PackageDetail';
import Contact from '../../pages/Contact';
import Gallery from '../../pages/Gallery';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import TermsAndConditions from '../../pages/TermsAndConditions';

// SEO Landing Pages
import MaduraiTaxiService from '../../pages/seo/MaduraiTaxiService';
import MaduraiAirportTaxi from '../../pages/seo/MaduraiAirportTaxi';
import MaduraiTourPackages from '../../pages/seo/MaduraiTourPackages';
import MaduraiToRameswaramTaxi from '../../pages/seo/MaduraiToRameswaramTaxi';
import MaduraiToKodaikanalTaxi from '../../pages/seo/MaduraiToKodaikanalTaxi';
import TempoTravellerRentalMadurai from '../../pages/seo/TempoTravellerRentalMadurai';

/** Public-site layout: header, routed page, footer. Responsive at every breakpoint. */
export default function DesktopLayout() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          
          {/* SEO Landing Pages */}
          <Route path="/madurai-taxi-service" element={<MaduraiTaxiService />} />
          <Route path="/madurai-airport-taxi" element={<MaduraiAirportTaxi />} />
          <Route path="/madurai-tour-packages" element={<MaduraiTourPackages />} />
          <Route path="/madurai-to-rameswaram-taxi" element={<MaduraiToRameswaramTaxi />} />
          <Route path="/madurai-to-kodaikanal-taxi" element={<MaduraiToKodaikanalTaxi />} />
          <Route path="/tempo-traveller-rental-madurai" element={<TempoTravellerRentalMadurai />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
