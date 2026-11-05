import React from 'react';
import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/cinematic_south_india.png';

const MaduraiTaxiService = () => {
  const sections = [
    {
      heading: 'Reliable and Affordable Taxi Service in Madurai',
      content: `
        <p>When you are looking for the best <strong>Madurai taxi service</strong>, Madurai Best Tours and Travels stands out as the most trusted choice. We offer a diverse fleet of well-maintained vehicles, professional drivers, and an unwavering commitment to your safety and comfort.</p>
        <p>Whether you need a quick drop within the city, a full day of local sightseeing, or a long-distance outstation trip across South India, our comprehensive cab booking services are tailored to meet all your travel requirements at highly competitive prices.</p>
      `
    },
    {
      heading: 'Why Choose Our Cab Booking Service?',
      content: `
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Punctuality:</strong> We value your time. Our drivers always arrive ahead of schedule.</li>
          <li><strong>Premium Fleet:</strong> Choose from Swift Dzire, Innova Crysta, and spacious Tempo Travellers.</li>
          <li><strong>Transparent Billing:</strong> What you see is what you pay. No hidden night charges or unexpected tolls.</li>
          <li><strong>Local Expertise:</strong> Our drivers double as local guides, ensuring you visit the best spots and eat at authentic places.</li>
        </ul>
      `
    },
    {
      heading: 'Local Sightseeing & Outstation Rides',
      content: `
        <p>Madurai is a city steeped in history. With our dedicated local sightseeing packages, you can comfortably visit the Meenakshi Amman Temple, Thirumalai Nayakkar Mahal, Gandhi Museum, and the Alagar Koyil without worrying about navigating traffic or finding parking.</p>
        <p>Planning an outstation trip? We offer highly affordable one-way and round-trip taxi services from Madurai to Rameswaram, Kodaikanal, Ooty, Munnar, and Kanyakumari. Our outstation cabs come with special day-rental packages that are perfect for families and large groups.</p>
      `
    }
  ];

  const faqs = [
    {
      q: 'How much does a taxi cost per km in Madurai?',
      a: 'Our rates start at just ₹14/km for standard sedans like Swift Dzire, and go up to ₹22/km for premium SUVs like Innova Crysta. We also offer fixed-price day rental packages.'
    },
    {
      q: 'Do you provide 24/7 taxi service?',
      a: 'Yes! We operate 24 hours a day, 7 days a week. Whether you have an early morning flight or a late-night train arrival, you can count on us.'
    },
    {
      q: 'Can I book an outstation cab from Madurai?',
      a: 'Absolutely. We specialize in outstation trips to Rameswaram, Kodaikanal, Munnar, and across South India. You can book one-way drops or multi-day round trips.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai Taxi Service & Cab Booking"
      heroSubtitle="Safe, reliable, and affordable taxi services for local sightseeing, outstation trips, and airport transfers in Madurai."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
    />
  );
};

export default MaduraiTaxiService;
