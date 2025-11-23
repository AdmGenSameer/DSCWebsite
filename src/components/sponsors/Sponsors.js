import { useEffect, useRef } from 'react';
import BottomGlitter from '../StyledText/BottomGlitter';
import SponsorsCarousel from './LogoLoop'

function Sponsors() {
  const ref = useRef();

  const sponsors = [
    { name: 'Geeks for Geeks', logo: 'https://res.cloudinary.com/dwpdekzdb/image/upload/v1763910818/gfg_f2kkgj.png' },
    { name: 'Coding Ninjas', logo: 'https://res.cloudinary.com/dwpdekzdb/image/upload/v1763910829/codingNinjas_icireq.jpg' },
    { name: 'Interview Cake', logo: 'https://res.cloudinary.com/dwpdekzdb/image/upload/v1763910841/ic_e0tvxn.png' },
    { name: 'NSE', logo: 'https://res.cloudinary.com/dwpdekzdb/image/upload/v1763910858/nse_jdkn7z.png' },
    { name: 'Physics Wallah', logo: 'https://res.cloudinary.com/dwpdekzdb/image/upload/v1763910869/physics-wallah_nmnwsf.jpg' },
    { name: 'UN stop', logo: 'https://res.cloudinary.com/dwpdekzdb/image/upload/v1763910879/un_j8at3e.jpg' },
    { name: 'CloudyML', logo: 'https://res.cloudinary.com/dwpdekzdb/image/upload/v1763910883/ml_zljjmv.jpg' },

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
