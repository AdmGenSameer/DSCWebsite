import { useEffect, useRef } from 'react';
import BottomGlitter from '../StyledText/BottomGlitter';
import SponsorsCarousel from './LogoLoop';

function Sponsors() {
  const ref = useRef();

  const sponsors = [
    { id: 'gfg', name: 'Geeks for Geeks', logo: '/sponsors/gfg.png' },
    { id: 'cn', name: 'Coding Ninjas', logo: '/sponsors/codingNinjas.jpeg' },
    { id: 'ic', name: 'Interview Cake', logo: '/sponsors/ic.png' },
    { id: 'nse', name: 'NSE', logo: '/sponsors/nse.png' },
    { id: 'pw', name: 'Physics Wallah', logo: '/sponsors/physics-wallah.jpg' },
    { id: 'un', name: 'UN stop', logo: '/sponsors/un.jpg' },
    { id: 'ml', name: 'CloudyML', logo: '/sponsors/ml.jpeg' },
  ];

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
    <section ref={ref} className="container-70 my-16 py-16 fadeonscroll">
      <BottomGlitter text="Our Sponsors" />
      <SponsorsCarousel sponsors={sponsors} />
    </section>
  );
}

export default Sponsors;
