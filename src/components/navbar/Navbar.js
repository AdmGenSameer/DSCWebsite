/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from '../../assets/christmas_theme/christmas-theme-logo.png';
import Button from '../button/Button';
import Sidebar from './Sidebar';

const SpanStyle = {
  zIndex: 1,
  color: 'inherit',
  transition: 'all 300ms ease-in-out',
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Creating a dynamic parent div for the sidebar to act as portal's root
    // Check if overlay already exists to avoid duplicates
    // NOTE: We don't remove this on cleanup because it's shared by multiple components
    // (Notice and Sidebar both use it via createPortal)
    // It will persist for the lifetime of the app
    const overlayId = 'overlay';
    let div = document.getElementById(overlayId);
    if (!div) {
      div = document.createElement('div');
      div.setAttribute('id', overlayId);
      const body = document.querySelector('body');
      if (body) {
        body.appendChild(div);
      }
    }
    
    // No cleanup needed - the overlay is persistent and shared
    // Removing it would break other components that use it
    return () => {
      // Don't remove the overlay - it's shared by multiple components
      // The overlay will persist for the app lifetime
    };
  }, []);

  useEffect(() => {
    let prevScroll = window.pageYOffset;
    const handleScroll = () => {
      const navList = document.getElementById('navList');
      const navbar = document.getElementById('navbar');
      const title = document.getElementById('hnccTitle');
      const height = navbar.offsetHeight;

      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > height + 60) {
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
      } else {
        navbar.style.border = 'none';
      }

      if (prevScroll < currentScrollPos) {
        // navList.classList.add('fade-up');
        // title.classList.add('fade-up');
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
      } else {
        navList.classList.remove('fade-up');
        title.classList.remove('fade-up');
      }

      prevScroll = currentScrollPos;
    };
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="navbar" className={`${styles.navbar}`}>
      <div>
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="HnCC" height="60" width="60" />
          <h2 id="hnccTitle" className={styles.navTitle}>
            Data Science Club
          </h2>
        </Link>
      </div>
      <div id="navList" className={styles.navbarList}>
        <Link to="/about" className={styles.navLink}>
          ABOUT US
        </Link>
        <Link to="/teams" className={styles.navLink}>
          TEAM
        </Link>
        <Link to="/alumni" className={styles.navLink}>
          ALUMNI
        </Link>
        <Link to="/events" className={styles.navLink}>
          EVENTS
        </Link>
        <Link to="/faqs" className={styles.navLink}>
          FAQs
        </Link>
        <Link to="/contact" className={styles.navLink}>
          CONTACT US
        </Link>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfdUNFQFgNsVL0bTEqHksGHCm3BXGyiOyjyTycg2hfFZ9qlPg/viewform"
          target="_blank"
          className="flex rounded-full"
          rel="noreferrer"
        >
          <Button
            style={{ border: 'none' }}
            // className="bg-primary-light text-primary hover:text-primary-light"
            /* For christams Theme */
            className="bg-primary-light text-primary"
          >
            <span style={SpanStyle}>Join Us</span>
          </Button>
        </a>
      </div>
      <div
        id="hamburger"
        onClick={() => setIsOpen(true)}
        className={styles.humburgerMenu}
      >
        <HiMenuAlt4 size={32} className="block" />
      </div>
      <Sidebar isMounted={isOpen} unmount={() => setIsOpen(false)} />
    </section>
  );
}
export default Navbar;
