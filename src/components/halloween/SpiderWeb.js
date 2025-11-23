import React from 'react';
import styles from './SpiderWeb.module.css';

function SpiderWeb({ position = 'top-left' }) {
  return (
    <div className={`${styles.webContainer} ${styles[position]}`}>
      <svg
        className={styles.web}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Radial lines */}
        <line x1="100" y1="20" x2="100" y2="100" className={styles.webLine} />
        <line x1="150" y1="35" x2="100" y2="100" className={styles.webLine} />
        <line x1="175" y1="70" x2="100" y2="100" className={styles.webLine} />
        <line x1="180" y1="110" x2="100" y2="100" className={styles.webLine} />
        <line x1="165" y1="150" x2="100" y2="100" className={styles.webLine} />
        <line x1="130" y1="175" x2="100" y2="100" className={styles.webLine} />
        <line x1="100" y1="180" x2="100" y2="100" className={styles.webLine} />
        <line x1="70" y1="175" x2="100" y2="100" className={styles.webLine} />
        <line x1="35" y1="150" x2="100" y2="100" className={styles.webLine} />
        <line x1="20" y1="110" x2="100" y2="100" className={styles.webLine} />
        <line x1="25" y1="70" x2="100" y2="100" className={styles.webLine} />
        <line x1="50" y1="35" x2="100" y2="100" className={styles.webLine} />

        {/* Concentric circles */}
        <circle cx="100" cy="100" r="15" className={styles.webCircle} />
        <circle cx="100" cy="100" r="30" className={styles.webCircle} />
        <circle cx="100" cy="100" r="50" className={styles.webCircle} />
        <circle cx="100" cy="100" r="70" className={styles.webCircle} />
      </svg>

      {/* Animated spider */}
      <div className={styles.spider}>
        <div className={styles.spiderBody}>
          <div className={styles.spiderHead} />
          <div
            className={styles.spiderLeg}
            style={{ '--rotation': '-60deg', '--side': 'left' }}
          />
          <div
            className={styles.spiderLeg}
            style={{ '--rotation': '-30deg', '--side': 'left' }}
          />
          <div
            className={styles.spiderLeg}
            style={{ '--rotation': '0deg', '--side': 'left' }}
          />
          <div
            className={styles.spiderLeg}
            style={{ '--rotation': '30deg', '--side': 'left' }}
          />
          <div
            className={styles.spiderLeg}
            style={{ '--rotation': '-60deg', '--side': 'right' }}
          />
          <div
            className={styles.spiderLeg}
            style={{ '--rotation': '-30deg', '--side': 'right' }}
          />
          <div
            className={styles.spiderLeg}
            style={{ '--rotation': '0deg', '--side': 'right' }}
          />
          <div
            className={styles.spiderLeg}
            style={{ '--rotation': '30deg', '--side': 'right' }}
          />
        </div>
      </div>
    </div>
  );
}

export default SpiderWeb;
