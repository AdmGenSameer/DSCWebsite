import { Link } from 'react-router-dom';
import Styles from './Footer.module.css';

function Footer() {
  return (
    <footer
      className={`${Styles.footer} container-70`}
      style={{ overflow: 'hidden' }}
    >
      <div className={Styles.linksContainer}>
        <div className="flex-2 md:flex-1">
          <div className="mb-3 flex flex-col">
            <h3 className="text-2xl">Write</h3>
            <h4 className="text-lg font-extralight">
              <a href="mailto:datascienceclub@vitbhopal.ac.in">
                datascienceclub@vitbhopal.ac.in
              </a>
            </h4>
          </div>
          <div className="my-3 flex flex-col">
            <h3 className="text-2xl">Meet</h3>
            <h4 className="text-lg font-extralight">
              VIT Bhopal University <br />
              Kothrikalan, Sehore <br />
              Madhya Pradesh - 466114 <br />
              India
            </h4>
          </div>
        </div>
        <div className="flex-4 md:flex-1 md:mx-4 sm:mx-0 sm:mt-8">
          <h3 className="text-2xl">Other Pages</h3>
          <Link
            to="/events"
            className="pl-1 block text-lg my-1 font-extralight"
          >
            Events
          </Link>
          <a
            href="https://blog.hnccbits.com"
            className="pl-1 block text-lg my-1 font-extralight"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
          <a
            href="https://vitbhopal.ac.in"
            className="block pl-1 text-lg my-1 font-extralight"
            target="_blank"
            rel="noopener noreferrer"
          >
            VIT Bhopal
          </a>
        </div>
        <div className="flex-4 md:flex-1 sm:mt-8">
          <h3 className="text-2xl">Get Help</h3>
          <a
            href="#"
            className="block pl-1 text-lg my-1 font-extralight"
            target="_blank"
            rel="noreferrer"
          >
            Join Us
          </a>
          <Link to="/faqs" className="block pl-1 text-lg my-1 font-extralight">
            FAQs
          </Link>
          <Link
            to="/contact"
            className="pl-1 block text-lg my-1 font-extralight"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className={Styles.copyrightBottom}>
        <h6>
          © {new Date().getFullYear()} Data Science Club, VIT Bhopal. All rights
          reserved.
        </h6>

        <h6 className="flex items-center">
          Crafted with&nbsp;<span className="text-2xl">♥</span>&nbsp;by Data
          Science Club Team.
        </h6>
      </div>
    </footer>
  );
}

export default Footer;
