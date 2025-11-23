import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PumpkinTransition.module.css';

gsap.registerPlugin(ScrollTrigger);

function PumpkinTransition({ onComplete }) {
  const containerRef = useRef(null);
  const pumpkinRef = useRef(null);
  const fireRef = useRef(null);
  const mouthRef = useRef(null);
  const blackoutRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const pumpkin = pumpkinRef.current;
    const fire = fireRef.current;
    const mouth = mouthRef.current;
    const blackout = blackoutRef.current;

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onLeave: () => {
          if (onComplete) onComplete();
        },
      },
    });

    // Animation sequence
    tl.fromTo(
      pumpkin,
      {
        scale: 0.3,
        opacity: 0,
        filter: 'brightness(0.5)',
      },
      {
        scale: 1,
        opacity: 1,
        filter: 'brightness(1)',
        duration: 0.3,
        ease: 'power2.out',
      }
    )
      .to(
        fire,
        {
          scale: 1.2,
          opacity: 1,
          duration: 0.2,
        },
        '<'
      )
      .to(pumpkin, {
        scale: 2.5,
        duration: 0.3,
        ease: 'power1.in',
      })
      .to(
        fire,
        {
          scale: 2.8,
          duration: 0.3,
          ease: 'power1.in',
        },
        '<'
      )
      .to(
        mouth,
        {
          opacity: 1,
          filter: 'brightness(2)',
          duration: 0.2,
        },
        '<'
      )
      .to(pumpkin, {
        scale: 5,
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(
        blackout,
        {
          opacity: 1,
          duration: 0.2,
        },
        '-=0.1'
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.transitionContainer}>
      <div className={styles.darkBackground}>
        <div ref={pumpkinRef} className={styles.pumpkin}>
          {/* Burning fire effect on top */}
          <div ref={fireRef} className={styles.fireContainer}>
            <div className={styles.flame} />
            <div className={styles.flame} />
            <div className={styles.flame} />
          </div>

          {/* Pumpkin body */}
          <div className={styles.pumpkinBody}>
            {/* Stem */}
            <div className={styles.stem} />

            {/* Left eye */}
            <div className={styles.eye} data-eye="left">
              <div className={styles.eyeGlow} />
            </div>

            {/* Right eye */}
            <div className={styles.eye} data-eye="right">
              <div className={styles.eyeGlow} />
            </div>

            {/* Nose */}
            <div className={styles.nose}>
              <div className={styles.noseGlow} />
            </div>

            {/* Mouth - the entrance portal */}
            <div ref={mouthRef} className={styles.mouth}>
              <div className={styles.mouthGlow} />
              <div className={styles.tooth} />
              <div className={styles.tooth} />
              <div className={styles.tooth} />
              <div className={styles.tooth} />
              <div className={styles.tooth} />
            </div>
          </div>

          {/* Pumpkin ridges */}
          <div className={styles.ridge} style={{ left: '20%' }} />
          <div className={styles.ridge} style={{ left: '35%' }} />
          <div className={styles.ridge} style={{ left: '50%' }} />
          <div className={styles.ridge} style={{ left: '65%' }} />
          <div className={styles.ridge} style={{ left: '80%' }} />
        </div>

        {/* Final blackout for transition */}
        <div ref={blackoutRef} className={styles.blackout} />
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>Scroll to enter...</div>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </div>
  );
}

export default PumpkinTransition;
