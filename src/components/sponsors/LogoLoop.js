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
          {duplicatedSponsors.map((sponsor) => (
            <div key={sponsor.id || sponsor.name} className="sponsor-card">
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
