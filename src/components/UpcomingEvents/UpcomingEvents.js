import React, { useState, useEffect } from 'react';
import styles from './UpcomingEvents.module.css';

function UpcomingEvents() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Example event date - Replace with your actual event date
  const eventDate = new Date('2025-10-31T18:00:00').getTime();

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

  const upcomingEvents = [
    {
      id: 1,
      title: '🎃 Halloween Hackathon',
      date: 'Oct 31, 2025',
      time: '6:00 PM - 11:59 PM',
      description:
        'Join us for a spooky coding challenge! Build the most haunting ML models and win exciting prizes.',
      location: 'VIT Bhopal Campus',
      category: 'Hackathon',
    },
    {
      id: 2,
      title: '👻 AI Workshop: Spooky Predictions',
      date: 'Nov 5, 2025',
      time: '4:00 PM - 6:00 PM',
      description:
        'Learn to build predictive models with a Halloween twist. Predict haunted house patterns!',
      location: 'Tech Lab 3',
      category: 'Workshop',
    },
    {
      id: 3,
      title: '🦇 Data Visualization Night',
      date: 'Nov 12, 2025',
      time: '5:00 PM - 7:00 PM',
      description:
        'Create eerie and engaging data visualizations. Dark mode plots encouraged!',
      location: 'Seminar Hall',
      category: 'Workshop',
    },
  ];

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

        {/* Events Cards */}
        <div className={styles.eventsGrid}>
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className={styles.eventCard}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.eventCategory}>{event.category}</div>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <div className={styles.eventDetails}>
                <div className={styles.eventDetail}>
                  <span className={styles.eventIcon}>📅</span>
                  <span>{event.date}</span>
                </div>
                <div className={styles.eventDetail}>
                  <span className={styles.eventIcon}>⏰</span>
                  <span>{event.time}</span>
                </div>
                <div className={styles.eventDetail}>
                  <span className={styles.eventIcon}>📍</span>
                  <span>{event.location}</span>
                </div>
              </div>
              <p className={styles.eventDescription}>{event.description}</p>
              <button className={styles.registerBtn} type="button">
                Register Now
                <span className={styles.btnGlow} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
