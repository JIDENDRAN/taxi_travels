import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/hero-south-india.webp';

const MaduraiOneWayTaxi = () => {
  const sections = [
    {
      heading: 'Affordable One Way Taxi & Drop Cabs from Madurai',
      content: `
        <p>Why pay double the fare for a two-way round trip when you only need to travel in one direction? With <strong>Madurai Best Travels One Way Taxi</strong> service, you pay solely for the distance travelled to your drop location — saving up to 40% on intercity cab travel.</p>
        <p>Our one-way drop cabs are ideal for airport transfers, train connections, college joinings, hospital visits, family relocations, or sudden official meetings across Tamil Nadu, Karnataka, and Kerala.</p>
      `
    },
    {
      heading: 'Top One Way Taxi Routes from Madurai',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Madurai to Chennai One Way Taxi:</strong> Approx. 460 km, 7.5 hours. Fast highway drive with drop at Chennai Airport, Central, or anywhere in the city.</li>
          <li><strong>Madurai to Bangalore One Way Taxi:</strong> Approx. 435 km, 7.5 hours via Salem and Hosur. Direct doorstep drop in Bengaluru.</li>
          <li><strong>Madurai to Coimbatore One Way Taxi:</strong> Approx. 215 km, 4.5 hours via Dindigul and Dharapuram.</li>
          <li><strong>Madurai to Trichy One Way Taxi:</strong> Approx. 135 km, 2.5 hours via NH38. Drop at Trichy International Airport or Junction.</li>
          <li><strong>Madurai to Rameswaram One Way Drop:</strong> Approx. 175 km, 3.5 hours. Perfect for pilgrims boarding return trains or staying overnight in Rameswaram.</li>
          <li><strong>Madurai to Kodaikanal One Way Drop:</strong> Approx. 120 km, 3.5 hours. Safe uphill ride to your Kodaikanal resort.</li>
        </ul>
      `
    },
    {
      heading: 'Benefits of Booking One Way Cabs with Madurai Best Travels',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Zero Return Fare:</strong> You are charged strictly for your one-way distance with no hidden return tolls or empty return penalties — ensuring genuine <em>affordable one way cab rates from Madurai</em>.</li>
          <li><strong>Assured Punctual Pickup:</strong> Our driver arrives at your Madurai address (home, hotel, or station) on time so you can travel without airport or meeting stress.</li>
          <li><strong>Dedicated Clean Fleet:</strong> Choose from AC Swift Dzire, Toyota Etios, Innova Crysta, and Ertiga with sanitized interiors, ample luggage boot space, and smooth suspension.</li>
          <li><strong>24/7 Booking Support:</strong> Need an urgent late-night drop taxi or early morning airport ride? Call or WhatsApp our hotline at +91 63807 07938 anytime.</li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'Do I have to pay return fare for a one-way taxi from Madurai?',
      a: 'No. With our dedicated one-way taxi service, you pay only for the one-way distance travelled to your destination, plus toll charges. Return fare is completely waived.'
    },
    {
      q: 'Can I book a one-way cab on short notice?',
      a: 'Yes, we accept same-day and emergency bookings. We recommend booking at least 2 to 3 hours ahead to ensure the preferred vehicle class is dispatched smoothly.'
    },
    {
      q: 'Are tolls and driver allowance included in the one way fare?',
      a: 'All one-way quotes are provided with crystal-clear breakdowns. Tolls can be included in a fixed all-inclusive package or billed at actual toll plaza receipts.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai One Way Taxi & Drop Cabs"
      heroSubtitle="Save up to 40% on intercity travel with reliable one-way drop taxis from Madurai to Chennai, Bangalore, Coimbatore, Trichy and all South India."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-one-way-taxi"
      bookingPreset={{ tripType: 'oneway', destination: 'One Way Drop' }}
      routeMeta={{
        distance: 'Direct Doorstep Drops',
        duration: 'Express Highway Travel',
        bestRoute: 'NH44 / NH38 / NH83',
        vehicleOptions: 'Swift Dzire, Innova Crysta'
      }}
    />
  );
};

export default MaduraiOneWayTaxi;
