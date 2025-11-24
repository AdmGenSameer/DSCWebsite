import React, { useEffect, useState } from 'react';
import styles from './FlyingBats.module.css';

function FlyingBats({ count = 5 }) {
  const [bats, setBats] = useState([]);

  useEffect(() => {
    // Generate random bat configurations with varied paths
    // Distribute bats across limited page height to not go below footer (0-280vh)
    const paths = ['path1', 'path2', 'path3', 'path4'];
    const generatedBats = Array.from({ length: count }, (_, index) => ({
      id: `bat-${index}-${Math.random()}`,
      startX: Math.random() * 100,
      startY: Math.random() * 270 + 10, // Distribute across 280vh max
      duration: Math.random() * 10 + 8, // 8-18 seconds for faster movement
      delay: Math.random() * 6,
      size: Math.random() * 0.4 + 0.5, // 0.5-0.9x size
      path: paths[Math.floor(Math.random() * paths.length)],
    }));
    setBats(generatedBats);
  }, [count]);

  return (
    <div className={styles.batsContainer}>
      {bats.map((bat) => (
        <div
          key={bat.id}
          className={`${styles.bat} ${styles[bat.path]}`}
          style={{
            '--start-x': `${bat.startX}vw`,
            '--start-y': `${bat.startY}vh`,
            '--duration': `${bat.duration}s`,
            '--delay': `${bat.delay}s`,
            '--size': bat.size,
          }}
        >
          <div className={styles.batBody}>
            <div className={styles.batWing} data-wing="left" />
            <div className={styles.batHead} />
            <div className={styles.batWing} data-wing="right" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FlyingBats;
