import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/hero-south-india.webp';

const MaduraiOutstationTaxi = () => {
  const sections = [
    {
      heading: 'Premium Outstation Taxi Service from Madurai Across South India',
      content: `
        <p>Planning an outstation journey from Madurai? <strong>Madurai Best Travels</strong> delivers dependable, comfortable, and affordable outstation cab services to any destination across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.</p>
        <p>Whether you need a one-way outstation cab drop, a multi-day family holiday round-trip, or an urgent business commute, our fleet of sanitized AC sedans, Innova Crysta SUVs, and Tempo Travellers ensures a smooth and relaxing travel experience without stress.</p>
      `
    },
    {
      heading: 'Transparent Pricing & Highway-Trained Chauffeurs',
      content: `
        <p>Unlike aggregator apps with unpredictable surge pricing, our <strong>outstation cab booking</strong> and <strong>intercity taxi service in Madurai</strong> are completely transparent. What we quote before your trip is exactly what you pay with zero surprise surcharges.</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Experienced Highway Drivers:</strong> Our chauffeurs possess extensive expertise navigating national highways (NH44, NH38, NH83), state expressways, and steep hairpin mountain curves in Kodaikanal, Munnar, and Ooty.</li>
          <li><strong>Transparent Outstation Rates:</strong> Driver bata, state permit details, and toll expectations are clarified upfront so there are no surprises during your journey.</li>
          <li><strong>Doorstep Pickup & Drop Across Madurai:</strong> We pick you up directly from your doorstep in Madurai (Anna Nagar, KK Nagar, Mattuthavani, Goripalayam, Kalavasal, etc.), Madurai Junction Railway Station, or Madurai Airport (IXM) at any scheduled hour.</li>
          <li><strong>Customizable Halts & Clean Cars:</strong> Enjoy clean restroom stops, authentic highway dining, and photographic halts whenever you wish in sanitized, AC-equipped vehicles.</li>
        </ul>
      `
    },
    {
      heading: 'Popular Outstation Destinations from Madurai',
      content: `
        <p>Madurai is the geographic and cultural gateway to South India. Some of our most frequent outstation routes include:</p>
        <ul class="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Madurai to Rameswaram:</strong> Approx. 175 km, 3.5 hours. Ramanathaswamy Temple, Pamban Sea Bridge, and Dhanushkodi ghost town.</li>
          <li><strong>Madurai to Kodaikanal:</strong> Approx. 120 km, 3.5 hours. Scenic ghat road climb to the Princess of Hill Stations.</li>
          <li><strong>Madurai to Kanyakumari:</strong> Approx. 245 km, 4.5 hours via NH44. Triveni Sangam, Vivekananda Rock Memorial, and breathtaking sunsets.</li>
          <li><strong>Madurai to Munnar:</strong> Approx. 170 km, 4.5 hours. Cool tea estates and spice plantations via Theni and Bodi Ghats.</li>
          <li><strong>Madurai to Thanjavur & Trichy:</strong> UNESCO Chola temples, Srirangam, and the Great Living Chola heritage belt.</li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'How are outstation taxi fares calculated from Madurai?',
      a: 'Outstation trips are billed per kilometre based on the chosen vehicle (Sedan starting approx ₹12-14/km, Innova Crysta starting approx ₹18-20/km, or Tempo Traveller) with standard minimum kilometre averages per calendar day (typically 250–300 km/day). Driver bata is clearly specified, and tolls can either be included or paid at actuals.'
    },
    {
      q: 'Do you offer one-way outstation taxi drops?',
      a: 'Yes, we provide one-way drop taxi services from Madurai to Chennai, Bangalore, Coimbatore, Trichy, Rameswaram, and other major cities so you pay only for one direction.'
    },
    {
      q: 'What is the contact number to book an outstation taxi in Madurai?',
      a: 'You can call or WhatsApp Madurai Best Travels 24/7 at +91 63807 07938 for instant outstation quotes, vehicle availability, and quick reservations.'
    },
    {
      q: 'Can we stop for sightseeing or food along the highway?',
      a: 'Absolutely! Our outstation chauffeurs are flexible and will gladly stop at reputable family restaurants, tea stalls, and sightseeing spots along your travel route.'
    },
    {
      q: 'Are your drivers experienced on mountain ghat roads?',
      a: 'Yes. All drivers assigned to hill stations like Kodaikanal, Munnar, and Ooty have years of proven driving experience handling narrow hair-pin bends safely.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai Outstation Taxi Service"
      heroSubtitle="Book safe, comfortable, and affordable outstation cabs from Madurai to all destinations in Tamil Nadu and South India."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-outstation-taxi"
      bookingPreset={{ tripType: 'roundtrip', destination: 'Outstation' }}
      routeMeta={{
        distance: 'Across South India',
        duration: '24/7 On Demand',
        bestRoute: 'NH44 / NH38 / NH83',
        vehicleOptions: 'Sedan, Innova, Tempo'
      }}
    />
  );
};

export default MaduraiOutstationTaxi;
