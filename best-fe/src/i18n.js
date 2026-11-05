import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';
// Removed Backend usage from i18n initialization

const resources = {
  en: {
    translation: {
      // Navbar & Common
      "Home": "Home",
      "About Us": "About Us",
      "Vehicles": "Vehicles",
      "Packages": "Packages",
      "Gallery": "Gallery",
      "Contact Us": "Contact Us",
      "Madurai Best Tours and Travels": "Madurai Best Tours and Travels",
      "Select Language": "Select Language",
      
      // Home
      "Safe & Comfortable Taxi Service in Madurai": "Safe & Comfortable Taxi Service in Madurai",
      "Book Your Ride": "Book Your Ride",
      "Pickup Location": "Pickup Location",
      "Drop Location": "Drop Location",
      "Your Name": "Your Name",
      "Phone Number": "Phone Number",
      "Select Vehicle": "Select Vehicle",
      "BOOK NOW": "BOOK NOW",
      "24/7 Service": "24/7 Service",
      "Clean Cars": "Clean Cars",
      "Safe Drivers": "Safe Drivers",
      "GPS Tracking": "GPS Tracking",
      "Call Now": "Call Now",
      "Chat on WhatsApp": "Chat on WhatsApp",
      "Our Premium Vehicles": "Our Premium Vehicles",
      "Starting from": "Starting from",
      "Popular Tour Packages": "Popular Tour Packages",
      "Why Choose Us?": "Why Choose Us?",
      "Experienced Drivers": "Experienced Drivers",
      "Clean & Safe Cars": "Clean & Safe Cars",
      "Affordable Price": "Affordable Price",
      "Fast Booking": "Fast Booking",
      "Secure Travel": "Secure Travel",
      "Customer Support": "Customer Support",
      "What Our Customers Say": "What Our Customers Say",
      "Happy Customers": "Happy Customers",
      "Trips Completed": "Trips Completed",
      "Hours Support": "Hours Support",

      // About
      "About": "About",
      "Us": "Us",
      "Your trusted travel partner in South India since 2015.": "Your trusted travel partner in South India since 2015.",
      "Our Story & Mission": "Our Story & Mission",
      "Started with a single cab in Madurai, we have grown into one of the most trusted and premium taxi service providers in Tamil Nadu. Our journey has been fueled by our passion for hospitality and customer safety.": "Started with a single cab in Madurai, we have grown into one of the most trusted and premium taxi service providers in Tamil Nadu. Our journey has been fueled by our passion for hospitality and customer safety.",
      "Our mission is to provide world-class, comfortable, and affordable tourism experiences. We believe that the journey is just as important as the destination, which is why we maintain a fleet of modern, sanitized vehicles driven by highly professional local experts.": "Our mission is to provide world-class, comfortable, and affordable tourism experiences. We believe that the journey is just as important as the destination, which is why we maintain a fleet of modern, sanitized vehicles driven by highly professional local experts.",
      "Years Experience": "Years Experience",
      "Safe Travel": "Safe Travel",
      "Award Winning Service": "Award Winning Service",
      "Recognized for excellence in local tourism.": "Recognized for excellence in local tourism.",
      "Core Values": "Core Values",
      "Safety First": "Safety First",
      "GPS enabled cars and background-verified drivers.": "GPS enabled cars and background-verified drivers.",
      "Customer Satisfaction": "Customer Satisfaction",
      "We go above and beyond to make your trip memorable.": "We go above and beyond to make your trip memorable.",
      "Passion for Travel": "Passion for Travel",
      "We love showing you the beauty of South India.": "We love showing you the beauty of South India.",

      // Vehicles
      "Our Fleet": "Our Fleet",
      "Choose from our wide range of well-maintained vehicles for your journey.": "Choose from our wide range of well-maintained vehicles for your journey.",
      "Book Now": "Book Now",
      "Extra Distance": "Per km Charge",
      "Per km Charge": "Per km Charge",

      // Packages
      "Tour Packages": "Tour Packages",
      "Explore the beauty of South India with our specially curated tour packages.": "Explore the beauty of South India with our specially curated tour packages.",
      "View Details": "View Details",

      // Gallery
      "Our Gallery": "Our Gallery",
      "Memories from Our Journeys": "Memories from Our Journeys",
      "Glimpses of beautiful destinations and happy moments with our travelers.": "Glimpses of beautiful destinations and happy moments with our travelers.",
      "Temple Tours": "Temple Tours",
      "Hill Stations": "Hill Stations",
      "Heritage Places": "Heritage Places",
      "Outstation Trips": "Outstation Trips",
      "Happy Customers": "Happy Customers",
      "Want to share your travel moments with us?": "Want to share your travel moments with us?",
      "Tag us on Instagram": "Tag us on Instagram",
      "Follow Us": "Follow Us",

      // Contact
      "Get In Touch": "Get In Touch",
      "Have questions about our packages or want to customize your trip? Our team is available 24/7 to assist you.": "Have questions about our packages or want to customize your trip? Our team is available 24/7 to assist you.",
      "Call Us": "Call Us",
      "For immediate bookings": "For immediate bookings",
      "WhatsApp": "WhatsApp",
      "Fastest way to reach us": "Fastest way to reach us",
      "Email Us": "Email Us",
      "For corporate queries": "For corporate queries",
      "Office Address": "Office Address",
      "Send us a Message": "Send us a Message",
      "Full Name": "Full Name",
      "Email Address (Optional)": "Email Address (Optional)",
      "Your Message": "Your Message",
      "Send Message": "Send Message",

      // Footer
      "Quick Links": "Quick Links",
      "Our Services": "Our Services",
      "Local Tour": "Local Tour",
      "Outstation Tour": "Outstation Tour",
      "Airport Transfer": "Airport Transfer",
      "Temple Tour": "Temple Tour",
      "Corporate Travel": "Corporate Travel",
      "Privacy Policy": "Privacy Policy",
      "Terms & Conditions": "Terms & Conditions"
    }
  },
  ta: {
    translation: {
      "Home": "முகப்பு",
      "About Us": "எங்களை பற்றி",
      "Vehicles": "வாகனங்கள்",
      "Packages": "சுற்றுலா தொகுப்புகள்",
      "Gallery": "தொகுப்பு",
      "Contact Us": "தொடர்பு கொள்ள",
      "Madurai Best Tours and Travels": "மதுரை டூர் டாக்ஸி",
      "Select Language": "மொழியை தேர்ந்தெடுக்கவும்",
      
      // Home
      "Safe & Comfortable Taxi Service in Madurai": "மதுரையில் பாதுகாப்பான மற்றும் வசதியான டாக்ஸி சேவை",
      "Book Your Ride": "உங்கள் பயணத்தை பதிவு செய்யவும்",
      "Pickup Location": "புறப்படும் இடம்",
      "Drop Location": "செல்லும் இடம்",
      "Your Name": "உங்கள் பெயர்",
      "Phone Number": "தொலைபேசி எண்",
      "Select Vehicle": "வாகனத்தை தேர்வு செய்யவும்",
      "BOOK NOW": "முன்பதிவு செய்",
      "24/7 Service": "24/7 சேவை",
      "Clean Cars": "சுத்தமான கார்கள்",
      "Safe Drivers": "பாதுகாப்பான ஓட்டுநர்கள்",
      "GPS Tracking": "ஜிபிஎஸ் வசதி",
      "Call Now": "அழைக்கவும்",
      "Chat on WhatsApp": "வாட்ஸ்அப்பில் தொடர்புகொள்ள",
      "Our Premium Vehicles": "எங்கள் பிரீமியம் வாகனங்கள்",
      "Starting from": "ஆரம்ப விலை",
      "Popular Tour Packages": "பிரபலமான சுற்றுலா தொகுப்புகள்",
      "Why Choose Us?": "எங்களை ஏன் தேர்ந்தெடுக்க வேண்டும்?",
      "Experienced Drivers": "அனுபவமிக்க ஓட்டுநர்கள்",
      "Clean & Safe Cars": "சுத்தமான மற்றும் பாதுகாப்பான கார்கள்",
      "Affordable Price": "குறைந்த கட்டணம்",
      "Fast Booking": "விரைவான முன்பதிவு",
      "Secure Travel": "பாதுகாப்பான பயணம்",
      "Customer Support": "வாடிக்கையாளர் சேவை",
      "What Our Customers Say": "எங்கள் வாடிக்கையாளர்கள் கூறுவது",
      "Happy Customers": "மகிழ்ச்சியான வாடிக்கையாளர்கள்",
      "Trips Completed": "நிறைவடைந்த பயணங்கள்",
      "Hours Support": "மணிநேர சேவை",

      // About
      "About": "எங்களை",
      "Us": "பற்றி",
      "Your trusted travel partner in South India since 2015.": "2015 முதல் தென்னிந்தியாவில் உங்கள் நம்பகமான பயண பங்குதாரர்.",
      "Our Story & Mission": "எங்கள் கதை மற்றும் நோக்கம்",
      "Started with a single cab in Madurai, we have grown into one of the most trusted and premium taxi service providers in Tamil Nadu. Our journey has been fueled by our passion for hospitality and customer safety.": "மதுரையில் ஒரு வாடகை காருடன் தொடங்கப்பட்ட நாங்கள், தமிழ்நாட்டில் மிகவும் நம்பகமான மற்றும் பிரீமியம் டாக்ஸி சேவை வழங்குநர்களில் ஒன்றாக வளர்ந்துள்ளோம்.",
      "Our mission is to provide world-class, comfortable, and affordable tourism experiences. We believe that the journey is just as important as the destination, which is why we maintain a fleet of modern, sanitized vehicles driven by highly professional local experts.": "உலகத்தரம் வாய்ந்த, வசதியான மற்றும் மலிவு சுற்றுலா அனுபவங்களை வழங்குவதே எங்கள் நோக்கம்.",
      "Years Experience": "ஆண்டுகள் அனுபவம்",
      "Safe Travel": "பாதுகாப்பான பயணம்",
      "Award Winning Service": "விருது பெற்ற சேவை",
      "Recognized for excellence in local tourism.": "உள்ளூர் சுற்றுலாவில் சிறந்ததாக அங்கீகரிக்கப்பட்டுள்ளது.",
      "Core Values": "முக்கிய மதிப்புகள்",
      "Safety First": "பாதுகாப்பிற்கு முதலிடம்",
      "GPS enabled cars and background-verified drivers.": "ஜிபிஎஸ் மற்றும் சரிபார்க்கப்பட்ட ஓட்டுநர்கள்.",
      "Customer Satisfaction": "வாடிக்கையாளர் திருப்தி",
      "We go above and beyond to make your trip memorable.": "உங்கள் பயணத்தை மறக்கமுடியாததாக மாற்ற நாங்கள் கடுமையாக உழைக்கிறோம்.",
      "Passion for Travel": "பயணத்தின் மீதான ஆர்வம்",
      "We love showing you the beauty of South India.": "தென்னிந்தியாவின் அழகை உங்களுக்குக் காட்டுவதில் நாங்கள் மகிழ்ச்சியடைகிறோம்.",

      // Vehicles
      "Our Fleet": "எங்கள் வாகனங்கள்",
      "Choose from our wide range of well-maintained vehicles for your journey.": "உங்கள் பயணத்திற்கு எங்களின் நன்கு பராமரிக்கப்படும் வாகனங்களில் இருந்து தேர்வு செய்யவும்.",
      "Book Now": "இப்போது முன்பதிவு செய்",

      // Packages
      "Tour Packages": "சுற்றுலா தொகுப்புகள்",
      "Explore the beauty of South India with our specially curated tour packages.": "தென்னிந்தியாவின் அழகை எங்கள் சுற்றுலா தொகுப்புகளுடன் ஆராயுங்கள்.",
      "View Details": "விவரங்களை பார்க்க",

      // Gallery
      "Our Gallery": "எங்கள் புகைப்பட தொகுப்பு",
      "Memories from Our Journeys": "எங்கள் பயணங்களின் நினைவுகள்",
      "Glimpses of beautiful destinations and happy moments with our travelers.": "எங்கள் பயணிகளுடன் அழகான இடங்கள் மற்றும் மகிழ்ச்சியான தருணங்களின் காட்சிகள்.",
      "Temple Tours": "கோவில் சுற்றுலா",
      "Hill Stations": "மலைப்பிரதேசம்",
      "Heritage Places": "பாரம்பரிய இடங்கள்",
      "Outstation Trips": "வெளியூர் சுற்றுலா",
      "Happy Customers": "மகிழ்ச்சியான வாடிக்கையாளர்கள்",
      "Want to share your travel moments with us?": "உங்கள் பயண தருணங்களை எங்களுடன் பகிர்ந்து கொள்ள விரும்புகிறீர்களா?",
      "Tag us on Instagram": "இன்ஸ்டாகிராமில் எங்களை டேக் செய்யவும்",
      "Follow Us": "எங்களை பின்தொடரவும்",

      // Contact
      "Get In Touch": "தொடர்பு கொள்ள",
      "Have questions about our packages or want to customize your trip? Our team is available 24/7 to assist you.": "எங்கள் தொகுப்புகளைப் பற்றி ஏதேனும் கேள்விகள் உள்ளதா? உங்களுக்கு உதவ எங்கள் குழு 24/7 கிடைக்கும்.",
      "Call Us": "எங்களை அழைக்கவும்",
      "For immediate bookings": "உடனடி முன்பதிவுகளுக்கு",
      "WhatsApp": "வாட்ஸ்அப்",
      "Fastest way to reach us": "எங்களை தொடர்பு கொள்ள விரைவான வழி",
      "Email Us": "மின்னஞ்சல் அனுப்புக",
      "For corporate queries": "கார்ப்பரேட் கேள்விகளுக்கு",
      "Office Address": "அலுவலக முகவரி",
      "Send us a Message": "எங்களுக்கு ஒரு செய்தி அனுப்பவும்",
      "Full Name": "முழு பெயர்",
      "Email Address (Optional)": "மின்னஞ்சல் முகவரி (விருப்பமானால்)",
      "Your Message": "உங்கள் செய்தி",
      "Send Message": "செய்தியை அனுப்பு",

      // Footer
      "Quick Links": "முக்கிய இணைப்புகள்",
      "Our Services": "எங்கள் சேவைகள்",
      "Local Tour": "உள்ளூர் சுற்றுலா",
      "Outstation Tour": "வெளியூர் சுற்றுலா",
      "Airport Transfer": "விமான நிலைய பரிமாற்றம்",
      "Temple Tour": "கோவில் சுற்றுலா",
      "Corporate Travel": "கார்ப்பரேட் பயணம்",
      "Privacy Policy": "தனியுரிமை கொள்கை",
      "Terms & Conditions": "விதிமுறைகள் மற்றும் நிபந்தனைகள்"
    }
  },
  hi: {
    translation: {
      "Home": "होम",
      "About Us": "हमारे बारे में",
      "Vehicles": "वाहन",
      "Packages": "टूर पैकेज",
      "Gallery": "गैलरी",
      "Contact Us": "संपर्क करें",
      "Madurai Best Tours and Travels": "मदुरै टूर टैक्सी",
      "Select Language": "भाषा चुनें",
      
      // Home
      "Safe & Comfortable Taxi Service in Madurai": "मदुरै में सुरक्षित और आरामदायक टैक्सी सेवा",
      "Book Your Ride": "अपनी राइड बुक करें",
      "Pickup Location": "पिकअप स्थान",
      "Drop Location": "छोड़ने का स्थान",
      "Your Name": "आपका नाम",
      "Phone Number": "फ़ोन नंबर",
      "Select Vehicle": "वाहन चुनें",
      "BOOK NOW": "अभी बुक करें",
      "24/7 Service": "24/7 सेवा",
      "Clean Cars": "साफ कारें",
      "Safe Drivers": "सुरक्षित ड्राइवर",
      "GPS Tracking": "जीपीएस ट्रैकिंग",
      "Call Now": "अभी कॉल करें",
      "Chat on WhatsApp": "व्हाट्सएप पर चैट करें",
      "Our Premium Vehicles": "हमारे प्रीमियम वाहन",
      "Starting from": "शुरुआती कीमत",
      "Popular Tour Packages": "लोकप्रिय टूर पैकेज",
      "Why Choose Us?": "हमें क्यों चुनें?",
      "Experienced Drivers": "अनुभवी ड्राइवर",
      "Clean & Safe Cars": "साफ और सुरक्षित कारें",
      "Affordable Price": "किफायती कीमत",
      "Fast Booking": "तेज बुकिंग",
      "Secure Travel": "सुरक्षित यात्रा",
      "Customer Support": "ग्राहक सहायता",
      "What Our Customers Say": "हमारे ग्राहक क्या कहते हैं",
      "Happy Customers": "संतुष्ट ग्राहक",
      "Trips Completed": "पूरी की गई यात्राएं",
      "Hours Support": "घंटे का समर्थन",

      // About
      "About": "हमारे",
      "Us": "बारे में",
      "Your trusted travel partner in South India since 2015.": "2015 से दक्षिण भारत में आपका विश्वसनीय यात्रा भागीदार।",
      "Our Story & Mission": "हमारी कहानी और मिशन",
      "Started with a single cab in Madurai, we have grown into one of the most trusted and premium taxi service providers in Tamil Nadu. Our journey has been fueled by our passion for hospitality and customer safety.": "मदुरै में एक ही कैब के साथ शुरुआत करते हुए, हम तमिलनाडु में सबसे भरोसेमंद और प्रीमियम टैक्सी सेवा प्रदाताओं में से एक बन गए हैं।",
      "Our mission is to provide world-class, comfortable, and affordable tourism experiences. We believe that the journey is just as important as the destination, which is why we maintain a fleet of modern, sanitized vehicles driven by highly professional local experts.": "हमारा मिशन विश्व स्तरीय, आरामदायक और किफायती पर्यटन अनुभव प्रदान करना है।",
      "Years Experience": "वर्षों का अनुभव",
      "Safe Travel": "सुरक्षित यात्रा",
      "Award Winning Service": "पुरस्कार विजेता सेवा",
      "Recognized for excellence in local tourism.": "स्थानीय पर्यटन में उत्कृष्टता के लिए मान्यता प्राप्त।",
      "Core Values": "मूल मूल्य",
      "Safety First": "सुरक्षा पहले",
      "GPS enabled cars and background-verified drivers.": "जीपीएस सक्षम कारें और सत्यापित ड्राइवर।",
      "Customer Satisfaction": "ग्राहक संतुष्टि",
      "We go above and beyond to make your trip memorable.": "हम आपकी यात्रा को यादगार बनाने के लिए कड़ी मेहनत करते हैं।",
      "Passion for Travel": "यात्रा का जुनून",
      "We love showing you the beauty of South India.": "हमें आपको दक्षिण भारत की सुंदरता दिखाना पसंद है।",

      // Vehicles
      "Our Fleet": "हमारे वाहन",
      "Choose from our wide range of well-maintained vehicles for your journey.": "अपनी यात्रा के लिए हमारे अच्छी तरह से बनाए गए वाहनों की विस्तृत श्रृंखला में से चुनें।",
      "Book Now": "अभी बुक करें",

      // Packages
      "Tour Packages": "टूर पैकेज",
      "Explore the beauty of South India with our specially curated tour packages.": "हमारे विशेष रूप से क्यूरेट किए गए टूर पैकेज के साथ दक्षिण भारत की सुंदरता का अन्वेषण करें।",
      "View Details": "विवरण देखें",

      // Gallery
      "Our Gallery": "हमारी गैलरी",
      "Memories from Our Journeys": "हमारी यात्राओं की यादें",
      "Glimpses of beautiful destinations and happy moments with our travelers.": "हमारे यात्रियों के साथ सुंदर गंतव्यों और खुशी के पलों की झलकियाँ।",
      "Temple Tours": "मंदिर दर्शन",
      "Hill Stations": "हिल स्टेशन",
      "Heritage Places": "ऐतिहासिक स्थल",
      "Outstation Trips": "बाहरी यात्राएं",
      "Happy Customers": "खुशहाल ग्राहक",
      "Want to share your travel moments with us?": "क्या आप अपनी यात्रा के पलों को हमारे साथ साझा करना चाहते हैं?",
      "Tag us on Instagram": "हमें इंस्टाग्राम पर टैग करें",
      "Follow Us": "फॉलो करें",

      // Contact
      "Get In Touch": "संपर्क करें",
      "Have questions about our packages or want to customize your trip? Our team is available 24/7 to assist you.": "क्या आपके पास हमारे पैकेज के बारे में कोई प्रश्न हैं या अपनी यात्रा को अनुकूलित करना चाहते हैं? हमारी टीम 24/7 सहायता के लिए उपलब्ध है।",
      "Call Us": "हमें कॉल करें",
      "For immediate bookings": "तत्काल बुकिंग के लिए",
      "WhatsApp": "व्हाट्सएप",
      "Fastest way to reach us": "हम तक पहुँचने का सबसे तेज़ तरीका",
      "Email Us": "हमें ईमेल करें",
      "For corporate queries": "कॉर्पोरेट प्रश्नों के लिए",
      "Office Address": "कार्यालय का पता",
      "Send us a Message": "हमें एक संदेश भेजें",
      "Full Name": "पूरा नाम",
      "Email Address (Optional)": "ईमेल पता (वैकल्पिक)",
      "Your Message": "आपका संदेश",
      "Send Message": "संदेश भेजें",

      // Footer
      "Quick Links": "त्वरित लिंक",
      "Our Services": "हमारी सेवाएँ",
      "Local Tour": "स्थानीय दौरा",
      "Outstation Tour": "आउटस्टेशन टूर",
      "Airport Transfer": "एयरपोर्ट ट्रांसफर",
      "Temple Tour": "मंदिर का दौरा",
      "Corporate Travel": "कॉर्पोरेट यात्रा",
      "Privacy Policy": "गोपनीयता नीति",
      "Terms & Conditions": "नियम और शर्तें"
    }
  }
};

const instance = i18n;
if (typeof window !== 'undefined') {
  instance.use(LanguageDetector);
}

instance
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
