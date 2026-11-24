import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/meenakshi-wide.webp';

const MaduraiLocalSightseeing = () => {
  const sections = [
    {
      heading: 'Discover the Cultural Capital with Madurai Local Sightseeing Cabs',
      content: `
        <p>Madurai, celebrated as "Thoonga Nagaram" (the city that never sleeps), boasts over 2,500 years of glorious Tamil heritage, legendary temples, and magnificent Dravidian architecture. With <strong>Madurai Best Travels</strong> local sightseeing taxi packages, explore every iconic landmark in air-conditioned comfort without haggling with autos or searching for parking.</p>
        <p>We offer flexible <strong>half-day (4 Hours / 40 KM)</strong> and <strong>full-day (8 Hours / 80 KM)</strong> local car rental packages designed specifically for families, pilgrims, solo travellers, and photography enthusiasts.</p>
      `
    },
    {
      heading: 'Top Madurai Sightseeing Attractions Covered in Our Tours',
      content: `
        <ul class="list-disc pl-5 space-y-3 mt-4">
          <li><strong>Arulmigu Meenakshi Sundareswarar Temple:</strong> The crown jewel of Madurai featuring twelve towering gopurams, the Golden Lotus Tank, and the Thousand Pillar Hall with musical stone pillars.</li>
          <li><strong>Thirumalai Nayakkar Mahal:</strong> A classic 17th-century Indo-Saracenic palace renowned for its giant stucco arches, foliage carvings, and nightly Sound and Light spectacle.</li>
          <li><strong>Thirupparankundram Murugan Temple:</strong> One of the sacred Six Abodes (Arupadai Veedu) of Lord Murugan, carved directly into a majestic monolithic rock mountain.</li>
          <li><strong>Alagar Kovil (Kallazhagar Temple):</strong> Nestled at the foot of the lush Alagar Hills, famous for exquisite wood carvings and the sacred holy spring Silambar River.</li>
          <li><strong>Pazhamudhircholai Murugan Temple:</strong> Surrounded by dense forest atop Alagar Malai, celebrated by Saint Avvaiyar and known for natural water springs.</li>
          <li><strong>Gandhi Memorial Museum:</strong> Housed in the historic Rani Mangammal Palace, containing original artefacts and the bloodstained dhoti worn by Mahatma Gandhi.</li>
          <li><strong>Vandiyur Mariamman Teppakulam:</strong> A massive temple reservoir with an elegant central island pavilion (Maiya Mandapam) connected to the sacred Teppam float festival.</li>
        </ul>
      `
    },
    {
      heading: 'Why Rent a Local Sightseeing Cab with Madurai Best Travels?',
      content: `
        <p>Navigating the bustling, narrow lanes of Old Madurai can be challenging in public transit. Our drivers are born-and-raised Madurai locals who know the fastest routes, parking zones, temple darshan timings, and authentic food joints serving traditional Madurai Jigarthanda, Bun Parotta, and Kari Dosai.</p>
      `
    }
  ];

  const faqs = [
    {
      q: 'What are the standard packages for Madurai local sightseeing?',
      a: 'We offer a Half-Day package (4 Hours / 40 KM) and a Full-Day package (8 Hours / 80 KM). Extra hours and kilometres are charged at simple, transparent nominal rates.'
    },
    {
      q: 'Can the driver pick us up from Madurai Junction or Airport?',
      a: 'Yes, we provide direct pickups from Madurai Railway Station, Madurai Airport, bus terminals, or any hotel in the city to begin your sightseeing tour immediately.'
    },
    {
      q: 'Are temple dress codes and timings assisted by your drivers?',
      a: 'Yes, our local chauffeurs know the morning and evening darshan timings for Meenakshi Temple, Alagar Kovil, and Thirupparankundram, ensuring you arrive at the right time.'
    },
    {
      q: 'Which is the best taxi for Madurai local sightseeing with family?',
      a: 'For nuclear families (up to 4 members), an AC Swift Dzire or Etios is very comfortable. For larger families or senior citizens, we recommend the Toyota Innova Crysta for easy boarding, extra legroom, and powerful dual air conditioning.'
    },
    {
      q: 'Can we customize our Madurai city temple tour itinerary?',
      a: 'Yes, 100% of our local sightseeing packages are customizable. You choose which monuments, temples, and authentic food spots you want to visit and spend as much time as you like.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai Local Sightseeing Taxi"
      heroSubtitle="Explore Meenakshi Temple, Thirumalai Nayakkar Mahal, Alagar Kovil and top heritage spots with our dedicated local sightseeing cabs."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-local-sightseeing"
      bookingPreset={{ tripType: 'local', destination: 'Madurai Sightseeing' }}
      routeMeta={{
        distance: '40 km – 80 km',
        duration: 'Half Day / Full Day',
        bestRoute: 'Madurai City & Heritage Belt',
        vehicleOptions: 'Sedan, Innova, Tempo'
      }}
    />
  );
};

export default MaduraiLocalSightseeing;
