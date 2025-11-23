import React from 'react';
import styles from './HalloweenBackground.module.css';
import FlyingBats from './FlyingBats';
import InteractivePumpkin from './InteractivePumpkin';
import GhostCursor from './GhostCursor';
import SpiderWeb from './SpiderWeb';

function HalloweenBackground({ children }) {
  // Strategic pumpkin positions - distributed throughout the page
  const pumpkinPositions = [
    { id: 'pumpkin-1', top: '15vh', left: '8%', size: 'medium', mobile: true },
    { id: 'pumpkin-2', top: '50vh', left: '90%', size: 'large', mobile: true },
    {
      id: 'pumpkin-3',
      top: '100vh',
      left: '10%',
      size: 'small',
      mobile: false,
    },
    {
      id: 'pumpkin-4',
      top: '140vh',
      left: '88%',
      size: 'medium',
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

      {/* Spider webs in corners */}
      <SpiderWeb position="top-left" />
      <SpiderWeb position="top-right" />
      <SpiderWeb position="bottom-left" />
      <SpiderWeb position="bottom-right" />

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

      {/* Ghost cursor */}
      <GhostCursor />
    </div>
  );
}

export default HalloweenBackground;
