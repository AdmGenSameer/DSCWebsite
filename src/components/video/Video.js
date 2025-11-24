import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Video.module.css';

const VIDEO_VARIANTS = [
  {
    id: 'design',
    label: 'Design.',
    src: '/video/design.mp4',
  },
  {
    id: 'develop',
    label: 'Develop.',
    src: '/video/develop.mp4',
  },
  {
    id: 'code',
    label: 'Code.',
    src: '/video/code.mp4',
  },
];

const VIDEO_VARIANTS_MAP = VIDEO_VARIANTS.reduce((acc, variant) => {
  acc[variant.id] = variant;
  return acc;
}, {});

const DESKTOP_QUERY = '(min-width: 600px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const FINE_POINTER_QUERY = '(pointer: fine)';

function useMediaQuery(query, defaultState) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return defaultState;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

const VideoHeading = memo(function VideoHeading({
  id,
  label,
  onActivate,
  onDeactivate,
}) {
  return (
    <h1
      onMouseEnter={() => onActivate(id)}
      onMouseLeave={onDeactivate}
      onTouchStart={() => onActivate(id)}
      onTouchEnd={onDeactivate}
      onFocus={() => onActivate(id)}
      onBlur={onDeactivate}
    >
      {label}
    </h1>
  );
});

function Video() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY, true);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY, false);
  const hasFinePointer = useMediaQuery(FINE_POINTER_QUERY, true);

  const canUseInteractiveVideo =
    isDesktop && hasFinePointer && !prefersReducedMotion;

  const [activeVariant, setActiveVariant] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const shouldShowVideo =
    Boolean(activeVariant) && isIntersecting && canUseInteractiveVideo;

  const handleActivate = useCallback((variantId) => {
    setActiveVariant((current) => (current === variantId ? current : variantId));
  }, []);

  const handleDeactivate = useCallback(() => {
    setActiveVariant(null);
  }, []);

  useEffect(() => {
    if (!canUseInteractiveVideo) {
      setActiveVariant(null);
    }
  }, [canUseInteractiveVideo]);

  useEffect(() => {
    if (!containerRef.current || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setActiveVariant(null);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return undefined;
    }

    if (!shouldShowVideo) {
      videoElement.pause();
      if (!activeVariant) {
        videoElement.removeAttribute('src');
        videoElement.load();
      }
      return undefined;
    }

    const nextVariant = VIDEO_VARIANTS_MAP[activeVariant];
    if (!nextVariant) {
      return undefined;
    }

    if (videoElement.dataset.srcKey !== nextVariant.id) {
      videoElement.src = nextVariant.src;
      videoElement.dataset.srcKey = nextVariant.id;
      videoElement.load();
    }

    let cancelled = false;
    const playVideo = () => {
      if (cancelled) return;
      const playPromise = videoElement.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Ignore autoplay errors; user interaction will retry.
        });
      }
    };

    if (videoElement.readyState >= 2) {
      playVideo();
    } else {
      videoElement.addEventListener('loadeddata', playVideo, { once: true });
    }

    return () => {
      cancelled = true;
      videoElement.pause();
    };
  }, [activeVariant, shouldShowVideo]);

  return (
    <section className={styles.video}>
      {canUseInteractiveVideo ? (
        <>
          <div
            ref={containerRef}
            className={`${styles.designVideoContainer} ${
              shouldShowVideo ? styles.visible : ''
            }`}
          >
            <video
              ref={videoRef}
              muted
              loop
              controls={false}
              playsInline
              preload="none"
              data-visible={shouldShowVideo}
              className={styles.videoElement}
            >
              <track kind="captions" />
            </video>
          </div>

          <div className={styles.content}>
            {VIDEO_VARIANTS.map((variant) => (
              <VideoHeading
                key={variant.id}
                id={variant.id}
                label={variant.label}
                onActivate={handleActivate}
                onDeactivate={handleDeactivate}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.mobileVideoContainer}>
          <video
            src="/WhatsApp Video 2025-11-23 at 10.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="metadata"
            className={styles.mobileVideo}
          >
            <track kind="captions" />
          </video>
        </div>
      )}
    </section>
  );
}

export default Video;
