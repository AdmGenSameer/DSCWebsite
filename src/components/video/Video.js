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
const MOBILE_POSTER_IMAGE = '/WhatsApp Image 2025-11-24 at 11.03.44 PM.jpeg';

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
  const [mobileVideoLoading, setMobileVideoLoading] = useState(true);
  const [isMobileVideoReady, setIsMobileVideoReady] = useState(false);
  const [showMobilePoster, setShowMobilePoster] = useState(true);
  const [posterImageLoaded, setPosterImageLoaded] = useState(false);
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const containerRef = useRef(null);
  const posterHideTimeoutRef = useRef(null);

  const shouldShowVideo =
    Boolean(activeVariant) && isIntersecting && canUseInteractiveVideo;

  const handleActivate = useCallback((variantId) => {
    setActiveVariant((current) =>
      current === variantId ? current : variantId
    );
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

  // Handle mobile video loading
  useEffect(() => {
    if (canUseInteractiveVideo || !mobileVideoRef.current) {
      return undefined;
    }

    const video = mobileVideoRef.current;
    const setPosterVisible = (visible) => {
      setShowMobilePoster(visible);
    };

    const handleLoadStart = () => {
      setMobileVideoLoading(true);
      setIsMobileVideoReady(false);
      setPosterVisible(true);
    };

    const handleWaiting = () => {
      setMobileVideoLoading(true);
    };

    const handleCanPlay = () => {
      // Don't play yet - wait for full buffer
      setMobileVideoLoading(true);
    };

    const handleCanPlayThrough = () => {
      // Video is fully buffered and ready to play smoothly
      setIsMobileVideoReady(true);
      setMobileVideoLoading(false);

      // Start playing only after full download
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      }
    };

    const handlePlaying = () => {
      // Video has started playing - now hide poster
      setMobileVideoLoading(false);
      if (posterHideTimeoutRef.current) {
        clearTimeout(posterHideTimeoutRef.current);
      }
      posterHideTimeoutRef.current = window.setTimeout(() => {
        setPosterVisible(false);
      }, 300);
    };

    const handleError = () => {
      setMobileVideoLoading(false);
      setIsMobileVideoReady(false);
      setPosterVisible(true);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);

    // Start loading video only after poster image is ready
    if (posterImageLoaded) {
      video.load();
    }

    return () => {
      if (posterHideTimeoutRef.current) {
        clearTimeout(posterHideTimeoutRef.current);
      }
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
    };
  }, [canUseInteractiveVideo, posterImageLoaded]);

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
          <div
            className={`${styles.mobilePoster} ${
              showMobilePoster ? '' : styles.mobilePosterHidden
            }`}
            aria-hidden={showMobilePoster ? 'false' : 'true'}
            data-visible={showMobilePoster}
          >
            <img
              src={MOBILE_POSTER_IMAGE}
              alt="Halloween Nights placeholder"
              loading="eager"
              decoding="async"
              onLoad={() => setPosterImageLoaded(true)}
              className={styles.posterImage}
            />
            <div className={styles.posterOverlay}>
              <p className={styles.posterEyebrow}>Data Science Club presents</p>
              <p className={styles.posterTitle}>Halloween Nights</p>
            </div>
          </div>
          <video
            ref={mobileVideoRef}
            src="/WhatsApp Video 2025-11-23 at 10.mp4"
            autoPlay={false}
            muted
            loop
            playsInline
            controls={false}
            preload="metadata"
            poster=""
            disablePictureInPicture
            disableRemotePlayback
            className={styles.mobileVideo}
            data-ready={isMobileVideoReady}
            aria-busy={!isMobileVideoReady}
            style={{
              willChange: 'auto',
              opacity: showMobilePoster ? 0 : 1,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              transform: showMobilePoster ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <track kind="captions" />
          </video>
        </div>
      )}
    </section>
  );
}

export default Video;
