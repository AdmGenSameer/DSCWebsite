import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Styles from './event.module.css';

function EventCard({ title, description, link, bgImage = '' }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className={Styles.card}
      >
        <div
          className={Styles.posterClickable}
          onClick={openLightbox}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openLightbox(e);
            }
          }}
          aria-label={`View full poster for ${title}`}
        >
          <div className={Styles.posterOverlay}>
            <span className={Styles.posterClickHint}>Click to view full poster</span>
          </div>
        </div>
        <div className={Styles.cardBody}>
          <h2 className={Styles.cardTitle}>{title}</h2>
          <p>{description}</p>
          {/* <a
            href={link}
            className={Styles.button}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Know More
          </a> */}
        </div>
      </div>

      {isLightboxOpen &&
        (document.getElementById('overlay')
          ? createPortal(
            <EventLightbox
              title={title}
              description={description}
              bgImage={bgImage}
              link={link}
              onClose={closeLightbox}
              onBackdropClick={handleBackdropClick}
            />,
            document.getElementById('overlay')
          )
          : null)}
    </>
  );
}

function EventLightbox({ title, description, bgImage, link, onClose, onBackdropClick }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={Styles.lightboxOverlay} onClick={onBackdropClick}>
      <button
        type="button"
        className={Styles.lightboxClose}
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className={Styles.lightboxContent}>
        <div className={Styles.lightboxImageContainer}>
          <img src={bgImage} alt={title} className={Styles.lightboxImage} />
        </div>
        <div className={Styles.lightboxDetails}>
          <h2 className={Styles.lightboxTitle}>{title}</h2>
          <p className={Styles.lightboxDescription}>{description}</p>
          {link && link !== '#' && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={Styles.lightboxLink}
            >
              <button type="button" className={Styles.lightboxButton}>
                Know More
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
