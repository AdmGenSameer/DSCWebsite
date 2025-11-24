import React from 'react';
import styles from './HalloweenBackground.module.css';
import FlyingBats from './FlyingBats';
import InteractivePumpkin from './InteractivePumpkin';
import SpiderWeb from './SpiderWeb';

function HalloweenBackground({ children }) {
  // Strategic pumpkin positions - distributed throughout the page
  // Limited to not extend below footer (max 300vh)
  const pumpkinPositions = [
    { id: 'pumpkin-1', top: '30vh', left: '8%', size: 'small', mobile: true },
    { id: 'pumpkin-2', top: '80vh', left: '90%', size: 'medium', mobile: true },
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
    {
      id: 'pumpkin-5',
      top: '180vh',
      left: '5%',
      size: 'small',
      mobile: false,
    },
    {
      id: 'pumpkin-6',
      top: '220vh',
      left: '85%',
      size: 'medium',
      mobile: false,
    },
    {
      id: 'pumpkin-7',
      top: '250vh',
      left: '12%',
      size: 'small',
      mobile: false,
    },
    {
      id: 'pumpkin-8',
      top: '280vh',
      left: '90%',
      size: 'small',
      mobile: false,
    },
  ];

  // Random spider web positions - better distributed across the page
  // Limited to not extend below footer (max 300vh)
  const spiderWebPositions = [
    { id: 'web-1', top: '25vh', left: '5%' },
    { id: 'web-2', top: '60vh', right: '7%' },
    { id: 'web-3', top: '100vh', left: '15%' },
    { id: 'web-4', top: '140vh', right: '12%' },
    { id: 'web-5', top: '180vh', left: '8%' },
    { id: 'web-6', top: '220vh', right: '10%' },
    { id: 'web-7', top: '260vh', left: '18%' },
    { id: 'web-8', top: '290vh', right: '15%' },
  ];

  return (
    <div className={styles.halloweenWrapper}>
      {/* Atmospheric background layers */}
      <div className={styles.atmosphericLayer}>
        <div className={styles.fogLayer} />
        <div className={styles.darkGradient} />
        <div className={styles.vignette} />
      </div>

      {/* Spider webs scattered randomly */}
      {spiderWebPositions.map((web, index) => (
        <div
          key={web.id}
          style={{
            position: 'absolute',
            top: web.top,
            left: web.left,
            right: web.right,
            pointerEvents: 'none',
            zIndex: 1,
            '--random-rotation': `${(index * 45) % 360}deg`,
            '--random-scale': 0.6 + (index % 3) * 0.2,
          }}
        >
          <SpiderWeb position="custom" />
        </div>
      ))}

      {/* Flying bats (ambient) */}
      <FlyingBats count={24} />

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
