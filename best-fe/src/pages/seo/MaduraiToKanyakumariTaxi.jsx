import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/kanyakumari.webp';

const MaduraiToKanyakumariTaxi = () => {
  const sections = [
    {
      heading: 'Madurai to Kanyakumari Taxi & Outstation Cab Service',
      content: `
        <p>Journey from the historic temple city of Madurai to the southernmost tip of mainland India with <strong>Madurai Best Travels Madurai to Kanyakumari taxi service</strong>. The road distance between Madurai and Kanyakumari is approximately <strong>245 km</strong> and takes about <strong>4.5 to 5 hours</strong> via the smooth four-lane <strong>NH44 (North-South Corridor)</strong>.</p>
        <p>Whether you require a one-way transfer, a same-day return trip to witness the sunset, or a 2-day sightseeing tour, our clean AC cabs and experienced highway chauffeurs guarantee an effortless and pleasant ride.</p>
      `
    },
    {
      heading: 'Top Attractions to Explore in Kanyakumari',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Vivekananda Rock Memorial & Thiruvalluvar Statue:</strong> Take the scenic ferry ride to the offshore monument where Swami Vivekananda attained enlightenment and admire the magnificent 133-foot stone statue.</li>
          <li><strong>Triveni Sangam:</strong> The sacred confluence where the Bay of Bengal, Arabian Sea, and Indian Ocean meet.</li>
          <li><strong>Bhagavathy Amman Temple:</strong> An ancient 3,000-year-old temple dedicated to the virgin goddess Kanya Kumari, known for her sparkling diamond nose ring.</li>
          <li><strong>Sunset Point & Sunrise View:</strong> One of the rare places in the world where you can watch sunrise and sunset over the ocean from the same shoreline.</li>
          <li><strong>Padmanabhapuram Palace & Suchindram Thanumalayan Temple:</strong> Historic wooden palace architecture and unique multi-deity temple on the way to Kanyakumari.</li>
        </ul>
      `
    },
    {
      heading: 'Why Book Your Kanyakumari Cab with Madurai Best Travels?',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Smooth Expressway Cruising:</strong> Direct travel along NH44 passing through Virudhunagar, Sattur, Kovilpatti, and Tirunelveli.</li>
          <li><strong>Flexible En-Route Stops:</strong> Stop for authentic Tirunelveli Halwa or famous Kovilpatti Kadalai Mittai (peanut candy).</li>
          <li><strong>Clear, Honest Billing:</strong> Fixed all-inclusive options with tolls and driver bata clearly stated before booking.</li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'What is the distance and travel time from Madurai to Kanyakumari?',
      a: 'The road distance is approximately 245 km via NH44, and the drive takes around 4.5 to 5 hours under normal traffic conditions.'
    },
    {
      q: 'Can we visit Suchindram Temple and Padmanabhapuram Palace during this trip?',
      a: 'Yes, both Suchindram Temple and Padmanabhapuram Palace can easily be incorporated into your Madurai to Kanyakumari itinerary.'
    },
    {
      q: 'Can we complete Madurai to Kanyakumari in a single day?',
      a: 'While a same-day trip is possible by starting early around 5:00 AM, we strongly recommend a 2-day / 1-night trip to enjoy both the famous sunset and the spectacular sunrise.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai to Kanyakumari Taxi Service"
      heroSubtitle="Book reliable one-way and round-trip cabs from Madurai to Kanyakumari. 245 km scenic drive via NH44 with experienced highway drivers."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-to-kanyakumari-taxi"
      bookingPreset={{ tripType: 'roundtrip', destination: 'Kanyakumari' }}
      routeMeta={{
        distance: 'Approx. 245 km',
        duration: '4.5 – 5 Hours',
        bestRoute: 'NH44 (North-South Corridor)',
        vehicleOptions: 'Swift Dzire, Innova Crysta, Tempo'
      }}
    />
  );
};

export default MaduraiToKanyakumariTaxi;