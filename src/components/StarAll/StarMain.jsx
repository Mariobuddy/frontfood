import React, { useState, useEffect } from "react";
import StarChild from "./StarChild";

const StarMain = ({ getStar, sendStar }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    getStar(selectedRating);
    setRating(selectedRating);
  };

  const handleStarHover = (hoveredStar) => {
    setHoveredRating(hoveredStar);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  useEffect(() => {
    if (sendStar === 0) {
      setRating(0);
    }
  }, [sendStar]);

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((star) => (
        <StarChild
          key={star}
          selected={star <= (hoveredRating || rating)}
          onSelect={() => handleStarClick(star)}
          onMouseOver={() => handleStarHover(star)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default StarMain;
