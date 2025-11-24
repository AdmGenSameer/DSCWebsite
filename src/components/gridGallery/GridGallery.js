import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import GalleryImages from '../../lib/data/GalleryData';
import BottomGlitter from '../StyledText/BottomGlitter';
import styles from './grid-gallery.module.css';

// Simple SVG icons
function ChevronLeft() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
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
  );
}

function GridGallery() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % GalleryImages.length);
    } else {
      setCurrentImageIndex(
        (prev) => (prev - 1 + GalleryImages.length) % GalleryImages.length
      );
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 370;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseDown = (e) => {
    if (window.innerWidth <= 640) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setStartScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || window.innerWidth <= 640) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = startScrollLeft - walk;
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return undefined;
    }

    checkScrollButtons();
    container.addEventListener('scroll', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtons);

    return () => {
      container.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImageIndex]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [lightboxOpen]);

  return (
    <>
      <section className={styles.section}>
        {/* Halloween decorative elements */}
        <div className={styles.halloweenDecor}>
          <span className={styles.pumpkin}>🎃</span>
          <span className={styles.bat}>🦇</span>
          <span className={styles.spider}>🕷️</span>
        </div>
        <div className={styles.header}>
          <BottomGlitter text="Glimpses" />
        </div>

        <div className={styles.carouselWrapper}>
          <button
            type="button"
            onClick={() => scroll('left')}
            className={`${styles.navButton} ${styles.navButtonLeft} ${
              !canScrollLeft ? styles.navButtonHidden : ''
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            onClick={() => scroll('right')}
            className={`${styles.navButton} ${styles.navButtonRight} ${
              !canScrollRight ? styles.navButtonHidden : ''
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight />
          </button>

          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={styles.horizontalWrapper}
          >
            <div className={styles.horizontalContainer}>
              {GalleryImages.map((item, index) => (
                <GridImage
                  key={item.id}
                  src={item.src}
                  mobileSrc={item.mobileSrc}
                  title={item.title}
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.mobileGrid}>
          {GalleryImages.map((item, index) => (
            <div
              key={item.id}
              className={styles.mobileCard}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openLightbox(index);
                }
              }}
            >
              <picture>
                <source media="(max-width: 600px)" srcSet={item.mobileSrc} />
                <img src={item.src} alt={item.title} />
              </picture>
              <div className={styles.mobileOverlay}>
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {lightboxOpen && (
        <Lightbox
          images={GalleryImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
}

export default GridGallery;

function GridImage({ src, mobileSrc, title, index, onClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      {!isLoaded && <div className={styles.skeleton} />}

      <picture>
        <source media="(max-width: 600px)" srcSet={mobileSrc} />
        <img
          src={src}
          alt={title}
          onLoad={() => setIsLoaded(true)}
          className={styles.cardImage}
        />
      </picture>

      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          <h3>{title}</h3>
          <div className={styles.accent} />
        </div>
      </div>

      <div className={styles.cornerAccent} />
    </div>
  );
}

function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const currentImage = images[currentIndex];
  const [portalNode] = useState(() => {
    if (typeof document === 'undefined') {
      return null;
    }
    const node = document.createElement('div');
    node.setAttribute('data-lightbox-root', '');
    return node;
  });

  useEffect(() => {
    if (!portalNode || typeof document === 'undefined') {
      return undefined;
    }

    document.body.appendChild(portalNode);
    return () => {
      document.body.removeChild(portalNode);
    };
  }, [portalNode]);

  if (!currentImage || !portalNode) {
    return null;
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const content = (
    <div className={styles.lightboxOverlay} onClick={handleBackdropClick}>
      <button
        type="button"
        className={styles.lightboxClose}
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <CloseIcon />
      </button>

      <button
        type="button"
        className={`${styles.lightboxNav} ${styles.lightboxNavLeft}`}
        onClick={() => onNavigate('prev')}
        aria-label="Previous image"
      >
        <ChevronLeft />
      </button>

      <button
        type="button"
        className={`${styles.lightboxNav} ${styles.lightboxNavRight}`}
        onClick={() => onNavigate('next')}
        aria-label="Next image"
      >
        <ChevronRight />
      </button>

      <div className={styles.lightboxContent}>
        <img
          src={currentImage.src}
          alt={currentImage.title}
          className={styles.lightboxImage}
        />
        <div className={styles.lightboxInfo}>
          <h2>{currentImage.title}</h2>
          <p>
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(content, portalNode);
}
