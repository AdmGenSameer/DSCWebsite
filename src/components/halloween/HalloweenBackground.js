import React from 'react';
import styles from './HalloweenBackground.module.css';
import FlyingBats from './FlyingBats';
import InteractivePumpkin from './InteractivePumpkin';
import SpiderWeb from './SpiderWeb';

function HalloweenBackground({ children }) {
  // Strategic pumpkin positions - distributed throughout the scrollable page
  const pumpkinPositions = [
    { id: 'pumpkin-1', top: '25vh', left: '8%', size: 'medium', mobile: true },
    { id: 'pumpkin-2', top: '45vh', left: '90%', size: 'large', mobile: true },
    {
      id: 'pumpkin-3',
      top: '60vh',
      left: '10%',
      size: 'small',
      mobile: false,
    },
    {
      id: 'pumpkin-4',
      top: '120vh',
      left: '88%',
      size: 'medium',
      mobile: false,
    },
    {
      id: 'pumpkin-5',
      top: '35vh',
      left: '50%',
      size: 'small',
      mobile: false,
    },
    {
      id: 'pumpkin-6',
      top: '150vh',
      left: '12%',
      size: 'large',
      mobile: false,
    },
    {
      id: 'pumpkin-7',
      top: '200vh',
      left: '85%',
      size: 'small',
      mobile: false,
    },
    {
      id: 'pumpkin-8',
      top: '250vh',
      left: '15%',
      size: 'medium',
      mobile: false,
    },
    {
      id: 'pumpkin-9',
      top: '300vh',
      left: '90%',
      size: 'small',
      mobile: false,
    },
  ];

  return (
    <div className={styles.halloweenWrapper}>
      {/* Atmospheric background layers */}
      <div className={styles.atmosphericLayer}>
        <div className={styles.fogLayer} />
        <div className={styles.darkGradient} />
        <div className={styles.vignette} />
      </div>

      {/* Spider webs in corners - only top corners */}
      <SpiderWeb position="top-left" />
      <SpiderWeb position="top-right" />

      {/* Flying bats (ambient) */}
      <FlyingBats count={8} />

      {/* Interactive pumpkins */}
      <div className={styles.pumpkinsLayer}>
        {pumpkinPositions.map((pos) => (
          <div
            key={pos.id}
            className={
              pos.mobile ? styles.pumpkinMobile : styles.pumpkinDesktop
            }
          >
            <InteractivePumpkin
              position={{ top: pos.top, left: pos.left }}
              size={pos.size}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
}

export default HalloweenBackground;
