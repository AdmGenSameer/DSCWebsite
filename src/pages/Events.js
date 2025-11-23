import React from 'react';

import { Helmet } from 'react-helmet-async';

import Screen from '../components/screen/Screen';

import Button from '../components/button/Button';

import BottomGlitter from '../components/StyledText/BottomGlitter';

import EventsData from '../lib/data/EventsData';

import HalloweenBackground from '../components/halloween/HalloweenBackground';


function Events() {

  return (

    <HalloweenBackground>

      <Screen>

        <Helmet>

          <title>Our Events - Data Science Club</title>

          <meta

            name="description"

            content="Event Information of Data Science Club, VIT Bhopal"

          />

          <meta

            name="keywords"

            content="Data Science, Machine Learning, AI, Events, Data Science Club, VIT Bhopal"

          />

        </Helmet>

        <div>

          {/* Further reduced vertical margin on the heading (my-6 to my-4) */}
          <div className="text-center my-4 sm:my-8">

            <BottomGlitter text="Our Events" />

          </div>


          {/* Further reduced vertical margins/padding on the main event container (my-10 py-10 to my-6 py-6) */}
          <div className="container-70 my-6 py-6 space-y-24">

            {/* Small screens: Show all events */}

            <div className="block m2lg:hidden">

              {EventsData.map((event, index) => (

                <EventBox

                  key={event.title}

                  title={event.title}

                  description={event.description}

                  detailedDescription={event.detailed_description}

                  poster={event.bgImage}

                  link={event.link}

                  index={index}

                />

              ))}

            </div>


            {/* Large screens: Only show events with detailed_description */}

            <div className="hidden m2lg:block">

              {EventsData.filter((event) => event.detailed_description && event.detailed_description.trim() !== '')

                .map((event, index) => (

                  <EventBox

                    key={event.title}

                    title={event.title}

                    description={event.description}

                    detailedDescription={event.detailed_description}

                    poster={event.bgImage}

                    link={event.link}

                    index={index}

                  />

                ))}

            </div>

          </div>

        </div>

      </Screen>

    </HalloweenBackground>

  );

}


function EventBox({ title, description, detailedDescription, poster, link, index }) {

  // Vibrant color schemes - alternating colors

  const colorSchemes = [

    { primary: 'text-purple-400', border: 'border-purple-500', shadow: 'shadow-purple-500/30', accent: 'from-purple-500/20', hoverBorder: 'hover:border-purple-400' },

    { primary: 'text-cyan-400', border: 'border-cyan-500', shadow: 'shadow-cyan-500/30', accent: 'from-cyan-500/20', hoverBorder: 'hover:border-cyan-400' },

    { primary: 'text-pink-400', border: 'border-pink-500', shadow: 'shadow-pink-500/30', accent: 'from-pink-500/20', hoverBorder: 'hover:border-pink-400' },

    { primary: 'text-emerald-400', border: 'border-emerald-500', shadow: 'shadow-emerald-500/30', accent: 'from-emerald-500/20', hoverBorder: 'hover:border-emerald-400' },

  ];


  const colors = colorSchemes[index % colorSchemes.length];

  const isPosterLeft = index % 2 === 0;


  // Format description - handle newlines and markdown-style bold

  const formatDescription = (text) => {

    if (!text) return '';

    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {

      // Handle markdown-style bold (**text**)

      const parts = line.split(/(\*\*.*?\*\*)/g);

      const lineKey = `${title}-line-${line.substring(0, 20)}-${lineIdx}`;

      return (

        <React.Fragment key={lineKey}>

          {parts.map((part, partIdx) => {

            const partKey = `${lineKey}-part-${part.substring(0, 10)}-${partIdx}`;

            if (part.startsWith('**') && part.endsWith('**')) {

              return (

                <strong key={partKey} className={`${colors.primary} font-semibold`}>

                  {part.slice(2, -2)}

                </strong>

              );

            }

            return <span key={partKey}>{part}</span>;

          })}

          {lineIdx < lines.length - 1 && <br />}

        </React.Fragment>

      );

    });

  };


  return (

    <section className="relative overflow-hidden mb-16 last:mb-0">

      {/* Halloween Decorations - Subtle Background Elements */}

      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">

        {index % 2 === 0 ? (

          <div className="absolute left-0 top-1/4 w-24 md:w-16 sm:w-12">

            <div

              className="absolute top-0 left-4 animate-pulse"

              style={{ animationDuration: '4s' }}

            >

              <span className="text-5xl md:text-4xl sm:text-3xl drop-shadow-[0_0_8px_rgba(255,165,0,0.3)]">

                🎃

              </span>

            </div>

          </div>

        ) : (

          <div className="absolute right-0 top-1/3 w-24 md:w-16 sm:w-12">

            <div

              className="absolute top-0 right-4 animate-pulse"

              style={{ animationDuration: '5s', animationDelay: '1s' }}

            >

              <span className="text-5xl md:text-4xl sm:text-3xl drop-shadow-[0_0_8px_rgba(255,165,0,0.3)]">

                👻

              </span>

            </div>

          </div>

        )}

      </div>


      {/* Content */}

      <div className="relative z-10">

        {/* Small screens: Poster above, description below */}

        <div className="block m2lg:hidden">

          {/* Poster - smaller on mobile */}

          <div className="mb-6">

            <div

              className={`relative w-full max-w-md mx-auto rounded-xl overflow-hidden border-2 ${colors.border} ${colors.hoverBorder} bg-gray-900/50 p-3 shadow-lg ${colors.shadow}`}

            >

              <div className="relative w-full aspect-[3/4] bg-gray-800/50 flex items-center justify-center">

                <img

                  src={poster}

                  alt={title}

                  className="w-full h-full object-contain"

                />

              </div>

            </div>

          </div>


          {/* Event Details */}

          <div className="space-y-6">

            <h2 className={`text-3xl sm:text-2xl font-bold ${colors.primary}`}>

              {title}

            </h2>


            <div className={`bg-gradient-to-r ${colors.accent} via-gray-800/20 to-transparent p-6 rounded-lg border-l-4 ${colors.border} ${colors.hoverBorder} transition-all duration-300 hover:shadow-lg ${colors.shadow}`}>

              <p className="text-lg sm:text-base leading-relaxed text-gray-300 font-light">

                {description}

              </p>

            </div>


            {link && link !== '#' && (

              <div className="mt-6">

                <a

                  href={link}

                  target="_blank"

                  rel="noreferrer"

                  className="flex w-[fit-content] rounded-full group"

                >

                  <Button>

                    <span className="z-50 block group-hover:text-black transition-colors font-semibold duration-300">

                      Know More

                    </span>

                  </Button>

                </a>

              </div>

            )}

          </div>

        </div>


        {/* Large screens: Text wrapping around poster */}

        <div className="hidden m2lg:block">

          <h2 className={`text-4xl xl:text-5xl font-bold mb-6 ${colors.primary}`}>

            {title}

          </h2>


          <div className="relative">

            {/* Poster Image - Float left or right */}

            <div

              className={`relative ${isPosterLeft ? 'float-left' : 'float-right'} ${isPosterLeft ? 'mr-8 xl:mr-12' : 'ml-8 xl:ml-12'} mb-6 w-80 xl:w-96 flex-shrink-0 rounded-xl overflow-hidden border-2 ${colors.border} ${colors.hoverBorder} bg-gray-900/50 p-4 shadow-lg ${colors.shadow}`}

            >

              <div className="relative w-full aspect-[3/4] bg-gray-800/50 flex items-center justify-center">

                <img

                  src={poster}

                  alt={title}

                  className="w-full h-full object-contain"

                />

              </div>

            </div>


            {/* Event Details - Text wraps around poster */}

            <div className={`bg-gradient-to-r ${colors.accent} via-gray-800/20 to-transparent p-6 rounded-lg border-l-4 ${colors.border} ${colors.hoverBorder} transition-all duration-300 hover:shadow-lg ${colors.shadow}`}>

              <p className="text-xl xl:text-2xl leading-relaxed text-gray-300 font-light whitespace-pre-line">

                {formatDescription(detailedDescription)}

              </p>

            </div>


            {/* Clear float and add button */}

            <div className="clear-both mt-8 mb-8">

              {link && link !== '#' && (

                <a

                  href={link}

                  target="_blank"

                  rel="noreferrer"

                  className="flex w-[fit-content] rounded-full group"

                >

                  <Button>

                    <span className="z-50 block group-hover:text-black transition-colors font-semibold duration-300">

                      Know More

                    </span>

                  </Button>

                </a>

              )}

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}


export default Events;