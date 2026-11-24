import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/munnar.webp';

const MaduraiToMunnarTaxi = () => {
  const sections = [
    {
      heading: 'Madurai to Munnar Taxi & Kerala Hill Station Tour Cabs',
      content: `
        <p>Escape into the rolling tea gardens, mist-capped peaks, and refreshing mountain air with <strong>Madurai Best Travels Madurai to Munnar taxi service</strong>. The road distance is approximately <strong>170 km</strong> and takes about <strong>4.5 to 5 hours</strong> via <strong>Theni, Bodinayakanur, and the scenic Bodi Mettu Ghats</strong>.</p>
        <p>Munnar is South India's premier hill station, located at 1,600 meters above sea level in the Western Ghats. Our expert hill-trained chauffeurs navigate the winding mountain hair-pin turns with exceptional safety and ease, allowing you to immerse yourself in the lush scenery.</p>
      `
    },
    {
      heading: 'Must-Visit Attractions in Munnar',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Eravikulam National Park (Rajamalai):</strong> Home to the endangered Nilgiri Tahr mountain goat and the blooming grounds of the rare Neelakurinji flower.</li>
          <li><strong>Mattupetty Dam & Lake:</strong> Enjoy speed boating amidst rolling tea hills and catch glimpses of wild elephants drinking at the lake shores.</li>
          <li><strong>Kundala Dam & Echo Point:</strong> Picturesque boating in Kashmiri-style shikaras and unique acoustic natural resonance across the hills.</li>
          <li><strong>KDHP Tea Museum & Factory:</strong> Discover the heritage of Munnar tea processing and taste fresh orthodox and CTC garden blends.</li>
          <li><strong>Top Station & Anamudi Peak:</strong> Highest point in South India offering breathtaking panoramic views of the Western Ghats and Tamil Nadu plains.</li>
        </ul>
      `
    },
    {
      heading: 'Why Our Mountain Drivers Make the Difference',
      content: `
        <p>The ghat climb from Bodi Mettu into Kerala features narrow hairpin curves and descending cloud mist. All our drivers assigned to hill routes are seasoned mountain specialists with years of safe driving experience. All vehicles feature robust engines, smooth suspensions, and powerful heaters/defoggers.</p>
      `
    }
  ];

  const faqs = [
    {
      q: 'How long does it take by taxi from Madurai to Munnar?',
      a: 'The drive takes roughly 4.5 to 5 hours covering 170 km via Theni, Bodi Mettu, and Poopara into Munnar.'
    },
    {
      q: 'Which car is recommended for the Madurai to Munnar trip?',
      a: 'The Toyota Innova Crysta is highly recommended for Munnar due to its higher ground clearance, excellent torque on steep ghats, and superior suspension that prevents motion sickness.'
    },
    {
      q: 'Are interstate permits required to travel from Madurai (Tamil Nadu) to Munnar (Kerala)?',
      a: 'Yes, commercial taxis require an interstate vehicle permit when crossing into Kerala. We handle all paperwork and permit costs transparently as part of your package.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai to Munnar Taxi Service"
      heroSubtitle="Book scenic hill cabs from Madurai to Munnar. 170 km drive through Bodi Ghats with expert mountain drivers and luxury vehicles."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-to-munnar-taxi"
      bookingPreset={{ tripType: 'roundtrip', destination: 'Munnar' }}
      routeMeta={{
        distance: 'Approx. 170 km',
        duration: '4.5 – 5 Hours',
        bestRoute: 'Theni – Bodi Mettu – Poopara',
        vehicleOptions: 'Innova Crysta, Dzire, Tempo'
      }}
    />
  );
};

export default MaduraiToMunnarTaxi;
