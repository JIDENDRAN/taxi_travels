import API_BASE_URL from '../apiConfig';

/**
 * Fetches dynamic Google Business Profile reviews from the backend proxy endpoint.
 * Handles network failures gracefully by returning a clean error fallback structure.
 * 
 * @returns {Promise<Object>} Formatted reviews payload
 */
export const fetchGoogleReviews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/google-reviews`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchGoogleReviews service:', error);
    return {
      success: false,
      message: 'Failed to connect to backend api',
      businessName: 'Madurai Best Tours and Travels',
      rating: 5.0,
      userRatingCount: 250,
      googleReviewUrl: 'https://search.google.com/local/reviews?placeid=ChIJyXG_6UZaADsR0Lq9mO32ZYo',
      reviews: []
    };
  }
};
