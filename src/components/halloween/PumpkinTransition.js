import React, { useEffect, useRef, useState } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pumpkin = pumpkinRef.current;
    const fire = fireRef.current;
    const mouth = mouthRef.current;
    const blackout = blackoutRef.current;

    if (!container || !pumpkin || !fire || !mouth || !blackout) {
      return undefined;
    }

    // Disable body scroll initially
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    let scrollTriggerInstance = null;
    let timelineInstance = null;
    let animationComplete = false;

    // Handle scroll events for manual animation control
    const handleScroll = (e) => {
      if (animationComplete) return;

      e.preventDefault();
      const delta = e.deltaY || e.detail || e.wheelDelta;

      if (delta > 0) {
        // Scrolling down - progress animation
        setScrollProgress((prev) => {
          const newProgress = Math.min(prev + 0.02, 1);
          if (newProgress >= 1 && !animationComplete) {
            animationComplete = true;
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 500);
          }
          return newProgress;
        });
      }
    };

    // Add scroll listener
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });

    // Create timeline without ScrollTrigger
    timelineInstance = gsap.timeline({ paused: true });

    // Animation sequence
    timelineInstance
      .fromTo(
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
      // Cleanup
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);

      // Re-enable body scroll
      document.body.style.overflow = '';
      document.body.style.height = '';

      // Kill the timeline
      if (timelineInstance) {
        try {
          timelineInstance.kill();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('Error killing timeline:', error);
        }
        timelineInstance = null;
      }

      // Kill ScrollTrigger instance if exists
      if (scrollTriggerInstance) {
        try {
          scrollTriggerInstance.kill();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn('Error killing ScrollTrigger:', error);
        }
        scrollTriggerInstance = null;
      }
    };
  }, [onComplete]);

  // Update animation progress based on scroll
  useEffect(() => {
    const container = containerRef.current;
    const pumpkin = pumpkinRef.current;
    const fire = fireRef.current;
    const mouth = mouthRef.current;
    const blackout = blackoutRef.current;

    if (!container || !pumpkin || !fire || !mouth || !blackout) {
      return;
    }

    // Manually animate based on scroll progress
    const progress = scrollProgress;

    if (progress < 0.3) {
      // Phase 1: Fade in and grow
      const phase1Progress = progress / 0.3;
      gsap.set(pumpkin, {
        scale: 0.3 + phase1Progress * 0.7,
        opacity: phase1Progress,
        filter: `brightness(${0.5 + phase1Progress * 0.5})`,
      });
      gsap.set(fire, {
        scale: 0.8 + phase1Progress * 0.4,
        opacity: phase1Progress,
      });
    } else if (progress < 0.6) {
      // Phase 2: Grow larger
      const phase2Progress = (progress - 0.3) / 0.3;
      gsap.set(pumpkin, {
        scale: 1 + phase2Progress * 1.5,
        opacity: 1,
        filter: 'brightness(1)',
      });
      gsap.set(fire, {
        scale: 1.2 + phase2Progress * 1.6,
        opacity: 1,
      });
      gsap.set(mouth, {
        opacity: phase2Progress,
        filter: `brightness(${1 + phase2Progress})`,
      });
    } else {
      // Phase 3: Zoom and blackout
      const phase3Progress = (progress - 0.6) / 0.4;
      gsap.set(pumpkin, {
        scale: 2.5 + phase3Progress * 2.5,
        opacity: 1,
        filter: 'brightness(1)',
      });
      gsap.set(fire, {
        scale: 2.8 + phase3Progress * 2,
        opacity: 1,
      });
      gsap.set(mouth, {
        opacity: 1,
        filter: 'brightness(2)',
      });
      gsap.set(blackout, {
        opacity: phase3Progress,
      });
    }
  }, [scrollProgress]);

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
