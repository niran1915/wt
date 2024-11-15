// TravelGuideDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const TravelGuideDetails = () => {
  const { guideName } = useParams();

  return (
    <div className="travel-guide-details">
      <h1>{guideName} Details</h1>
      <p>Here you can add detailed information about {guideName}.</p>
      {/* Add more details as necessary */}
    </div>
  );
};

export default TravelGuideDetails;
