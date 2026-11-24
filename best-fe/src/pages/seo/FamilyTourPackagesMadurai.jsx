import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/opt/hero-south-india.webp';

const FamilyTourPackagesMadurai = () => {
  const sections = [
    {
      heading: 'Memorable South India Family Holiday Tour Packages from Madurai',
      content: `
        <p>Travelling with family requires careful planning, spacious vehicles, child-friendly stops, and elderly care. At <strong>Madurai Best Travels</strong>, we design customized <strong>Family Tour Packages from Madurai</strong> combining holy temple darshans, mist-clad hill stations, tranquil Kerala backwaters, and pristine coastal beaches.</p>
        <p>Whether you are a nuclear family of 4, a multigenerational group with grandparents, or a joint family gathering, we have the ideal fleet of Swift Dzire, Innova Crysta, and 12-to-18 seater Tempo Travellers with dedicated, courteous drivers who treat your family like their own.</p>
      `
    },
    {
      heading: 'Most Popular Family Tour Circuits Starting from Madurai',
      content: `
        <ul class="list-disc pl-5 space-y-3 mt-4">
          <li><strong>Madurai – Rameswaram – Kanyakumari (4 Days / 3 Nights):</strong> The quintessential South India pilgrimage and beach holiday. Covers Meenakshi Temple, Pamban Bridge, Dhanushkodi, Vivekananda Rock, and Sunset Point.</li>
          <li><strong>Madurai – Kodaikanal Family Retreat (3 Days / 2 Nights):</strong> Cool off in the Nilgiri foothills with boating at Kodai Lake, scenic walks along Coaker's Walk, and picnics at Pine Forest and Bryant Park.</li>
          <li><strong>Madurai – Munnar – Thekkady Wildlife Circuit (4 Days / 3 Nights):</strong> Tea garden strolls, spice garden tours, Periyar Lake boat safari for elephant spotting, and Kathakali cultural shows.</li>
          <li><strong>Tamil Nadu Great Living Chola Heritage Tour (3 Days / 2 Nights):</strong> Madurai to Thanjavur Big Temple, Gangaikonda Cholapuram, Darasuram Airavatesvara, and Srirangam Temple in Trichy.</li>
          <li><strong>Arupadai Veedu Murugan Pilgrimage Circuit (5 Days / 4 Nights):</strong> Complete darshan of all 6 sacred abodes: Thirupparankundram, Thiruchendur, Palani, Swamimalai, Thiruttani, and Pazhamudhircholai.</li>
        </ul>
      `
    },
    {
      heading: 'Family-Friendly Amenities & Service Guarantees',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Elderly-Friendly Assistance:</strong> Low-step vehicles, slow paced travel, and drop points near temple entry gates for seniors.</li>
          <li><strong>Child Safety & Cleanliness:</strong> 100% smoke-free, spotless air-conditioned cabins with clean seats and bottled water assistance.</li>
          <li><strong>Flexible Dining Stops:</strong> Drivers stop at trusted, hygienic vegetarian and multi-cuisine highway restaurants.</li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'Can we customize the tour itinerary for our family?',
      a: 'Yes! All our family tour packages are 100% customizable. You decide the travel dates, destinations, halt points, and preferred vehicle.'
    },
    {
      q: 'Which vehicle is best suited for a family of 6 to 7 people?',
      a: 'The Toyota Innova Crysta is the ideal vehicle for 6 to 7 passengers, providing luxury captain recliners, separate roof AC vents, and generous luggage boot space.'
    },
    {
      q: 'Do your drivers assist seniors and children during temple visits?',
      a: 'Yes, our respectful chauffeurs help with luggage, guide you to battery car buggy services at temples, and ensure senior citizens have minimal walking distance.'
    }
  ];

  return (
    <SEOLandingPage
      title="Family Tour Packages from Madurai"
      heroSubtitle="Customized South India family holiday and pilgrimage tour packages with comfortable AC cabs, experienced chauffeurs, and transparent pricing."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
      canonicalPath="/family-tour-packages-madurai"
      bookingPreset={{ tripType: 'roundtrip', destination: 'Family Tour Package' }}
      routeMeta={{
        distance: 'Customized Circuits',
        duration: '2 to 7 Days',
        bestRoute: 'Tamil Nadu & Kerala Corridors',
        vehicleOptions: 'Innova Crysta, Tempo Traveller'
      }}
    />
  );
};

export default FamilyTourPackagesMadurai;