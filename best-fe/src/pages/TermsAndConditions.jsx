import Hero from '../assets/opt/kanyakumari.webp';
import { PageHero } from '../components/ui';

export default function TermsAndConditions() {
  return (
    <>
      <PageHero compact eyebrow="Legal" title="Terms & Conditions" image={Hero} crumbs={['Terms & Conditions']} />
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <div className="prose-site max-w-3xl">
        
        <section>
          <h2>1. Agreement to Terms</h2>
          <p>By accessing or using our services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services.</p>
        </section>

        <section>
          <h2>2. Bookings and Payments</h2>
          <p>All bookings are subject to availability. Prices are subject to change without prior notice. A deposit or full payment may be required to confirm your booking. Payments must be made in the currency specified at the time of booking.</p>
        </section>

        <section>
          <h2>3. Cancellations and Refunds</h2>
          <p>Cancellation policies vary depending on the service booked. Please refer to your specific booking confirmation for details. We reserve the right to cancel or modify tours due to unforeseen circumstances (e.g., weather conditions).</p>
        </section>

        <section>
          <h2>4. Customer Responsibilities</h2>
          <p>Customers are responsible for providing accurate information during booking. Customers must comply with the instructions of our drivers and guides during tours. We are not liable for any personal belongings lost or damaged during our services.</p>
        </section>

        <section>
          <h2>5. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>maduraibesttoursandtravels01@gmail.com</p>
        </section>
      
          </div>
        </div>
      </section>
    </>
  );
}
