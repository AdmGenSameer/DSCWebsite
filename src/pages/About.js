import React from 'react';
import { Helmet } from 'react-helmet-async';
import Events from '../components/event/Events';
import Screen from '../components/screen/Screen';
import BottomGlitter from '../components/StyledText/BottomGlitter';
import HalloweenBackground from '../components/halloween/HalloweenBackground';

function About() {
  return (
    <HalloweenBackground>
      <Screen>
        <Helmet>
          <title>About Us - Data Science Club</title>
          <meta
            name="description"
            content="Data Science Club is the official club of VIT Bhopal that has the motto to instill a 
          data science and AI/ML culture, collaborate, and arrange events relevant to Data Analytics, Machine Learning, 
          Deep Learning, AI, and many other topics."
          />
          <meta
            name="keywords"
            content="Data Science, Machine Learning, AI, About Data Science Club, VIT Bhopal"
          />
        </Helmet>
        <section className="container-70 pt-28 md:pt-16 sm:pt-12">
          <div className="mt-12 mb-6 sm:mt-8 sm:mb-4">
            <BottomGlitter text="About The Data Science Club" />
            <div className="mt-8 max-w-4xl">
              <p className="text-xl md:text-lg sm:text-base leading-relaxed text-gray-300 font-light tracking-wide">
                The Data Science Club (DSC) is our campus hub for all things
                data — where curiosity meets creativity. Guided by Dr.
                Velmurugan, we bring together learners, coders, analysts, and
                innovators to explore how data powers real-world decisions. From
                analytics to machine learning, we grow, build, experiment, and
                create together. If you&apos;re excited to dive into the world
                of data, this is the place to be.
              </p>
            </div>
          </div>
          <div className="mt-20 mb-6 sm:mt-8 sm:mb-4">
            <BottomGlitter text="ACTIVITIES — WE DO " />
            <div className="mt-8 max-w-4xl space-y-8">
              <p className="text-xl md:text-lg sm:text-base leading-relaxed text-gray-300 font-light">
                We turn learning into a full-on adventure. No boring theory
                dumps here — just hands-on action, exciting events, and
                real-world challenges.
              </p>
              <p className="text-xl md:text-lg sm:text-base font-semibold text-white">
                Here&apos;s what we&apos;re all about:
              </p>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent p-6 rounded-lg border-l-4 border-blue-500 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                  <p className="text-xl md:text-lg sm:text-base font-bold mb-3 text-white flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    <span>Workshops &amp; Bootcamps</span>
                  </p>
                  <p className="text-lg md:text-base sm:text-sm leading-relaxed text-gray-300 pl-8">
                    Crash courses, coding nights, and power-packed sessions like
                    Data Science Nights, INNOVISION-X, and our ML Bootcamps —
                    perfect for levelling up your skills.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent p-6 rounded-lg border-l-4 border-purple-500 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                  <p className="text-xl md:text-lg sm:text-base font-bold mb-3 text-white flex items-center gap-2">
                    <span className="text-2xl">🎤</span>
                    <span>Flagship Events</span>
                  </p>
                  <p className="text-lg md:text-base sm:text-sm leading-relaxed text-gray-300 pl-8">
                    Our FLAMES and FLAMES 2.0 events bring in speakers
                    who&apos;ve done some seriously cool stuff with data. Expect
                    inspiration, insights, and industry stories you won&apos;t
                    forget.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent p-6 rounded-lg border-l-4 border-green-500 hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                  <p className="text-xl md:text-lg sm:text-base font-bold mb-3 text-white flex items-center gap-2">
                    <span className="text-2xl">🧠</span>
                    <span>Hackathons &amp; Competitions</span>
                  </p>
                  <p className="text-lg md:text-base sm:text-sm leading-relaxed text-gray-300 pl-8">
                    Ready to solve real problems? We host challenges that push
                    your creativity and analytical abilities to the max.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent p-6 rounded-lg border-l-4 border-yellow-500 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20">
                  <p className="text-xl md:text-lg sm:text-base font-bold mb-3 text-white flex items-center gap-2">
                    <span className="text-2xl">🤝</span>
                    <span>Projects &amp; Collaborations</span>
                  </p>
                  <p className="text-lg md:text-base sm:text-sm leading-relaxed text-gray-300 pl-8">
                    Love building things? We help members team up to work on
                    research, Kaggle contests, and portfolio-worthy projects.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent p-6 rounded-lg border-l-4 border-cyan-500 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                  <p className="text-xl md:text-lg sm:text-base font-bold mb-3 text-white flex items-center gap-2">
                    <span className="text-2xl">🌐</span>
                    <span>Mentorship &amp; Networking</span>
                  </p>
                  <p className="text-lg md:text-base sm:text-sm leading-relaxed text-gray-300 pl-8">
                    Get guidance from experts, connect with like-minded
                    learners, and be part of a supportive community that grows
                    together.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 mb-6 sm:mt-8 sm:mb-4">
            <BottomGlitter text="OUR MOTIVE — WHY WE EXIST " />
            <div className="mt-8 max-w-4xl space-y-8">
              <div className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent p-8 rounded-xl border-l-4 border-orange-500 hover:border-orange-400 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-bold text-orange-500 group-hover:scale-110 transition-transform duration-300">
                    1.
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl md:text-xl sm:text-lg font-bold mb-4 text-white">
                      Empower Through Knowledge
                    </p>
                    <p className="text-lg md:text-base sm:text-sm leading-relaxed text-gray-300">
                      We believe data science should be for everyone. No fancy
                      background required. Our workshops, mentorship programs,
                      and beginner-friendly sessions help students confidently
                      explore this amazing field and stay updated with
                      cutting-edge tools.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent p-8 rounded-xl border-l-4 border-pink-500 hover:border-pink-400 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-bold text-pink-500 group-hover:scale-110 transition-transform duration-300">
                    2.
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl md:text-xl sm:text-lg font-bold mb-4 text-white">
                      Build Real-World Skills
                    </p>
                    <p className="text-lg md:text-base sm:text-sm leading-relaxed text-gray-300">
                      We want you industry-ready. That means practical projects,
                      hands-on experience, competitions, and portfolio building
                      — the kind of stuff that actually helps you stand out
                      during placements and interviews.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-transparent via-gray-800/30 to-transparent p-8 rounded-xl border-l-4 border-indigo-500 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-bold text-indigo-500 group-hover:scale-110 transition-transform duration-300">
                    3.
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl md:text-xl sm:text-lg font-bold mb-4 text-white">
                      Foster Innovation &amp; Community
                    </p>
                    <p className="text-lg md:text-base sm:text-sm leading-relaxed text-gray-300 mb-3">
                      Here, you&apos;re not just learning data science —
                      you&apos;re living it.
                    </p>
                    <p className="text-lg md:text-base sm:text-sm leading-relaxed text-gray-300">
                      We&apos;re a community where ideas spark, collaborations
                      grow, memories are made, and future data scientists find
                      their tribe. Together, we dream big, experiment boldly,
                      and shape the future using data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Events />
        </section>
      </Screen>
    </HalloweenBackground>
  );
}

export default About;
