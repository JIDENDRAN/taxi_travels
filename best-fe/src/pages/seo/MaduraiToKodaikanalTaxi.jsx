import React from 'react';
import SEOLandingPage from '../../components/SEOLandingPage';
import HeroBg from '../../assets/kodaikanal_bg.png';

const MaduraiToKodaikanalTaxi = () => {
  const sections = [
    {
      heading: 'Safe and Comfortable Madurai to Kodaikanal Taxi',
      content: `
        <p>Escape the heat of the plains and journey up to the "Princess of Hill Stations" with our premium <strong>Madurai to Kodaikanal taxi</strong> service. Madurai Best Tours and Travels provides safe, comfortable, and highly reliable cab services for this scenic uphill journey.</p>
        <p>Driving on hill station ghat roads requires immense skill and experience. Our drivers are specially trained for mountain driving, ensuring your family feels completely safe while you sit back and enjoy the spectacular views of the Western Ghats.</p>
      `
    },
    {
      heading: 'Distance, Travel Time, and Route Information',
      content: `
        <p>The drive from Madurai to Kodaikanal is one of the most beautiful road trips in Tamil Nadu, taking you through bustling towns, lush plains, and finally winding up the misty Palani Hills.</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Distance:</strong> The distance is approximately 115 to 120 kilometers.</li>
          <li><strong>Travel Time:</strong> The journey usually takes around 3 to 3.5 hours depending on traffic and the weather conditions on the ghat roads.</li>
          <li><strong>The Route:</strong> You will travel via NH 44 and then take the scenic Batlagundu-Kodaikanal Ghat Road. The drive features numerous hairpin bends and viewpoints perfect for photography.</li>
        </ul>
      `
    },
    {
      heading: 'Kodaikanal Local Sightseeing Tour',
      content: `
        <p>When you book a round-trip package with us, our drivers will take you to all the major tourist attractions in and around Kodaikanal. Key spots include:</p>
        <ul class="list-disc pl-5 space-y-2 mt-4">
          <li><strong>Kodai Lake:</strong> The star-shaped artificial lake located in the heart of the town. Enjoy boating, cycling, and horse riding.</li>
          <li><strong>Coaker's Walk:</strong> A paved pedestrian path running along the edge of steep slopes, offering breathtaking views of the plains.</li>
          <li><strong>Pillar Rocks:</strong> Three giant rock pillars standing 400 feet tall, often shrouded in beautiful mist.</li>
          <li><strong>Pine Forest:</strong> A mesmerizing and highly photogenic forest preserved by the forest department.</li>
          <li><strong>Silver Cascade Waterfall:</strong> A magnificent 180-foot waterfall located right on the Madurai-Kodaikanal road, making it a perfect first stop.</li>
        </ul>
      `
    }
  ];

  const faqs = [
    {
      q: 'Do your drivers have experience driving on the Kodaikanal ghat roads?',
      a: 'Yes, safety is our top priority. We only assign highly experienced drivers who are well-versed with the hairpin bends and steep inclines of the Kodaikanal ghat roads.'
    },
    {
      q: 'Can I book a one-way taxi to my resort in Kodaikanal?',
      a: 'Absolutely. We offer direct one-way drops from Madurai Railway Station, Airport, or your home straight to your hotel or resort in Kodaikanal.'
    },
    {
      q: 'Are AC cabs suitable for the uphill drive?',
      a: 'Yes, our vehicles are well-maintained and powerful enough to climb the hills with the AC on. However, once you enter the cool climate of Kodaikanal, you might prefer rolling down the windows to enjoy the fresh mountain breeze!'
    }
  ];

  return (
    <SEOLandingPage
      title="Madurai to Kodaikanal Taxi Service"
      heroSubtitle="Enjoy a safe and scenic drive to Kodaikanal with our expert mountain drivers. Book one-way drops or complete sightseeing packages."
      heroBg={HeroBg}
      sections={sections}
      faqs={faqs}
    />
  );
};

export default MaduraiToKodaikanalTaxi;
