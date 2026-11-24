import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/ooty.webp';

const MaduraiToOotyTaxi = () => {
  const sections = [
    {
      heading: 'Madurai to Ooty Taxi & Nilgiris Hill Tour Cabs',
      content: `
        <p>Travel from Madurai to the "Queen of Hill Stations" with <strong>Madurai Best Travels Madurai to Ooty taxi service</strong>. The road distance is approximately <strong>290 km</strong> and takes about <strong>6.5 to 7 hours</strong> via <strong>Dindigul, Karur / Dharapuram, Coimbatore, Mettupalayam, and the famous Nilgiri Ghat Road</strong>.</p>
        <p>Ooty (Udhagamandalam) captivates travelers with British colonial charm, eucalyptus-scented forests, botanical gardens, and the UNESCO heritage Nilgiri Mountain Railway. Our chauffeur-driven cabs offer a smooth, safe, and panoramic journey up the hills.</p>
      `
    },
    {
      heading: 'Top Attractions to Explore in Ooty & Coonoor',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Government Botanical Garden:</strong> Established in 1848, home to over a thousand exotic plant species, a fossilized tree trunk, and vibrant flower beds.</li>
          <li><strong>Ooty Lake & Boat House:</strong> Artificial lake built in 1824, ideal for pedal boating, row boating, and lakeside cycling amidst tall eucalyptus trees.</li>
          <li><strong>Doddabetta Peak:</strong> Highest mountain in the Nilgiri Hills at 2,637 meters, offering telescope house views of the Chamundi Hills and Nilgiri plateau.</li>
          <li><strong>Rose Garden:</strong> Spectacular tiered terraces boasting over 20,000 varieties of blooming roses.</li>
          <li><strong>Coonoor Sightseeing (Sim’s Park & Dolphin’s Nose):</strong> Combine your trip with a scenic 20 km drive to Coonoor for tea estate walks and cliff viewpoints.</li>
        </ul>
      `
    },
    {
      heading: 'Safe & Comfortable Nilgiri Mountain Driving',
      content: `
        <p>Ascending the Nilgiri hills via Mettupalayam and Coonoor requires skillful negotiation of hairpin bends and seasonal mist. Our chauffeurs possess years of dedicated mountain driving experience, ensuring your family travels in total safety and comfort.</p>
      `
    }
  ];

  const faqs = [
    {
      q: 'What is the distance and travel time from Madurai to Ooty?',
      a: 'The distance is approximately 290 km and takes about 6.5 to 7 hours depending on traffic and stops along the Mettupalayam ghat road.'
    },
    {
      q: 'Which vehicle is best suited for the Madurai to Ooty route?',
      a: 'The Toyota Innova Crysta or a high-torque AC Sedan is ideal for Ooty mountain roads, providing excellent climb power, cabin heating, and luggage capacity.'
    },
    {
      q: 'Can we book a multi-day round-trip package covering Ooty and Coonoor?',
      a: 'Yes, our 3-day / 2-night and 4-day / 3-night Ooty holiday packages include local sightseeing in Ooty, Coonoor, Pykara Lake, and Mudumalai Wildlife Sanctuary.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai to Ooty Taxi Service"
      heroSubtitle="Book premium hill tour cabs from Madurai to Ooty & Coonoor. 290 km scenic drive through Nilgiri Ghats with expert mountain chauffeurs."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-to-ooty-taxi"
      bookingPreset={{ tripType: 'roundtrip', destination: 'Ooty' }}
      routeMeta={{
        distance: 'Approx. 290 km',
        duration: '6.5 – 7 Hours',
        bestRoute: 'Dindigul – Mettupalayam – Nilgiris',
        vehicleOptions: 'Innova Crysta, Dzire, Tempo'
      }}
    />
  );
};

export default MaduraiToOotyTaxi;
