import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/hero-south-india.webp';

const MaduraiToTrichyTaxi = () => {
  const sections = [
    {
      heading: 'Madurai to Trichy Taxi & Airport Transfer Cabs',
      content: `
        <p>Looking for a dependable cab from Madurai to Tiruchirappalli (Trichy)? <strong>Madurai Best Travels</strong> offers seamless, round-the-clock taxi services between Madurai and Trichy. Covering a distance of approximately <strong>135 km</strong> in just <strong>2 to 2.5 hours</strong> via the well-paved <strong>NH38 (Madurai–Trichy Highway)</strong>.</p>
        <p>Whether you need an urgent airport drop at Trichy International Airport (TRZ), a spiritual pilgrimage to Sri Ranganathaswamy Temple at Srirangam, or an executive business visit, our punctual cabs provide the fastest and most convenient travel.</p>
      `
    },
    {
      heading: 'Key Landmarks to Visit in Trichy',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Sri Ranganathaswamy Temple, Srirangam:</strong> The largest functioning Hindu temple complex in the world, spanning 156 acres with 21 magnificent gopurams including the towering 236-foot Rajagopuram.</li>
          <li><strong>Rockfort Ucchi Pillayar Temple:</strong> An iconic 83-meter high monolithic rock fortress featuring 437 stone-carved steps leading to panoramic hilltop views of the Cauvery River.</li>
          <li><strong>Jambukeswarar Temple, Thiruvanaikaval:</strong> One of the sacred Pancha Bhoota Sthalams representing the element of water (Appu Lingam), where the sanctum deity is washed by a natural spring.</li>
          <li><strong>Samayapuram Mariamman Temple:</strong> A revered and powerful pilgrimage temple located just 15 km north of Trichy.</li>
        </ul>
      `
    },
    {
      heading: 'Trichy International Airport (TRZ) Transfers',
      content: `
        <p>Catching an international flight to Singapore, Malaysia, Dubai, or Sri Lanka from Trichy? We provide guaranteed on-time doorstep pickups from Madurai to Trichy Airport terminal departures 24 hours a day, 7 days a week.</p>
      `
    }
  ];

  const faqs = [
    {
      q: 'How long does a taxi take from Madurai to Trichy?',
      a: 'The taxi drive takes approximately 2 to 2.5 hours covering 135 km along the four-lane NH38 highway.'
    },
    {
      q: 'Do you provide one-way drop taxis to Trichy Airport (TRZ)?',
      a: 'Yes, we provide dedicated one-way drop cab service directly to Trichy Airport departures with zero return charges.'
    },
    {
      q: 'Can we visit both Srirangam and Rockfort in a single day trip?',
      a: 'Yes! A day trip easily accommodates Srirangam darshan in the morning, lunch in Trichy, an afternoon climb at Rockfort, and return to Madurai by evening.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai to Trichy Taxi Service"
      heroSubtitle="Book fast and reliable cabs from Madurai to Trichy & Trichy Airport (TRZ). 135 km via NH38 in 2 hours with experienced drivers."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-to-trichy-taxi"
      bookingPreset={{ tripType: 'roundtrip', destination: 'Trichy' }}
      routeMeta={{
        distance: 'Approx. 135 km',
        duration: '2 – 2.5 Hours',
        bestRoute: 'NH38 4-Lane Highway',
        vehicleOptions: 'Sedan, Innova, Tempo'
      }}
    />
  );
};

export default MaduraiToTrichyTaxi;
