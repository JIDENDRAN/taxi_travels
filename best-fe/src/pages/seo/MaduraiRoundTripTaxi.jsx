import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/hero-south-india.webp';

const MaduraiRoundTripTaxi = () => {
  const sections = [
    {
      heading: 'Comfortable & Flexible Round Trip Cabs from Madurai',
      content: `
        <p>Planning a holiday, pilgrimage tour, or multi-day family circuit starting from Madurai? <strong>Madurai Best Travels Round Trip Taxi</strong> service offers the ultimate flexibility, comfort, and peace of mind with a dedicated vehicle and driver at your disposal throughout your itinerary.</p>
        <p>From weekend getaways to Kodaikanal or Munnar, to spiritual circuits covering Rameswaram, Kanyakumari, Tiruchendur, and Thanjavur, our round-trip packages let you travel at your own pace without the rush of public schedules.</p>
      `
    },
    {
      heading: 'Why Madurai Best Travels is the Preferred Round Trip Partner',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Same Chauffeur Throughout the Journey:</strong> You travel with a polite, experienced, background-verified chauffeur who knows your itinerary and assists with luggage, route advice, and local tips.</li>
          <li><strong>Transparent Per-KM Billing:</strong> Fair daily minimum kilometre thresholds with no hidden night surcharges or surprise billing at the end of the trip.</li>
          <li><strong>Flexible Itineraries:</strong> Want to spend extra time at a temple, take a detour for scenic viewpoint photos, or stop at a local handicraft shop? Your driver accommodates your pace.</li>
          <li><strong>Comprehensive Fleet:</strong> Economical sedans (Swift Dzire), executive SUVs (Innova Crysta), and high-capacity Tempo Travellers for joint family groups.</li>
        </ul>
      `
    },
    {
      heading: 'Popular Round Trip Circuits from Madurai',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Madurai – Rameswaram – Dhanushkodi – Madurai (2 Days / 1 Night)</strong></li>
          <li><strong>Madurai – Kodaikanal – Madurai (3 Days / 2 Nights)</strong></li>
          <li><strong>Madurai – Rameswaram – Kanyakumari – Madurai (4 Days / 3 Nights)</strong></li>
          <li><strong>Madurai – Munnar – Thekkady – Alleppey – Madurai (5 Days / 4 Nights)</strong></li>
          <li><strong>Madurai – Palani – Thiruchendur – Thirupparankundram – Madurai (Murugan Arupadai Circuit)</strong></li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'How does round-trip taxi billing work?',
      a: 'Round-trip journeys are calculated based on the total kilometres from your pickup in Madurai back to Madurai, subject to a standard minimum of 250 km or 300 km per calendar day.'
    },
    {
      q: 'Is driver accommodation and food included?',
      a: 'Driver bata (driver allowance) covers driver food and daily maintenance. Customers do not need to arrange separate accommodation for the driver in most tourist towns.'
    },
    {
      q: 'Can we customize our travel stops during the tour?',
      a: 'Yes! Our round-trip cabs give you full freedom to add sightseeing spots, dining stops, and photo sessions within the general travel corridor.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai Round Trip Taxi Service"
      heroSubtitle="Book dedicated round-trip outstation cabs and multi-day holiday taxis from Madurai with transparent pricing and experienced chauffeurs."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/madurai-round-trip-taxi"
      bookingPreset={{ tripType: 'roundtrip', destination: 'Round Trip Tour' }}
      routeMeta={{
        distance: 'Multi-Day Circuits',
        duration: '1 to 7+ Days',
        bestRoute: 'All South India Corridors',
        vehicleOptions: 'Dzire, Innova Crysta, Tempo'
      }}
    />
  );
};

export default MaduraiRoundTripTaxi;
