import React from 'react';
import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/cinematic_south_india.png';

const TempoTravellerRentalMadurai = () => {
  const sections = [
    {
      heading: 'Premium Tempo Traveller Rental in Madurai',
      content: `
        <p>Planning a group trip with extended family, friends, or colleagues? A <strong>Tempo Traveller rental in Madurai</strong> is the most comfortable and cost-effective way to travel together. Madurai Best Tours and Travels offers a fleet of modern, spacious, and impeccably maintained Tempo Travellers and Force Urbanias.</p>
        <p>Traveling together means no one gets left behind in a separate car. You get to share the conversations, the music, and the memories while our professional driver handles the navigation and traffic.</p>
      `
    },
    {
      heading: 'Our Group Travel Fleet Options',
      content: `
        <p>We provide multiple seating configurations to perfectly match your group size:</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>12-Seater Tempo Traveller:</strong> Perfect for medium-sized families. Features push-back seats, ample legroom, and a powerful AC system.</li>
          <li><strong>14-Seater Tempo Traveller:</strong> Offers a bit more space, ideal for groups who need extra room for luggage during outstation trips.</li>
          <li><strong>18-Seater Tempo Traveller:</strong> The ultimate choice for large family tours or corporate outings.</li>
          <li><strong>Force Urbania:</strong> The newest and most premium addition to our fleet. The Urbania offers aircraft-like comfort, ultra-spacious interiors, large panoramic windows, and superior suspension for an incredibly smooth ride.</li>
        </ul>
      `
    },
    {
      heading: 'Why Book a Tempo Traveller With Us?',
      content: `
        <p>When you book a Tempo Traveller with Madurai Best Tours and Travels, you are guaranteed a premium experience:</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Spacious Interiors:</strong> High roofs allowing passengers to stand and move comfortably, along with deep push-back reclining seats.</li>
          <li><strong>Entertainment Systems:</strong> Premium music and video systems to keep the group entertained during long outstation drives.</li>
          <li><strong>Expert Heavy-Vehicle Drivers:</strong> Our Tempo Traveller drivers hold commercial heavy-vehicle licenses and possess years of experience driving large vehicles safely on both highways and hill stations like Kodaikanal and Munnar.</li>
          <li><strong>Ample Luggage Space:</strong> Dedicated rear boot space and roof carriers to accommodate all your bags comfortably without cluttering the seating area.</li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'Do you rent Tempo Travellers for outstation trips like Kerala or Tirupati?',
      a: 'Yes, we provide Tempo Traveller rentals for outstation trips all across South India, including Kerala (Munnar, Alleppey), Tirupati, Bangalore, and Rameswaram.'
    },
    {
      q: 'What is the price of renting a Tempo Traveller per km?',
      a: 'Our 12-seater Tempo Travellers start at ₹25/km, while our larger 18-seater options are priced around ₹30/km. The premium Force Urbania is available at ₹27/km. Please contact us for specific day rental package quotes.'
    },
    {
      q: 'Do the Tempo Travellers have AC?',
      a: 'Yes, 100% of our Tempo Travellers and Urbanias are fully air-conditioned with individual AC vents for each seat to ensure maximum comfort.'
    }
  ];

  return (
    <SEOLandingPage
      title="Tempo Traveller Rental in Madurai"
      heroSubtitle="Spacious 12, 14, and 18-seater Tempo Travellers and premium Force Urbanias for family tours, corporate outings, and outstation trips."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
    />
  );
};

export default TempoTravellerRentalMadurai;
