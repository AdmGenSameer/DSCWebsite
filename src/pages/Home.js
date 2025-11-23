/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Notice from '../components/Notice';
import Associations from '../components/associations/Associations';
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

      {/* Cinematic pumpkin entrance */}
      <PumpkinTransition />

      {/* Main content */}
      <HalloweenBackground>
        <Screen>
          <Notice />
          <Video />
          <UpcomingEvents />
          <HomeAbout />
          <TechStack />
          <GridGallery />
          <Sponsors />
          <Associations />
        </Screen>
      </HalloweenBackground>
    </>
  );
}
