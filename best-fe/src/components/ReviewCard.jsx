import { useState } from 'react';
import { Star, User, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ReviewCard Component
 * Displays individual user feedback, ratings, profile photos, and Google verification markers.
 */
const ReviewCard = ({ review }) => {
  const {
    authorName,
    authorPhoto,
    rating,
    text,
    relativeTime,
    languageCode
  } = review;

  const [isExpanded, setIsExpanded] = useState(false);
  const isLongText = text && text.length > 150;
  const displayedText = isExpanded ? text : (isLongText ? `${text.slice(0, 150)}...` : text);

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col justify-between w-[280px] sm:w-[320px] md:w-auto flex-shrink-0 snap-center md:snap-align-none hover:border-[#f5c842]/40 hover:bg-white/10 transition-all duration-300 shadow-lg relative overflow-hidden"
    >
      <div>
        {/* Top bar: avatar + name & date */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {authorPhoto ? (
              <img
                src={authorPhoto}
                alt={authorName}
                className="w-11 h-11 rounded-full object-cover border-2 border-white/20 shadow-md"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/25 flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white/60" />
              </div>
            )}
            <div className="text-left">
              <h4 className="font-poppins font-bold text-white text-xs sm:text-sm tracking-wide line-clamp-1">{authorName}</h4>
              <span className="text-white/50 text-[10px] uppercase font-bold tracking-widest mt-0.5 block">{relativeTime}</span>
            </div>
          </div>

          {/* Verification Icon (Google) */}
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10" title="Verified Review on Google">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.72 5.72 0 0 1 8.24 12.8a5.72 5.72 0 0 1 5.751-5.8 5.6 5.6 0 0 1 3.931 1.6l3.11-3.1A10.027 10.027 0 0 0 13.99 2C8.47 2 4 6.47 4 12s4.47 10 9.99 10c5.75 0 9.77-4.04 9.77-9.92 0-.67-.06-1.3-.17-1.8H12.24Z"
              />
            </svg>
          </div>
        </div>

        {/* Rating Star Row */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, idx) => (
            <Star
              key={idx}
              className={`w-3.5 h-3.5 ${
                idx < rating ? 'text-[#f5c842] fill-current' : 'text-white/20'
              }`}
            />
          ))}
        </div>

        {/* Text Content */}
        <p className="text-white/80 text-xs sm:text-[13px] font-medium leading-relaxed mb-4 text-left flex-grow">
          "{displayedText}"
          {isLongText && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#f5c842] hover:text-[#f0a93a] ml-1.5 font-bold cursor-pointer outline-none inline-block text-[11px]"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </p>

      </div>

      {/* Optional review language translation info */}
      {languageCode && languageCode !== 'en' && (
        <div className="flex items-center gap-1 mt-auto self-start bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-[9px] text-white/50">
          <Languages className="w-3 h-3" />
          <span>Translated from {languageCode.toUpperCase()}</span>
        </div>
      )}
    </motion.div>
  );
};

export default ReviewCard;
