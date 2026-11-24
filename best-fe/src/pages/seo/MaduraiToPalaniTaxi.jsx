import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/hero-south-india.webp';

const MaduraiToPalaniTaxi = () => {
  const sections = [
    {
      heading: 'Madurai to Palani Murugan Temple Taxi & Pilgrimage Cabs',
      content: `
        <p>Embark on a sacred pilgrimage to the third abode of Lord Murugan (Arupadai Veedu) with <strong>Madurai Best Travels Madurai to Palani taxi service</strong>. The road distance from Madurai to Palani is approximately <strong>115 km</strong> and takes about <strong>2.5 hours</strong> via <strong>NH83</strong> passing through Dindigul and Oddanchatram.</p>
        <p>Whether you are planning a same-day darshan, tonsure (mudi kanikkai) ceremony for a newborn child, or carrying Kavadi during Thai Poosam or Panguni Uthiram festivals, our clean AC cabs and helpful drivers ensure a serene and punctual pilgrimage.</p>
      `
    },
    {
      heading: 'Pilgrimage Sights & Highlights in Palani',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Arulmigu Dhandayuthapani Swamy Temple (Hill Temple):</strong> Perched atop the sacred Sivagiri hill (450 steps), featuring the miraculous Navapashanam idol crafted by Sage Bogar. Ropeway and winch train facilities are available for senior citizens.</li>
          <li><strong>Thiru Avinankudi Temple (Kuzhandhai Velayuthaswamy):</strong> The foot-hill shrine where Lord Murugan stands as an infant deity, recognized as the original shrine of the 3rd Arupadai Veedu.</li>
          <li><strong>Bogar Samadhi & Shrine:</strong> Located within the hill temple sanctum complex, commemorating the legendary Siddhar who consecrated the holy deity.</li>
          <li><strong>Sacred Palani Panchamirtham:</strong> GI-tagged world-famous temple prasadam prepared with five natural ingredients (hill bananas, jaggery, cow ghee, honey, and cardamom).</li>
        </ul>
      `
    },
    {
      heading: 'Why Pilgrims Prefer Madurai Best Travels for Palani Trips',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Early Morning Pickup:</strong> Drivers ready as early as 4:00 AM to help you attend early Vishwaroopa Darshan or morning Puja.</li>
          <li><strong>Luggage & Wait Time Flexibility:</strong> Chauffeur waits securely at the foot of the hill while your family completes rituals and ropeway queues.</li>
          <li><strong>Elderly Assistance:</strong> Drivers guide elderly passengers to winch car booking counters and battery vehicles.</li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'What is the distance and travel time from Madurai to Palani?',
      a: 'The distance is approximately 115 km and takes about 2.5 hours via the Dindigul–Palani NH83 route.'
    },
    {
      q: 'Can we complete Palani darshan and return to Madurai on the same day?',
      a: 'Yes, a same-day round trip is the most popular option. Departing Madurai in the morning allows 4 to 6 hours for darshan and tonsure rituals, returning to Madurai by late afternoon or evening.'
    },
    {
      q: 'Can we combine Palani with Kodaikanal or Dindigul?',
      a: 'Yes, Palani is located at the northern foothills of the Palani Hills (Kodaikanal). Many families take the Palani ghat road to Kodaikanal as part of a 2 or 3-day holiday.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai to Palani Taxi Service"
      heroSubtitle="Book dedicated pilgrimage cabs from Madurai to Palani Murugan Temple. 115 km via NH83 with early morning pickups and comfortable waiting."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-to-palani-taxi"
      bookingPreset={{ tripType: 'roundtrip', destination: 'Palani' }}
      routeMeta={{
        distance: 'Approx. 115 km',
        duration: '2.5 Hours',
        bestRoute: 'NH83 via Dindigul',
        vehicleOptions: 'Swift Dzire, Innova, Tempo'
      }}
    />
  );
};

export default MaduraiToPalaniTaxi;
