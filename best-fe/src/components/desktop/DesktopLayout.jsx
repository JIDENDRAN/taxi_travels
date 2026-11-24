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
import Blog from '../../pages/Blog';
import BlogPost from '../../pages/BlogPost';

// SEO Landing Pages
import MaduraiTaxiService from '../../pages/seo/MaduraiTaxiService';
import MaduraiAirportTaxi from '../../pages/seo/MaduraiAirportTaxi';
import MaduraiTourPackages from '../../pages/seo/MaduraiTourPackages';
import MaduraiToRameswaramTaxi from '../../pages/seo/MaduraiToRameswaramTaxi';
import MaduraiToKodaikanalTaxi from '../../pages/seo/MaduraiToKodaikanalTaxi';
import TempoTravellerRentalMadurai from '../../pages/seo/TempoTravellerRentalMadurai';
import MaduraiOutstationTaxi from '../../pages/seo/MaduraiOutstationTaxi';
import MaduraiLocalSightseeing from '../../pages/seo/MaduraiLocalSightseeing';
import MaduraiOneWayTaxi from '../../pages/seo/MaduraiOneWayTaxi';
import MaduraiRoundTripTaxi from '../../pages/seo/MaduraiRoundTripTaxi';
import InnovaCrystaRentalMadurai from '../../pages/seo/InnovaCrystaRentalMadurai';
import FamilyTourPackagesMadurai from '../../pages/seo/FamilyTourPackagesMadurai';
import MaduraiToKanyakumariTaxi from '../../pages/seo/MaduraiToKanyakumariTaxi';
import MaduraiToThanjavurTaxi from '../../pages/seo/MaduraiToThanjavurTaxi';
import MaduraiToTrichyTaxi from '../../pages/seo/MaduraiToTrichyTaxi';
import MaduraiToChennaiTaxi from '../../pages/seo/MaduraiToChennaiTaxi';
import MaduraiToTirunelveliTaxi from '../../pages/seo/MaduraiToTirunelveliTaxi';
import MaduraiToPalaniTaxi from '../../pages/seo/MaduraiToPalaniTaxi';
import MaduraiToMunnarTaxi from '../../pages/seo/MaduraiToMunnarTaxi';
import MaduraiToOotyTaxi from '../../pages/seo/MaduraiToOotyTaxi';

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
          
          {/* Travel Guides / Blog */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* SEO Landing Pages */}
          <Route path="/madurai-taxi-service" element={<MaduraiTaxiService />} />
          <Route path="/madurai-airport-taxi" element={<MaduraiAirportTaxi />} />
          <Route path="/madurai-tour-packages" element={<MaduraiTourPackages />} />
          <Route path="/madurai-to-rameswaram-taxi" element={<MaduraiToRameswaramTaxi />} />
          <Route path="/madurai-to-kodaikanal-taxi" element={<MaduraiToKodaikanalTaxi />} />
          <Route path="/tempo-traveller-rental-madurai" element={<TempoTravellerRentalMadurai />} />
          <Route path="/madurai-outstation-taxi" element={<MaduraiOutstationTaxi />} />
          <Route path="/madurai-local-sightseeing" element={<MaduraiLocalSightseeing />} />
          <Route path="/madurai-one-way-taxi" element={<MaduraiOneWayTaxi />} />
          <Route path="/madurai-round-trip-taxi" element={<MaduraiRoundTripTaxi />} />
          <Route path="/innova-crysta-rental-madurai" element={<InnovaCrystaRentalMadurai />} />
          <Route path="/family-tour-packages-madurai" element={<FamilyTourPackagesMadurai />} />
          <Route path="/madurai-to-kanyakumari-taxi" element={<MaduraiToKanyakumariTaxi />} />
          <Route path="/madurai-to-thanjavur-taxi" element={<MaduraiToThanjavurTaxi />} />
          <Route path="/madurai-to-trichy-taxi" element={<MaduraiToTrichyTaxi />} />
          <Route path="/madurai-to-chennai-taxi" element={<MaduraiToChennaiTaxi />} />
          <Route path="/madurai-to-tirunelveli-taxi" element={<MaduraiToTirunelveliTaxi />} />
          <Route path="/madurai-to-palani-taxi" element={<MaduraiToPalaniTaxi />} />
          <Route path="/madurai-to-munnar-taxi" element={<MaduraiToMunnarTaxi />} />
          <Route path="/madurai-to-ooty-taxi" element={<MaduraiToOotyTaxi />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
