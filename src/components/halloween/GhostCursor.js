import React, { useEffect, useState } from 'react';
import styles from './GhostCursor.module.css';

function GhostCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        currentX = targetX;
        currentY = targetY;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      // Smooth follow effect with easing
      const ease = 0.15;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      setPosition({
        x: currentX,
        y: currentY,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={styles.ghostCursor}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
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
