import React from 'react';

// VehicleCard component
export const VehicleCard = ({ image, name, description }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

// PackageCard component
export const PackageCard = ({ image, title, price, details }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
    <img src={image} alt={title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600 my-2">{details}</p>
      <span className="text-primary-600 font-semibold">{price}</span>
    </div>
  </div>
);

// FeatureCard component
export const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-4 bg-white/70 backdrop-blur-md rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl">
    <div className="text-4xl mb-3">{icon}</div>
    <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// ReviewCard component
export const ReviewCard = ({ avatar, name, rating, comment }) => (
  <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-md flex flex-col items-center text-center">
    <img src={avatar} alt={name} className="w-16 h-16 rounded-full mb-2" />
    <h5 className="font-medium text-gray-800 mb-1">{name}</h5>
    <div className="flex mb-2">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.455a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.371-2.455a1 1 0 00-1.175 0l-3.371 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.363-1.118L2.34 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
    <p className="text-gray-600 text-sm">{comment}</p>
  </div>
);
