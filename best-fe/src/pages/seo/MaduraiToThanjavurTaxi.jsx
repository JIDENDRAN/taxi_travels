import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/thanjavur.webp';

const MaduraiToThanjavurTaxi = () => {
  const sections = [
    {
      heading: 'Madurai to Thanjavur Taxi & Heritage Tour Cabs',
      content: `
        <p>Travel from Madurai to the historic imperial capital of the Chola Empire with <strong>Madurai Best Travels Madurai to Thanjavur taxi service</strong>. The road distance is approximately <strong>190 km</strong> and takes about <strong>3.5 hours</strong> via <strong>NH383 / NH83</strong> through Melur, Pudukkottai, or Trichy.</p>
        <p>Thanjavur is the cradle of classical South Indian art, Carnatic music, bronze metallurgy, and UNESCO World Heritage architecture. Our chauffeur-driven AC cabs make your pilgrimage and heritage tour informative, comfortable, and memorable.</p>
      `
    },
    {
      heading: 'Major Sights to Visit in Thanjavur',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Brihadeeswarar Temple (The Big Temple / Thanjai Periya Kovil):</strong> Built by Emperor Raja Raja Chola I in 1010 CE, this UNESCO monument features a towering 66-meter vimana crowned by an 80-tonne granite monolith and a colossal 20-tonne monolithic Nandi.</li>
          <li><strong>Thanjavur Maratha Palace:</strong> A sprawling royal compound with the Bell Tower, Arsenal Tower, and Durbar Halls exhibiting centuries of Nayak and Maratha royal regalia.</li>
          <li><strong>Saraswathi Mahal Library:</strong> One of Asia's oldest royal libraries housing ancient palm-leaf manuscripts and historical rare maps.</li>
          <li><strong>Sangeetha Mahal & Art Gallery:</strong> World-renowned collection of Chola bronze sculptures including Nataraja, Parvati, and saint-poets.</li>
        </ul>
      `
    },
    {
      heading: 'Extended Heritage Circuit: Chettinad & Kumbakonam',
      content: `
        <p>Many travelers combine Thanjavur with nearby cultural treasures. We can customize your cab tour to visit Chettinad heritage mansions in Kanadukathan, Gangaikonda Cholapuram, Darasuram Airavatesvara Temple, or the Navagraha temples around Kumbakonam.</p>
      `
    }
  ];

  const faqs = [
    {
      q: 'How far is Thanjavur from Madurai and how long does the cab take?',
      a: 'The road distance from Madurai to Thanjavur is roughly 190 km and takes about 3.5 hours by taxi via NH383/NH83.'
    },
    {
      q: 'Can we visit Brihadeeswarar Temple and return to Madurai on the same day?',
      a: 'Yes, a same-day round trip is very popular. You can depart Madurai at 7:00 AM, arrive in Thanjavur by 10:30 AM, complete darshan and palace sightseeing, and return to Madurai comfortably by evening.'
    },
    {
      q: 'Can we include Trichy Srirangam or Kumbakonam in the trip?',
      a: 'Absolutely. We provide customized 2-day and 3-day temple circuit itineraries covering Madurai, Trichy, Thanjavur, and Kumbakonam.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai to Thanjavur Taxi Service"
      heroSubtitle="Book premium cabs from Madurai to Thanjavur. Visit the UNESCO Big Temple and Royal Palace with expert chauffeurs."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-to-thanjavur-taxi"
      bookingPreset={{ tripType: 'roundtrip', destination: 'Thanjavur' }}
      routeMeta={{
        distance: 'Approx. 190 km',
        duration: '3.5 Hours',
        bestRoute: 'NH383 / NH83 via Pudukkottai',
        vehicleOptions: 'Swift Dzire, Innova, Tempo'
      }}
    />
  );
};

export default MaduraiToThanjavurTaxi;