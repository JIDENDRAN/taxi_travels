import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TermsAndConditions() {
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
        Terms & <span className="text-[#d4951e]">Conditions</span>
      </h1>
      
      <div className="prose prose-lg text-gray-700 font-outfit max-w-none space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-bold text-[#0f2420] mt-8 mb-4">1. Agreement to Terms</h2>
          <p>By accessing or using our services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0f2420] mt-8 mb-4">2. Bookings and Payments</h2>
          <p>All bookings are subject to availability. Prices are subject to change without prior notice. A deposit or full payment may be required to confirm your booking. Payments must be made in the currency specified at the time of booking.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0f2420] mt-8 mb-4">3. Cancellations and Refunds</h2>
          <p>Cancellation policies vary depending on the service booked. Please refer to your specific booking confirmation for details. We reserve the right to cancel or modify tours due to unforeseen circumstances (e.g., weather conditions).</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0f2420] mt-8 mb-4">4. Customer Responsibilities</h2>
          <p>Customers are responsible for providing accurate information during booking. Customers must comply with the instructions of our drivers and guides during tours. We are not liable for any personal belongings lost or damaged during our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0f2420] mt-8 mb-4">5. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p className="mt-2 font-medium">maduraibesttoursandtravels01@gmail.com</p>
        </section>
      </div>
    </motion.div>
  );
}
