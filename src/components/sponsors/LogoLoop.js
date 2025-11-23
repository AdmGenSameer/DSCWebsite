import React, { useState } from 'react';
import './LogoLoop.css';

function SponsorsCarousel({ sponsors }) {
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <div className="sponsors-carousel">
      <div className="carousel-container">
        <div
          className={`carousel-track ${isPaused ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedSponsors.map((sponsor, index) => (
            <div
              key={`sponsor-${sponsor.id}-${
                index < sponsors.length ? 'first' : 'second'
              }`}
              className="sponsor-card"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="sponsor-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SponsorsCarousel;
