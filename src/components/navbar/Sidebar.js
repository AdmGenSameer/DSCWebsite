import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import styles from './Hamburger.module.css';
import Logo from '../../assets/christmas_theme/christmas-theme-logo.png';
import Button from '../button/Button';

const SpanStyle = {
  zIndex: 1,
  color: 'inherit',
  transition: 'all 300ms ease-in-out',
};

function Sidebar({ isMounted, unmount }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const documentWidthRef = useRef(null);

  useEffect(() => {
    let timeoutId;
    if (isMounted && !isTransitioning) {
      setIsTransitioning(true);
      documentWidthRef.current = document.documentElement.clientWidth;
      document.documentElement.classList.add('scroll-lock');

      /*
        After locking the body scroll, the scrollbar is hidden, so we have to compensate for the extra space
        created due to no scrollbar by giving the document an extra right padding according to the extra created space
      */
      if (documentWidthRef.current !== document.documentElement.clientWidth) {
        document.documentElement.style.paddingRight = `${document.documentElement.clientWidth - documentWidthRef.current
          }px`;
      }
    } else if (!isMounted && isTransitioning) {
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
        document.documentElement.classList.remove('scroll-lock');
        document.documentElement.style.paddingRight = 0;
      }, 300);
    }

    return () => {
      clearTimeout(timeoutId);
      if (
        document.documentElement.classList.contains('scroll-lock') &&
        isTransitioning
      ) {
        document.documentElement.classList.remove('scroll-lock');
        document.documentElement.style.paddingRight = 0;
      }
    };
  }, [isMounted, isTransitioning]);

  if (!isMounted && !isTransitioning) return null;

  return createPortal(
    <section
      className={`${isTransitioning && isMounted ? styles.active : ''} ${styles.navbarWrapper
        }`.trim()}
    >
      <div className={styles.navbar}>
        <div>
          <Link
            to="/"
            className="flex items-center"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              unmount();
            }}
          >
            <img src={Logo} alt="HnCC" height="60" width="60" />
          </Link>
        </div>
        <div onClick={unmount} className="cursor-pointer">
          <CgClose size={32} className={styles.closeIcon} />
        </div>
      </div>

      <div id="navList" className={styles.navItems}>
        <Link
          to="/about"
          className={styles.navLink}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            unmount();
          }}
        >
          About Us
        </Link>
        <Link
          to="/teams"
          className={styles.navLink}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            unmount();
          }}
        >
          Team
        </Link>
        <Link
          to="/contact"
          className={styles.navLink}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            unmount();
          }}
        >
          Contact Us
        </Link>
        <Link
          to="/events"
          className={styles.navLink}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            unmount();
          }}
        >
          Events
        </Link>
        <Link
          to="/faqs"
          className={styles.navLink}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            unmount();
          }}
        >
          FAQs
        </Link>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfdUNFQFgNsVL0bTEqHksGHCm3BXGyiOyjyTycg2hfFZ9qlPg/viewform"
          target="_blank"
          className="flex rounded-full"
          rel="noreferrer"
        >
          <Button
            style={{ border: 'none' }}
            className="bg-primary-light text-primary hover:text-primary-light xs:!py-3"
          /* For Christmas theme */
          // className="bg-primary-light text-primary xs:!py-3"
          >
            <span style={SpanStyle}>Join Us</span>
          </Button>
        </a>
      </div>
    </section>,
    document.getElementById('overlay')
  );
}
export default Sidebar;
