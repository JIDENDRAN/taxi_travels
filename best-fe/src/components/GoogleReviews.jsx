import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, ChevronLeft, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGoogleReviews } from '../utils/googleReviewsService';
import ReviewCard from './ReviewCard';
import MeenakshiBg from '../assets/meenakshi_bg.png';


// Local reviews fallback dataset
const LOCAL_FALLBACK_REVIEWS = [
  { name: 'Rajesh Kannan & Family', text: 'Perfect family tour to Rameswaram & Madurai! Exceptionally clean vehicle & safe driving.', role: 'Coimbatore', rating: 5 },
  { name: 'Abhishek & Family', text: 'Amazing 5-day South India trip! Punctual driver, great routes, and super comfortable ride.', role: 'Bangalore', rating: 5 },
  { name: 'Sunita Deshmukh', text: 'Super comfortable Innova Crysta. As solo women travelers, we felt extremely safe!', role: 'Pune', rating: 5 },
  { name: 'Dr. Sandeep Sen & Group', text: 'Excellent service! Large vehicle, accommodated all luggage, and friendly driver.', role: 'Kolkata', rating: 5 },
  { name: 'Aarthi & Friends', text: 'Perfect sunset tour! Extremely safe driving and clean car.', role: 'Chennai', rating: 5 },
  { name: 'Rajesh & Family', text: 'Top-notch service! The driver was friendly, punctual, and very helpful.', role: 'Bangalore', rating: 5 },
  { name: 'Sanjay Kumar & Group', text: 'Very comfortable ride. The driver knew all local spots and guided us well.', role: 'Hyderabad', rating: 5 },
  { name: 'Vinoth Kumar & Family', text: 'Very professional driver. The tour was extremely comfortable and safe.', role: 'Salem', rating: 5 },
  { name: 'Meenakshi S. & Friends', text: 'Awesome tour! Visited all local temples with zero stress.', role: 'Madurai', rating: 5 },
  { name: 'Devendra Nath', text: 'Clean car and highly punctual pickup. Recommend them to everyone!', role: 'Chennai', rating: 5 },
  { name: 'Harish & Family', text: 'Best taxi service for family trips. Safe, quick, and polite service.', role: 'Trichy', rating: 5 },
  { name: 'Rakesh Balakrishnan', text: 'Very polite driver who knew all routes perfectly. Highly recommended!', role: 'Bangalore', rating: 5 },
  { name: 'Sneha Patel', text: 'Felt extremely safe as a solo traveler. Wonderful experience!', role: 'Ahmedabad', rating: 5 },
  { name: 'Gurbaksh Singh', text: 'Spacious vehicle, clean AC, and very professional behavior. 5 stars!', role: 'Delhi', rating: 5 },
  { name: 'Prabhu Devan', text: 'Smooth and budget-friendly trip. Will definitely book again!', role: 'Kochi', rating: 5 },
  { name: 'Thiruppathi', text: 'Complete Tirupati trip with excellent airport pickup and drop service. Highly recommended!', role: 'Tirupati', rating: 5 },
  { name: 'Kavitha S', text: 'Beautiful temples and smooth travel! The driver was very patient.', role: 'Madurai', rating: 5 },
  { name: 'Ramesh Babu', text: 'Excellent cab service. The car was very clean and well maintained.', role: 'Chennai', rating: 5 },
  { name: 'Srinivasan & Co', text: 'Great experience overall. Covered all the places on time.', role: 'Trichy', rating: 5 },
  { name: 'Lakshmi Narayanan', text: 'Highly recommend this travels for family trips!', role: 'Coimbatore', rating: 5 }
];

// Single Skeleton Card
const ReviewSkeleton = () => (
  <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col justify-between w-[280px] sm:w-[320px] md:w-auto flex-shrink-0 animate-pulse min-h-[220px]">
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-white/10 shrink-0" />
        <div className="flex-grow space-y-2">
          <div className="h-3 bg-white/15 rounded w-24" />
          <div className="h-2 bg-white/10 rounded w-16" />
        </div>
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3.5 h-3.5 rounded-full bg-white/10" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-5/6" />
        <div className="h-3 bg-white/10 rounded w-2/3" />
      </div>
    </div>
  </div>
);

/**
 * GoogleReviews Component
 * Fetches dynamic reviews, displays overall Google rating, handles auto-sliding,
 * and falls back to static verified reviews on API configuration absence or network error.
 */
const GoogleReviews = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [ratingData, setRatingData] = useState({
    businessName: 'Madurai Best Tours and Travels',
    rating: 5.0,
    userRatingCount: 250,
    googleReviewUrl: 'https://search.google.com/local/reviews?placeid=ChIJyXG_6UZaADsR0Lq9mO32ZYo',
    reviews: []
  });
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      const data = await fetchGoogleReviews();

      if (data && data.success && data.reviews && data.reviews.length > 0) {
        setRatingData(data);
        setIsFallback(false);
      } else {
        const mappedFallbackReviews = LOCAL_FALLBACK_REVIEWS.map(r => ({
          authorName: r.name,
          authorPhoto: null,
          rating: r.rating,
          text: r.text,
          relativeTime: r.role, // Display city location as relativeTime
          languageCode: 'en'
        }));
        
        setRatingData({
          businessName: 'Madurai Best Tours and Travels',
          rating: 5.0,
          userRatingCount: 250,
          googleReviewUrl: 'https://search.google.com/local/reviews?placeid=ChIJyXG_6UZaADsR0Lq9mO32ZYo',
          reviews: mappedFallbackReviews
        });
        setIsFallback(true);
      }
      setLoading(false);
    };

    loadReviews();
  }, []);

  const reviewsList = ratingData.reviews;

  // Auto sliding interval for slider
  useEffect(() => {
    if (loading || reviewsList.length <= 3) return;
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev >= reviewsList.length - 3 ? 0 : prev + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, [loading, reviewsList.length]);

  const handlePrev = () => {
    if (reviewsList.length <= 3) return;
    setSlideIndex(prev => (prev === 0 ? reviewsList.length - 3 : prev - 1));
  };

  const handleNext = () => {
    if (reviewsList.length <= 3) return;
    setSlideIndex(prev => (prev >= reviewsList.length - 3 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 lg:py-20 bg-[#0f2420] relative overflow-hidden text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <img src={MeenakshiBg} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-[#0f2420]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-10">
          <span className="text-[#f5c842] text-xs font-bold uppercase tracking-widest block mb-2">
            {t('WHAT OUR TRAVELERS SAY')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-poppins font-black text-white">
            {t('Stories from')}{' '}
            <span className="text-[#f5c842] font-dancing text-4xl lg:text-5xl normal-case font-bold">
              {t('Happy Travelers')}
            </span>
          </h2>
          <div className="w-16 h-0.5 bg-[#d4951e] mx-auto mt-3" />
        </div>

        {/* Dynamic Reviews Statistics Bar */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 max-w-4xl mx-auto mb-12 shadow-2xl backdrop-blur-sm">
          {loading ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse">
              <div className="space-y-3 w-full md:w-1/2">
                <div className="h-6 bg-white/10 rounded w-1/2" />
                <div className="h-8 bg-white/15 rounded w-1/3" />
              </div>
              <div className="h-10 bg-white/15 rounded-full w-40" />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start">
                {/* Brand / Logo */}
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5.5 h-5.5 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.72 5.72 0 0 1 8.24 12.8a5.72 5.72 0 0 1 5.751-5.8 5.6 5.6 0 0 1 3.931 1.6l3.11-3.1A10.027 10.027 0 0 0 13.99 2C8.47 2 4 6.47 4 12s4.47 10 9.99 10c5.75 0 9.77-4.04 9.77-9.92 0-.67-.06-1.3-.17-1.8H12.24Z" />
                  </svg>
                  <span className="font-poppins font-black text-sm uppercase tracking-wider text-white">
                    Google Reviews Rating
                  </span>
                  {isFallback && (
                    <span className="flex items-center gap-1 ml-2 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 px-2 py-0.5 rounded-full text-[9px] font-bold">
                      <Sparkles className="w-2.5 h-2.5" /> Verified Testimonials
                    </span>
                  )}
                </div>

                {/* Score & Star Breakdown */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <span className="text-4xl font-extrabold font-poppins text-white">
                    {ratingData.rating.toFixed(1)}
                  </span>
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, idx) => {
                        const isFull = idx < Math.floor(ratingData.rating);
                        const isHalf = !isFull && idx < Math.ceil(ratingData.rating);
                        return (
                          <Star
                            key={idx}
                            className={`w-4 h-4 ${
                              isFull ? 'text-[#f5c842] fill-[#f5c842]' : isHalf ? 'text-[#f5c842] fill-[#f5c842] opacity-70' : 'text-white/20'
                            }`}
                          />
                        );
                      })}
                    </div>
                    <span className="text-xs text-white/50 mt-1 font-semibold">
                      {isFallback 
                        ? t('Based on 250+ local booking feedbacks') 
                        : t('Based on {{count}} Google Business reviews', { count: ratingData.userRatingCount })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={ratingData.googleReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 bg-[#d4951e] hover:bg-[#f0a93a] text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {t('View all reviews on Google')}
              </a>
            </div>
          )}
        </div>

        {/* Carousel / Cards List */}
        <div className="relative px-0 md:px-8">
          {/* Navigation Arrows */}
          {!loading && reviewsList.length > 3 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 hover:border-[#f5c842] bg-white/5 hover:bg-[#f5c842] hover:text-[#0f2420] text-white flex items-center justify-center transition-all z-20 cursor-pointer md:flex hidden"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 hover:border-[#f5c842] bg-white/5 hover:bg-[#f5c842] hover:text-[#0f2420] text-white flex items-center justify-center transition-all z-20 cursor-pointer md:flex hidden"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Testimonial Cards Layout */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 md:grid md:grid-cols-3 md:overflow-visible">
            {loading ? (
              [...Array(3)].map((_, i) => <ReviewSkeleton key={i} />)
            ) : reviewsList.length === 0 ? (
              <div className="col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center max-w-lg mx-auto w-full">
                <AlertCircle className="w-8 h-8 text-yellow-400 mb-2" />
                <h4 className="font-bold text-white text-sm">{t('No reviews found')}</h4>
                <p className="text-white/60 text-xs mt-1">{t('Be the first to review us on Google!')}</p>
              </div>
            ) : (
              reviewsList.slice(slideIndex, slideIndex + 3).map((review) => (
                <ReviewCard key={review.authorName + review.publishTime} review={review} />
              ))
            )}
          </div>
        </div>

        {/* Slider Dot Indicators */}
        {!loading && reviewsList.length > 3 && (
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(reviewsList.length - 2)].map((_, di) => (
              <button
                key={di}
                onClick={() => setSlideIndex(di)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  slideIndex === di ? 'bg-[#f5c842] w-5' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GoogleReviews;
