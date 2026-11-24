import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/hero-south-india.webp';

const MaduraiTaxiService = () => {
  const sections = [
    {
      heading: 'Reliable and Affordable Taxi Service in Madurai',
      content: `
        <p>When you are looking for the best <strong>Madurai taxi service</strong>, Madurai Best Travels stands out as the most trusted choice. We offer a diverse fleet of well-maintained vehicles, professional drivers, and an unwavering commitment to your safety and comfort.</p>
        <p>Whether you need a quick drop within the city, a full day of local sightseeing, or a long-distance outstation trip across South India, our comprehensive cab booking services are tailored to meet all your travel requirements at highly competitive prices.</p>
      `
    },
    {
      heading: 'Why Choose Our Cab Booking Service?',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Punctuality:</strong> We value your time. Our drivers always arrive ahead of schedule.</li>
          <li><strong>Premium Fleet:</strong> Choose from Swift Dzire, Innova Crysta, and spacious Tempo Travellers.</li>
          <li><strong>Transparent Billing:</strong> What you see is what you pay. No hidden night charges or unexpected tolls.</li>
          <li><strong>Local Expertise:</strong> Our drivers double as local guides, ensuring you visit the best spots and eat at authentic places.</li>
        </ul>
      `
    },
    {
      heading: 'Local Sightseeing & Outstation Rides',
      content: `
        <p>Madurai is a city steeped in history. With our dedicated local sightseeing packages, you can comfortably visit the Meenakshi Amman Temple, Thirumalai Nayakkar Mahal, Gandhi Museum, and the Alagar Koyil without worrying about navigating traffic or finding parking.</p>
        <p>Planning an outstation trip? We offer highly affordable one-way and round-trip taxi services from Madurai to Rameswaram, Kodaikanal, Ooty, Munnar, and Kanyakumari. Our outstation cabs come with special day-rental packages that are perfect for families and large groups.</p>
      `
    },
    {
      heading: '24/7 Doorstep Pickup Across Madurai Transit Hubs & Neighborhoods',
      content: `
        <p>Whether you need a quick <strong>call taxi</strong> in the middle of the night or a planned airport/railway station drop, our standby drivers are positioned throughout Madurai:</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Madurai Railway Junction:</strong> Standby cabs available 24/7 at both West Gate (PF 8) and Main Town Hall Road Exit (PF 1) for incoming Vaigai, Pandian, Tejas, and Vande Bharat expresses.</li>
          <li><strong>Madurai Airport (IXM):</strong> Direct terminal pickups with zero waiting charges and flight delay tracking.</li>
          <li><strong>Mattuthavani (MGR Integrated Bus Stand):</strong> Fast pickup for passengers arriving by interstate omnibuses and government express buses.</li>
          <li><strong>Arapalayam & Periyar Bus Stands:</strong> Doorstep transit for passengers connecting to Dindigul, Theni, or Kodaikanal buses.</li>
          <li><strong>Key Residential & Commercial Hubs:</strong> Instant cab dispatch in Anna Nagar, KK Nagar, Goripalayam, Tallakulam, Kalavasal, Arapalayam, Teppakulam, Thirunagar, Avaniyapuram, Villapuram, Simmakkal, Othakadai, Bypass Road, Vandiyur, Pasumalai, Koodal Nagar, and Thirupparankundram.</li>
        </ul>
      `
    },
    {
      heading: 'Transparent Madurai Taxi Rates & Pricing Options',
      content: `
        <p>We believe in honest, predictable pricing without surge surprises:</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Local Hourly Rental:</strong> Half-Day (4 Hours / 40 KM) and Full-Day (8 Hours / 80 KM) rentals for business meetings and shopping.</li>
          <li><strong>One-Way Drop Taxi:</strong> Direct drops to Chennai, Coimbatore, Bangalore, Trichy, and Rameswaram — pay only one-way tariff.</li>
          <li><strong>Outstation Round-Trip:</strong> Per-km billing with daily driver allowance, suitable for multi-day family tours.</li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'Which is the best taxi service in Madurai for family and outstation trips?',
      a: 'Madurai Best Travels is rated among the top and most trusted travels in Madurai with a 5.0 Google rating. We offer verified chauffeurs, clean AC vehicles (Dzire, Innova Crysta, Tempo Traveller), transparent per-km billing, and 24/7 customer support.'
    },
    {
      q: 'How can I book a call taxi in Madurai with Madurai Best Travels?',
      a: 'You can book instantly by calling our 24/7 booking line at +91 63807 07938, messaging us on WhatsApp, or using our simple online booking form. We confirm vehicle availability within minutes.'
    },
    {
      q: 'Do you offer pickup from Madurai Railway Junction and Mattuthavani Bus Stand?',
      a: 'Yes! We have standby cabs near Madurai Junction Railway Station and Mattuthavani Bus Terminus 24 hours a day, providing quick pickups as soon as your train or bus arrives.'
    },
    {
      q: 'How much does a taxi cost per km in Madurai?',
      a: 'Our rates start at just ₹14/km for standard sedans like Swift Dzire, and go up to ₹22/km for premium SUVs like Innova Crysta. We also offer fixed-price local hourly packages (4 Hr/40 Km, 8 Hr/80 Km).'
    },
    {
      q: 'Do you provide 24/7 taxi service in Anna Nagar, KK Nagar, and other Madurai areas?',
      a: 'Yes! We operate 24 hours a day across all Madurai localities including Anna Nagar, KK Nagar, Goripalayam, Tallakulam, Kalavasal, Arapalayam, Teppakulam, and Thirunagar.'
    },
    {
      q: 'What is the difference between Call Taxi and Drop Taxi in Madurai?',
      a: 'A Call Taxi provides local point-to-point and hourly city rides within Madurai, while a Drop Taxi (One Way Taxi) takes you to an outstation destination (like Chennai, Bangalore, or Trichy) where you pay only for one direction with zero return charges.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai Taxi Service & Cab Booking"
      heroSubtitle="Safe, reliable, and affordable taxi services for local sightseeing, outstation trips, and airport transfers in Madurai."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-taxi-service"
      bookingPreset={{ destination: 'Madurai Taxi' }}
      routeMeta={{
        distance: 'Local & Outstation',
        duration: '24/7 Available',
        bestRoute: 'Madurai & South India',
        vehicleOptions: 'Sedan, Innova, Tempo'
      }}
    />
  );
};

export default MaduraiTaxiService;
