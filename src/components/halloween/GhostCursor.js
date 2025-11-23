import React, { useEffect, useState } from 'react';
import styles from './GhostCursor.module.css';

function GhostCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Hide the default cursor
    document.body.style.cursor = 'none';

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

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
