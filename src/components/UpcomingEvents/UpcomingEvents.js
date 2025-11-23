import React, { useState, useEffect } from 'react';
import styles from './UpcomingEvents.module.css';

function UpcomingEvents() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Event date: November 29, 2025 at 8:00 AM
  const eventDate = new Date('2025-11-29T08:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <section className={styles.eventsSection}>
      <div className={styles.container}>
        {/* Floating bats decoration */}
        <div className={styles.batDecor}>🦇</div>
        <div
          className={styles.batDecor}
          style={{ left: '80%', animationDelay: '2s' }}
        >
          🦇
        </div>

        {/* Section Title */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>
            <span className={styles.titleIcon}>🎃</span>
            Upcoming Spooky Events
            <span className={styles.titleIcon}>👻</span>
          </h2>
          <p className={styles.subtitle}>
            Don&apos;t miss our frightfully exciting events this season!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className={styles.countdownSection}>
          <h3 className={styles.countdownTitle}>⏰ Next Event Countdown</h3>
          <div className={styles.countdown}>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>{timeLeft.days}</div>
              <div className={styles.countdownLabel}>Days</div>
            </div>
            <div className={styles.countdownDivider}>:</div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>{timeLeft.hours}</div>
              <div className={styles.countdownLabel}>Hours</div>
            </div>
            <div className={styles.countdownDivider}>:</div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>{timeLeft.minutes}</div>
              <div className={styles.countdownLabel}>Minutes</div>
            </div>
            <div className={styles.countdownDivider}>:</div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownValue}>{timeLeft.seconds}</div>
              <div className={styles.countdownLabel}>Seconds</div>
            </div>
          </div>
        </div>

        {/* Event Poster */}
        <div className={styles.posterSection}>
          <div className={styles.posterContainer}>
            <img
              src="/poster-1_page-0001.jpg"
              alt="Upcoming Event Poster"
              className={styles.eventPoster}
            />
            <div className={styles.posterOverlay}>
              <div className={styles.posterContent}>
                <h3 className={styles.posterTitle}>
                  🎃 Join Our Spooktacular Event! 👻
                </h3>
                <p className={styles.posterText}>
                  Don&apos;t miss out on the most thrilling event of the season!
                  Limited seats available - Register now before it&apos;s too
                  late!
                </p>
                <a
                  href="https://forms.gle/rZSC14JJMcFysGJa6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.registerBtn}
                >
                  🎫 Register Now - Secure Your Spot!
                  <span className={styles.btnGlow} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
