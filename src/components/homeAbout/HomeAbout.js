import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import BottomGlitter from '../StyledText/BottomGlitter';

function HomeAbout() {
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        if (window.innerHeight + 100 > ref.current.getBoundingClientRect().y) {
          ref.current.classList.add('active');
        } else {
          ref.current.classList.remove('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <section
      ref={ref}
      className="container-70 my-16 py-16 fadeonscroll sm:transform-none sm:opacity-100 relative overflow-hidden"
    >
      {/* Halloween Decorations - Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        {/* Left side subtle decorations */}
        <div className="absolute left-0 top-1/4 w-24 md:w-16 sm:w-12">
          <div
            className="absolute top-0 left-4 animate-pulse"
            style={{ animationDuration: '4s' }}
          >
            <span className="text-5xl md:text-4xl sm:text-3xl drop-shadow-[0_0_8px_rgba(255,165,0,0.3)]">
              🎃
            </span>
          </div>
          <div className="absolute top-20 left-2 opacity-40">
            <div className="w-12 h-12 md:w-10 md:h-10 border border-white/20 rounded-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-white/20 absolute" />
                <div className="h-full w-px bg-white/20 absolute" />
                <div className="w-full h-px bg-white/20 absolute rotate-45" />
                <div className="w-full h-px bg-white/20 absolute -rotate-45" />
              </div>
            </div>
          </div>
        </div>

        {/* Right side subtle decorations */}
        <div className="absolute right-0 top-1/3 w-24 md:w-16 sm:w-12">
          <div
            className="absolute top-0 right-4 animate-pulse"
            style={{ animationDuration: '5s', animationDelay: '1s' }}
          >
            <span className="text-5xl md:text-4xl sm:text-3xl drop-shadow-[0_0_8px_rgba(255,165,0,0.3)]">
              👻
            </span>
          </div>
          <div className="absolute top-24 right-2 opacity-40">
            <span className="text-3xl md:text-2xl sm:text-xl">🦇</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <BottomGlitter text="About DSC VIT Bhopal" />

        <div className="mt-8 max-w-4xl space-y-6">
          {/* First paragraph with Halloween accent */}
          <div className="bg-gradient-to-r from-transparent via-orange-900/10 to-transparent p-6 rounded-lg border-l-4 border-orange-500/50 hover:border-orange-400/70 transition-all duration-300">
            <p className="text-xl md:text-lg sm:text-base leading-relaxed text-gray-300 font-light">
              Welcome to the coolest corner of VIT Bhopal — the Data Science
              Club! 🎉
            </p>
          </div>

          {/* Second paragraph */}
          <p className="text-xl md:text-lg sm:text-base leading-relaxed text-gray-300 font-light">
            We&apos;re a vibrant mix of curious minds: students, tinkerers,
            coders, analysts, and full-on data nerds (in the best way). If
            you&apos;ve ever wondered how companies make smart decisions, how
            machines &quot;learn,&quot; or why data feels like magic —
            you&apos;re in the right place.
          </p>

          {/* Third paragraph with enhanced styling */}
          <div className="bg-gradient-to-r from-transparent via-gray-800/20 to-transparent p-6 rounded-lg border-l-4 border-golden/50 hover:border-golden/70 transition-all duration-300 hover:shadow-lg hover:shadow-golden/10">
            <p className="text-xl md:text-lg sm:text-base leading-relaxed text-gray-300 font-light">
              Guided by our amazing faculty mentor{' '}
              <span className="text-golden font-semibold">Dr. Velmurugan</span>,
              and powered by a super-talented team across technical and
              non-technical domains, we&apos;re here to explore, experiment, and
              push the limits of what data can do. Whether you&apos;re just
              getting started or diving into advanced ML, this is your space to
              grow, build, break things, fix things, and most importantly — have
              fun while learning.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/about" className="flex w-[fit-content] rounded-full group">
            <Button>
              <span className="z-50 block group-hover:text-black transition-colors font-semibold duration-300">
                View More
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeAbout;
