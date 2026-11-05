import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
    >
      <h1 className="text-4xl md:text-5xl font-black text-[#0f2420] mb-8 font-poppins">
        Privacy <span className="text-[#d4951e]">Policy</span>
      </h1>
      
      <div className="prose prose-lg text-gray-700 font-outfit max-w-none space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-bold text-[#0f2420] mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information that you provide directly to us when you use our services, such as when you request a quote, book a tour, or contact us. This may include your name, email address, phone number, and any other information you choose to provide.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0f2420] mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process your bookings and transactions</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0f2420] mt-8 mb-4">3. Information Sharing</h2>
          <p>We do not share, sell, or rent your personal information to third parties for their marketing purposes. We may share information only with service providers who need access to such information to carry out work on our behalf.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0f2420] mt-8 mb-4">4. Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0f2420] mt-8 mb-4">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-2 font-medium">maduraibesttoursandtravels01@gmail.com</p>
        </section>
      </div>
    </motion.div>
  );
}
