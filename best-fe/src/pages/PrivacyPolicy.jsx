import Hero from '../assets/opt/thanjavur.webp';
import { PageHero } from '../components/ui';

export default function PrivacyPolicy() {
  return (
    <>
      <PageHero compact eyebrow="Legal" title="Privacy Policy" image={Hero} crumbs={['Privacy Policy']} />
      <section className="py-14 sm:py-20">
        <div className="container-x">
          <div className="prose-site max-w-3xl">
        
        <section>
          <h2>1. Information We Collect</h2>
          <p>We collect information that you provide directly to us when you use our services, such as when you request a quote, book a tour, or contact us. This may include your name, email address, phone number, and any other information you choose to provide.</p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process your bookings and transactions</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
          </ul>
        </section>

        <section>
          <h2>3. Information Sharing</h2>
          <p>We do not share, sell, or rent your personal information to third parties for their marketing purposes. We may share information only with service providers who need access to such information to carry out work on our behalf.</p>
        </section>

        <section>
          <h2>4. Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
        </section>

        <section>
          <h2>5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>maduraibesttoursandtravels01@gmail.com</p>
        </section>
      
          </div>
        </div>
      </section>
    </>
  );
}
