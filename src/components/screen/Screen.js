import { useEffect } from 'react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import SocialsBar from '../socialsbar/SocialsBar';

function Screen({ children }) {
  useEffect(() => {
    const overlayScreen = document.getElementById('overlayScreen');
    if (!overlayScreen) return undefined;

    const callback = (e) => {
      const cursor = document.querySelector('.cursor');
      if (cursor) {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
      }
    };
    
    overlayScreen.addEventListener('mousemove', callback);
    
    return () => {
      const element = document.getElementById('overlayScreen');
      if (element) {
        element.removeEventListener('mousemove', callback);
      }
    };
  }, []);

  return (
    <main id="overlayScreen" className="h-full relative">
      <div className="cursor" />
      <Navbar />
      <SocialsBar />
      {children}
      <Footer />
    </main>
  );
}

export default Screen;
