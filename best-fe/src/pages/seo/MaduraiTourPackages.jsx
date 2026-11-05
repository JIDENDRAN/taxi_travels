import React from 'react';
import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/meenakshi_desktop.png';

const MaduraiTourPackages = () => {
  const sections = [
    {
      heading: 'Customized Madurai Tour Packages',
      content: `
        <p>Explore the cultural capital of Tamil Nadu and its breathtaking surroundings with our expertly crafted <strong>Madurai tour packages</strong>. Madurai Best Tours and Travels specializes in creating unforgettable itineraries that cover the finest temples, heritage sites, and hill stations in South India.</p>
        <p>Whether you are planning a short 1-day local sightseeing trip or a comprehensive 7-day South India temple tour, our customizable packages are designed to provide maximum value, comfort, and convenience. Leave the route planning, driving, and logistics to us while you focus on making memories with your family.</p>
      `
    },
    {
      heading: 'Popular Madurai Local Sightseeing Itinerary',
      content: `
        <p>If you have just one day in Madurai, our comprehensive local sightseeing package is perfect for you. A typical full-day itinerary includes:</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Morning:</strong> Darshan at the world-famous Meenakshi Amman Temple, followed by a visit to the historic Puthu Mandapam.</li>
          <li><strong>Mid-Day:</strong> Explore the grand architecture of Thirumalai Nayakkar Mahal and learn about history at the Gandhi Memorial Museum.</li>
          <li><strong>Afternoon:</strong> A peaceful drive to the Alagar Koyil and Pazhamudircholai Murugan Temple situated on the scenic Solaimalai hills.</li>
          <li><strong>Evening:</strong> Witness the spectacular night ceremony at Meenakshi Temple or shop for famous Madurai Sungudi sarees.</li>
        </ul>
      `
    },
    {
      heading: 'Multi-Day South India Tour Packages from Madurai',
      content: `
        <p>Madurai serves as the perfect gateway to explore the rest of southern Tamil Nadu and Kerala. We offer highly popular multi-day packages:</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>2-Day Madurai & Rameswaram Tour:</strong> The ultimate spiritual journey covering the two most important temple cities.</li>
          <li><strong>4-Day Madurai, Rameswaram & Kanyakumari Tour:</strong> A comprehensive coastal temple package ending at the southern tip of India.</li>
          <li><strong>3-Day Madurai to Kodaikanal Package:</strong> Transition from heritage to nature with a relaxing trip to the "Princess of Hill Stations".</li>
          <li><strong>Munnar & Thekkady Tours:</strong> Cross the border into Kerala's "God's Own Country" for a lush, green wildlife and tea-garden experience.</li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'Do your tour packages include hotel accommodation?',
      a: 'We primarily focus on transportation and guided vehicle tours. However, upon request, we can assist you with hotel recommendations and bookings through our trusted local partners.'
    },
    {
      q: 'Are your tour packages customizable?',
      a: 'Yes, absolutely! 100% of our tour packages can be customized. You can decide how long you want to stay at a particular spot, or add/remove destinations based on your interests and schedule.'
    },
    {
      q: 'Is driver bata (allowance) included in the package cost?',
      a: 'When you book a fixed tour package with us, the price we quote includes fuel, driver bata, and toll charges. There are no hidden fees.'
    }
  ];

  return (
    <SEOLandingPage
      title="Best Madurai Tour Packages"
      heroSubtitle="Book customized local sightseeing and South India tour packages from Madurai. Experience heritage, spirituality, and nature with our expert drivers."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
    />
  );
};

export default MaduraiTourPackages;
