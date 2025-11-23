import React, { useState } from 'react';
import './LogoLoop.css';

function SponsorsCarousel({ sponsors }) {
  const [isPaused, setIsPaused] = useState(false);

  // Create duplicated sponsors with unique identifiers
  const duplicatedSponsors = [
    ...sponsors.map((sponsor, idx) => ({ ...sponsor, uniqueId: `original-${idx}` })),
    ...sponsors.map((sponsor, idx) => ({ ...sponsor, uniqueId: `duplicate-${idx}` }))
  ];

  return (
    <div className="sponsors-carousel">
      <div className="carousel-container">
        <div
          className={`carousel-track ${isPaused ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedSponsors.map((sponsor) => (
            <div key={sponsor.uniqueId} className="sponsor-card">
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