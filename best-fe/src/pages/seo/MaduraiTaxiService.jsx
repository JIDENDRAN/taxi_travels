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
          <li><strong>All Neighborhoods:</strong> Immediate dispatch in Palanganatham, Anna Nagar, KK Nagar, Goripalayam, Kalavasal, Simmakkal, Thiruparankundram, Thirunagar, Pasumalai, Villapuram, and Teppakulam.</li>
        </ul>
      `
    }
  ];

  const faqs = [
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
      q: 'Do you provide 24/7 taxi service?',
      a: 'Yes! We operate 24 hours a day, 7 days a week. Whether you have an early morning flight, a late-night train arrival, or an emergency hospital commute, you can count on us.'
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
