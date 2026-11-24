import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/hero-south-india.webp';

const InnovaCrystaRentalMadurai = () => {
  const sections = [
    {
      heading: 'Luxury Toyota Innova Crysta Rental in Madurai',
      content: `
        <p>When premium comfort, highway safety, and spacious luxury are top priorities, nothing compares to the <strong>Toyota Innova Crysta</strong>. At <strong>Madurai Best Travels</strong>, we maintain a fleet of immaculate 7-seater and 8-seater Innova Crysta vehicles available for local hire, airport transfers, corporate delegations, and outstation holiday tours.</p>
        <p>Whether embarking on long highway stretches to Rameswaram and Kanyakumari or negotiating the winding ghat climbs of Kodaikanal and Munnar, the Innova Crysta guarantees unmatched ride smoothness, whisper-quiet cabin insulation, and supreme passenger comfort.</p>
      `
    },
    {
      heading: 'Innova Crysta Features & Comfort Specifications',
      content: `
        <ul class="list-disc pl-5 space-y-3 mt-4">
          <li><strong>Captain Seat Configuration:</strong> Plush middle-row captain seats with individual armrests, generous legroom, and multi-angle recline.</li>
          <li><strong>Powerful Roof-Mounted Dual Air Conditioning:</strong> Independent climate vents for every row ensure all passengers stay cool even during peak Tamil Nadu summers.</li>
          <li><strong>Massive Luggage Capacity:</strong> Easily accommodates 4 to 5 large suitcases and travel bags with flexible foldable 3rd-row seating.</li>
          <li><strong>Advanced Safety:</strong> Dual airbags, ABS with EBD, vehicle stability control, and sturdy chassis engineering for complete peace of mind on expressways.</li>
          <li><strong>Smooth Ghat Road Suspension:</strong> Minimizes body roll and motion sickness along winding hill routes to Kodaikanal, Valparai, and Ooty.</li>
        </ul>
      `
    },
    {
      heading: 'Best Uses for Innova Crysta Hire in Madurai',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Family Holidays & Pilgrimages:</strong> Ample space for parents, children, and grandparents to travel together comfortably.</li>
          <li><strong>VIP & Corporate Guest Transfers:</strong> Airport pickup from Madurai (IXM) with professional uniformed chauffeur and nameboard reception.</li>
          <li><strong>Destination Weddings & Events:</strong> Elegant premium transportation for wedding guests, VIP dignitaries, and bridal families.</li>
          <li><strong>Hill Station Tour Circuits:</strong> The undisputed king of ghat roads, delivering effortless power and passenger comfort.</li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'How many passengers can travel in an Innova Crysta?',
      a: 'We offer both 7-seater (with middle-row luxury captain seats) and 8-seater (bench seat) Innova Crysta models, accommodating 6 to 7 passengers plus the chauffeur comfortably.'
    },
    {
      q: 'Can I rent an Innova Crysta for outstation hill trips like Kodaikanal or Munnar?',
      a: 'Yes! Innova Crysta is our most popular vehicle for hill stations due to its robust engine power, smooth shock absorbers, and stability on hairpin bends.'
    },
    {
      q: 'What is the rental rate for Innova Crysta in Madurai?',
      a: 'Rates start at competitive per-km tariffs for outstation journeys, with tailored fixed-price packages for Madurai local sightseeing and Madurai Airport transfers.'
    }
  ];

  return (
    <SEOLandingPage
      title="Innova Crysta Rental in Madurai"
      heroSubtitle="Rent luxurious 7-seater & 8-seater Toyota Innova Crysta cabs for outstation tours, airport transfers, and family pilgrimages."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/innova-crysta-rental-madurai"
      bookingPreset={{ vehicle: 'Innova Crysta', tripType: 'roundtrip' }}
      routeMeta={{
        distance: 'Local & Outstation',
        duration: 'Hourly / Daily / Outstation',
        bestRoute: 'Smooth on Highways & Hills',
        vehicleOptions: '7-Seater Captain / 8-Seater'
      }}
    />
  );
};

export default InnovaCrystaRentalMadurai;