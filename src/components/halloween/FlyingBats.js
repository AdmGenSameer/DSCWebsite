import React, { useEffect, useState } from 'react';
import styles from './FlyingBats.module.css';

function FlyingBats({ count = 5 }) {
  const [bats, setBats] = useState([]);

  useEffect(() => {
    // Generate random bat configurations
    const generatedBats = Array.from({ length: count }, (_, index) => ({
      id: `bat-${index}-${Math.random()}`,
      startX: Math.random() * 100,
      startY: Math.random() * 80 + 10,
      duration: Math.random() * 15 + 10, // 10-25 seconds
      delay: Math.random() * 5,
      size: Math.random() * 0.5 + 0.6, // 0.6-1.1x size
      path: Math.random() > 0.5 ? 'path1' : 'path2',
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
