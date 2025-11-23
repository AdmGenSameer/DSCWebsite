import React, { useState } from 'react';
import styles from './InteractivePumpkin.module.css';

function InteractivePumpkin({
  position = { top: '60%', left: '85%' },
  size = 'medium',
}) {
  const [isExploding, setIsExploding] = useState(false);
  const [burstBats, setBurstBats] = useState([]);

  const handleClick = () => {
    if (isExploding) return; // Prevent multiple clicks

    setIsExploding(true);

    // Generate burst bats
    const timestamp = Date.now();
    const bats = Array.from({ length: 15 }, (_, i) => ({
      id: `burst-${timestamp}-${i}`,
      angle: (Math.PI * 2 * i) / 15,
      distance: Math.random() * 300 + 200,
      duration: Math.random() * 2 + 2,
      rotation: Math.random() * 360,
    }));

    setBurstBats(bats);

    // Reset after 4 seconds
    setTimeout(() => {
      setIsExploding(false);
      setBurstBats([]);
    }, 4000);
  };

  return (
    <>
      <div
        className={`${styles.pumpkinContainer} ${styles[size]} ${
          isExploding ? styles.exploding : ''
        }`}
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          zIndex: 2,
        }}
        onClick={handleClick}
      >
        {/* Pumpkin glow */}
        <div className={styles.pumpkinGlow} />

        {/* Pumpkin body */}
        <div className={styles.pumpkin}>
          <div className={styles.pumpkinSegment} />
          <div className={styles.pumpkinSegment} />
          <div className={styles.pumpkinSegment} />
          <div className={styles.pumpkinSegment} />
          <div className={styles.pumpkinSegment} />

          {/* Stem */}
          <div className={styles.stem} />

          {/* Face */}
          <div className={styles.face}>
            <div className={styles.eye} data-eye="left" />
            <div className={styles.eye} data-eye="right" />
            <div className={styles.nose} />
            <div className={styles.mouth}>
              <div className={styles.tooth} />
              <div className={styles.tooth} />
              <div className={styles.tooth} />
            </div>
          </div>
        </div>
      </div>

      {/* Burst bats */}
      {isExploding && (
        <div className={styles.burstContainer}>
          {burstBats.map((bat) => (
            <div
              key={bat.id}
              className={styles.burstBat}
              style={{
                '--angle': `${bat.angle}rad`,
                '--distance': `${bat.distance}px`,
                '--duration': `${bat.duration}s`,
                '--rotation': `${bat.rotation}deg`,
                left: position.left,
                top: position.top,
              }}
            >
              <div className={styles.burstBatBody}>
                <div className={styles.burstBatWing} />
                <div className={styles.burstBatWing} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default InteractivePumpkin;
