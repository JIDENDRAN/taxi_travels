import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/hero-south-india.webp';

const MaduraiToChennaiTaxi = () => {
  const sections = [
    {
      heading: 'Madurai to Chennai Taxi Service – Express Intercity Cab Drops',
      content: `
        <p>Need a hassle-free, door-to-door cab from Madurai to Chennai? <strong>Madurai Best Travels</strong> delivers premium one-way and round-trip taxi services between Madurai and the state capital Chennai. The journey spans approximately <strong>460 km</strong> and takes around <strong>7 to 8 hours</strong> via the well-maintained <strong>NH38 / Grand Southern Trunk (GST) Road</strong> through Trichy, Villupuram, and Chengalpattu.</p>
        <p>Skip the crowded trains, ticket waitlists, and bus transfers. With our private chauffeur-driven AC cabs, travel in relaxed comfort with the flexibility to take breaks whenever you desire.</p>
      `
    },
    {
      heading: 'Why Choose Our Madurai to Chennai Cab Service?',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Direct Door-to-Door Service:</strong> Pickup anywhere in Madurai and direct drop at Chennai International Airport (MAA), Chennai Central, Egmore, OMR IT Corridor, or your residence.</li>
          <li><strong>One-Way Drop Pricing:</strong> Pay only for your one-way commute with no return cab charges, saving substantial money.</li>
          <li><strong>Highway Veteran Drivers:</strong> Trained long-distance drivers who understand optimal expressway speeds, highway lane discipline, and passenger safety.</li>
          <li><strong>Fleet Choices:</strong> Fuel-efficient sedans (Dzire, Etios) for solo or couple commutes, and spacious Innova Crysta / Tempo Travellers for families with substantial baggage.</li>
        </ul>
      `
    },
    {
      heading: 'Comfortable En-Route Highway Dining',
      content: `
        <p>The Madurai–Chennai highway corridor is renowned for high-standard highway plazas, clean restrooms, and iconic restaurants like A2B (Adyar Ananda Bhavan), Murugan Idli Shop, and Harsham. Your chauffeur stops at hygienic locations of your preference.</p>
      `
    }
  ];

  const faqs = [
    {
      q: 'What is the road distance and travel time from Madurai to Chennai?',
      a: 'The distance is approximately 460 km via NH38 / GST Road. The drive typically takes between 7 and 8 hours depending on meal halts and Chennai city traffic.'
    },
    {
      q: 'Can you drop us directly at Chennai Airport terminal?',
      a: 'Yes, we provide direct drops at both domestic and international terminals of Chennai Airport (MAA) at any hour of the day or night.'
    },
    {
      q: 'Do you offer one-way drop fares for Madurai to Chennai?',
      a: 'Yes! We offer economical one-way drop fares where you pay only for one direction with no return vehicle charges.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai to Chennai Taxi Service"
      heroSubtitle="Book express one-way and round-trip cabs from Madurai to Chennai. 460 km door-to-door travel with experienced highway chauffeurs."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-to-chennai-taxi"
      bookingPreset={{ tripType: 'oneway', destination: 'Chennai' }}
      routeMeta={{
        distance: 'Approx. 460 km',
        duration: '7 – 8 Hours',
        bestRoute: 'NH38 / GST Road via Trichy',
        vehicleOptions: 'Swift Dzire, Innova Crysta, Tempo'
      }}
    />
  );
};

export default MaduraiToChennaiTaxi;