import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/hero-south-india.webp';

const MaduraiToTirunelveliTaxi = () => {
  const sections = [
    {
      heading: 'Madurai to Tirunelveli Taxi & Outstation Cab Booking',
      content: `
        <p>Book a smooth, punctual, and comfortable cab from Madurai to Tirunelveli with <strong>Madurai Best Travels</strong>. The distance is approximately <strong>160 km</strong> and takes around <strong>2.5 to 3 hours</strong> via the world-class four-lane <strong>NH44 (North-South Expressway Corridor)</strong> passing Virudhunagar, Sattur, and Kovilpatti.</p>
        <p>Whether you are visiting family, attending a temple festival at Nellaiappar Temple, or heading onward to Tenkasi, Courtallam waterfalls, or Tiruchendur, our AC taxis provide the most reliable transit.</p>
      `
    },
    {
      heading: 'Key Attractions in and around Tirunelveli',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Arulmigu Nellaiappar & Gandhimathi Amman Temple:</strong> One of the grandest Shaivite temples in Tamil Nadu, boasting magnificent musical pillars, the Golden Lotus Hall, and intricate Pandyan architecture.</li>
          <li><strong>World-Famous Tirunelveli Halwa:</strong> Stop at the legendary Iruttu Kadai (Dark Shop) or Shanthi Sweets on West Car Street for hot, authentic wheat halwa cooked in Thamirabarani river water.</li>
          <li><strong>Thamirabarani River Ghats:</strong> Sacred bathing ghats and historic stone mandapams along the lifeline river of southern Tamil Nadu.</li>
          <li><strong>Courtallam Waterfalls (Seasonal):</strong> Known as the "Spa of South India", situated just 50 km from Tirunelveli with rejuvenating herb-infused mineral water cascades.</li>
          <li><strong>Tiruchendur Murugan Temple (Seashore Abode):</strong> Located just 60 km from Tirunelveli on the pristine Bay of Bengal coast.</li>
        </ul>
      `
    },
    {
      heading: 'Doorstep Pickup and Reliable Fleet Options',
      content: `
        <p>Our drivers will pick you up from any residential locality, railway station, or Madurai Airport (IXM). Choose from Dzire/Etios sedans, Innova Crysta 7-seaters, or Force Tempo Travellers with ample luggage room.</p>
      `
    }
  ];

  const faqs = [
    {
      q: 'How long does the taxi take from Madurai to Tirunelveli?',
      a: 'The drive takes roughly 2.5 to 3 hours covering 160 km on the fast NH44 expressway.'
    },
    {
      q: 'Can we extend the trip to Courtallam or Tiruchendur?',
      a: 'Yes! We can seamlessly include Courtallam waterfalls, Tenkasi Kasi Viswanathar Temple, or Tiruchendur Subramanya Swamy Temple in your package.'
    },
    {
      q: 'Do you offer one-way drop taxis to Tirunelveli?',
      a: 'Yes, we provide one-way drop cabs to Tirunelveli, Palayamkottai, and nearby towns with transparent per-trip billing.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai to Tirunelveli Taxi Service"
      heroSubtitle="Book fast and safe cabs from Madurai to Tirunelveli. 160 km via NH44 in 2.5 hours with professional chauffeurs."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-to-tirunelveli-taxi"
      bookingPreset={{ tripType: 'roundtrip', destination: 'Tirunelveli' }}
      routeMeta={{
        distance: 'Approx. 160 km',
        duration: '2.5 – 3 Hours',
        bestRoute: 'NH44 Expressway Corridor',
        vehicleOptions: 'Swift Dzire, Innova, Tempo'
      }}
    />
  );
};

export default MaduraiToTirunelveliTaxi;