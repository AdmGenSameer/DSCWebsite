/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Notice from '../components/Notice';
// import Associations from '../components/associations/Associations';
import GridGallery from '../components/gridGallery/GridGallery';
import HomeAbout from '../components/homeAbout/HomeAbout';
import Screen from '../components/screen/Screen';
import Sponsors from '../components/sponsors/Sponsors';
import TechStack from '../components/techStack/TechStack';
import Video from '../components/video/Video';
import HalloweenBackground from '../components/halloween/HalloweenBackground';
import UpcomingEvents from '../components/UpcomingEvents/UpcomingEvents';
import PumpkinTransition from '../components/halloween/PumpkinTransition';

export default function Home() {
  const [showTransition, setShowTransition] = useState(false);
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Check if transition has been shown in this session
    const hasSeenTransition = sessionStorage.getItem('pumpkinTransitionShown');

    if (!hasSeenTransition) {
      setShowTransition(true);
    } else {
      setTransitionComplete(true);
      setContentVisible(true);
    }
  }, []);

  const handleTransitionComplete = () => {
    // Mark transition as shown for this session
    sessionStorage.setItem('pumpkinTransitionShown', 'true');

    // Re-enable body scroll
    document.body.style.overflow = '';
    document.body.style.height = '';

    // Hide transition and show main content with smooth fade
    setShowTransition(false);
    setTransitionComplete(true);

    // Delay content visibility for paper-like smooth fade-in
    setTimeout(() => {
      setContentVisible(true);
    }, 200); // Slightly increased delay for smoother appearance
  };

  return (
    <>
      <Helmet>
        <title>Data Science Club - VIT Bhopal</title>
        <meta
          name="description"
          content="Data Science Club is the official club of VIT Bhopal that has the motto to instill a data science and AI/ML culture, collaborate, and arrange events relevant to Data Analytics, Machine Learning, Deep Learning, AI, and many other topics."
        />
        <meta
          name="keywords"
          content="Data Science, Machine Learning, AI, Deep Learning, Python, Data Analytics, Data Science Club, VIT Bhopal"
        />
      </Helmet>

      {/* Cinematic pumpkin entrance - only on first load */}
      {showTransition && (
        <PumpkinTransition onComplete={handleTransitionComplete} />
      )}

      {/* Main content - only show after transition completes */}
      {transitionComplete && (
        <div
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible
              ? 'translateY(0) scale(1)'
              : 'translateY(30px) scale(0.98)',
            filter: contentVisible ? 'blur(0px)' : 'blur(8px)',
            transition:
              'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1), transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), filter 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'opacity, transform, filter',
          }}
        >
          <HalloweenBackground isHomePage>
            <Screen>
              <Notice />
              <Video />
              <UpcomingEvents />
              <HomeAbout />
              <TechStack />
              <GridGallery />
              <Sponsors />
              {/* <Associations /> */}
            </Screen>
          </HalloweenBackground>
        </div>
      )}
    </>
  );
}
