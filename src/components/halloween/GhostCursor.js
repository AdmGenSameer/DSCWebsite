import React, { useEffect, useRef } from 'react';
import styles from './GhostCursor.module.css';

function GhostCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursorElement = cursorRef.current;
    if (!cursorElement || typeof window === 'undefined') {
      return undefined;
    }

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer =
      window.matchMedia && window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !hasFinePointer) {
      cursorElement.style.display = 'none';
      return undefined;
    }

    document.body.style.cursor = 'none';

    let animationFrame = null;
    let latestPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const updateCursor = () => {
      animationFrame = null;
      cursorElement.style.transform = `translate3d(${latestPosition.x}px, ${latestPosition.y}px, 0) translate(-50%, -50%)`;
    };

    const handleMouseMove = (event) => {
      latestPosition = {
        x: event.clientX,
        y: event.clientY,
      };

      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(updateCursor);
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    updateCursor();

    return () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={styles.ghostCursor}
    >
      {/* Ghost body */}
      <div className={styles.ghostBody}>
        {/* Eyes */}
        <div className={styles.ghostEyes}>
          <div className={styles.eye} />
          <div className={styles.eye} />
        </div>

        {/* Mouth */}
        <div className={styles.mouth} />

        {/* Wavy bottom */}
        <div className={styles.ghostWaves}>
          <div className={styles.wave} />
          <div className={styles.wave} />
          <div className={styles.wave} />
          <div className={styles.wave} />
        </div>
      </div>

      {/* Ghost trail effect */}
      <div className={styles.ghostTrail} />
    </div>
  );
}

export default GhostCursor;
