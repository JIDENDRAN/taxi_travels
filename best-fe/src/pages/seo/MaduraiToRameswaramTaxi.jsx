import React from 'react';
import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/rameswaram_desktop.png';

const MaduraiToRameswaramTaxi = () => {
  const sections = [
    {
      heading: 'Book a Madurai to Rameswaram Taxi',
      content: `
        <p>Planning a spiritual journey to the sacred island of Rameswaram? Booking a reliable <strong>Madurai to Rameswaram taxi</strong> with Madurai Best Tours and Travels is the most convenient and comfortable way to travel. Thousands of pilgrims undertake this journey every year to visit the Ramanathaswamy Temple and bathe in its holy theerthams.</p>
        <p>We offer specialized one-way drops as well as comprehensive 1-day or 2-day round-trip packages from Madurai to Rameswaram. Our drivers are highly experienced with this specific route and will guide you to all the essential spiritual and scenic spots along the way.</p>
      `
    },
    {
      heading: 'Distance, Travel Time, and Route Details',
      content: `
        <p>The road trip from Madurai to Rameswaram is highly scenic, culminating in the spectacular drive across the Pamban Bridge.</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Distance:</strong> Approximately 170 to 180 kilometers.</li>
          <li><strong>Travel Time:</strong> It takes about 3 to 3.5 hours by car via the NH87 highway, depending on traffic conditions.</li>
          <li><strong>Scenic Highlights:</strong> The highlight of the journey is crossing the 2-kilometer long Pamban Road Bridge, which offers breathtaking views of the ocean and the parallel railway bridge.</li>
        </ul>
      `
    },
    {
      heading: 'Places to Visit in Rameswaram',
      content: `
        <p>When you book our Madurai to Rameswaram round-trip package, our drivers will ensure you visit all the important landmarks:</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Ramanathaswamy Temple:</strong> The focal point of the pilgrimage, famous for its magnificent corridors and 22 holy wells (theerthams).</li>
          <li><strong>Agnitheertham:</strong> The sacred beach just outside the temple where pilgrims take a holy dip before entering.</li>
          <li><strong>Dhanushkodi:</strong> The hauntingly beautiful abandoned town at the eastern tip of the island, where the Bay of Bengal meets the Indian Ocean.</li>
          <li><strong>Dr. A.P.J. Abdul Kalam Memorial:</strong> A beautifully constructed tribute to India's beloved former President.</li>
          <li><strong>Kothandaramaswamy Temple:</strong> A historic temple surrounded by the sea, holding immense mythological significance.</li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'Can I book a one-way taxi from Madurai to Rameswaram?',
      a: 'Yes, we provide highly affordable one-way drop services from Madurai city or Madurai Airport directly to your hotel in Rameswaram.'
    },
    {
      q: 'Can a trip to Rameswaram be completed in one day from Madurai?',
      a: 'Yes, a 1-day round trip is possible if you start very early in the morning (around 5:00 AM). However, for a more relaxed experience that includes a visit to Dhanushkodi, we highly recommend a 2-day package.'
    },
    {
      q: 'Are the toll charges included in the fare?',
      a: 'If you are booking a fixed tour package, tolls are included. If you are booking on a per-km rate, toll charges and parking fees will be extra at actuals.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai to Rameswaram Taxi & Cabs"
      heroSubtitle="Comfortable, safe, and affordable taxi services from Madurai to the sacred island of Rameswaram. Book one-way drops or round-trip packages."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
    />
  );
};

export default MaduraiToRameswaramTaxi;
