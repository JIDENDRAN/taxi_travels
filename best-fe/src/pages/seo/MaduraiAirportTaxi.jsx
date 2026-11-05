import React from 'react';
import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/madurai_aerial_bg.png';

const MaduraiAirportTaxi = () => {
  const sections = [
    {
      heading: 'Premium Madurai Airport Taxi Service',
      content: `
        <p>Arriving at or departing from Madurai Airport (IXM)? Madurai Best Tours and Travels provides seamless, on-time <strong>Madurai airport taxi</strong> and cab services. We understand that airport transfers require punctuality and reliability above all else, which is why our airport fleet is available 24/7 to ensure you never miss a flight.</p>
        <p>Avoid the hassle of waiting in long queues for unreliable app-based cabs. Pre-book your airport transfer with us, and our professional driver will be waiting for you at the arrivals gate with a name-board, ready to assist you with your luggage.</p>
      `
    },
    {
      heading: 'Our Airport Transfer Options',
      content: `
        <p>We cater to all types of travelers—solo backpackers, business executives, and large families. Our diverse fleet ensures we have the perfect vehicle for your luggage and seating requirements:</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Sedans (Swift Dzire, Etios):</strong> Perfect for 1-4 passengers with standard luggage.</li>
          <li><strong>SUVs (Innova, Innova Crysta):</strong> Ideal for 5-7 passengers or those carrying heavy/excess baggage.</li>
          <li><strong>Tempo Travellers:</strong> The best choice for corporate groups and large family arrivals.</li>
        </ul>
      `
    },
    {
      heading: 'Direct Outstation Drops from Madurai Airport',
      content: `
        <p>Many pilgrims and tourists fly into Madurai specifically to visit neighboring destinations. You don't need to go into the city to catch a bus or train. We offer direct airport-to-destination drops!</p>
        <p>You can book a direct <strong>Madurai Airport to Rameswaram taxi</strong>, or head straight to the cool hills with a <strong>Madurai Airport to Kodaikanal cab</strong>. We monitor your flight status so that even if your flight is delayed, our driver will be there waiting for you.</p>
      `
    }
  ];

  const faqs = [
    {
      q: 'How far is Madurai Airport from the city center?',
      a: 'Madurai Airport (IXM) is located approximately 15 to 18 kilometers from the main city center and the Meenakshi Amman Temple. The drive usually takes about 30-40 minutes depending on traffic.'
    },
    {
      q: 'Do you charge extra if my flight is delayed?',
      a: 'No, we do not charge waiting fees for flight delays. We track your flight status in real-time to ensure our driver is there exactly when you land.'
    },
    {
      q: 'Can I book a taxi from Madurai Airport to Rameswaram?',
      a: 'Yes, this is one of our most popular routes. The direct drive from Madurai Airport to Rameswaram takes about 3 to 3.5 hours.'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai Airport Taxi & Transfers"
      heroSubtitle="Punctual and comfortable 24/7 airport pickup and drop services. Never miss a flight with our premium airport cabs."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
    />
  );
};

export default MaduraiAirportTaxi;
