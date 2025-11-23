import React from 'react';
import styles from './HalloweenCandle.module.css';

function HalloweenCandle({
  position = { top: '50%', left: '10%' },
  size = 'medium',
}) {
  return (
    <div
      className={`${styles.candleContainer} ${styles[size]}`}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 1,
      }}
    >
      {/* Candle glow */}
      <div className={styles.candleGlow} />

      {/* Flame */}
      <div className={styles.flame}>
        <div className={styles.flameInner} />
        <div className={styles.flameCore} />
      </div>

      {/* Candle body */}
      <div className={styles.candleBody}>
        <div className={styles.candleTop} />
        <div className={styles.candleWax} />
        <div className={styles.candleDrip} />
      </div>
    </div>
  );
}

export default HalloweenCandle;
