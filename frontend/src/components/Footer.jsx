import React from 'react';
import logo from '../assets/logopng.png'
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt
} from 'react-icons/fa';


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-800 text-white py-8  mt-16">
      <div className="container xl:max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo and About */}
        <div>
          <Link to="/"> <img src={logo} className='h-14' alt="" /></Link>
<div className="w-full">
      <h5 className="text-white text-lg font-semibold mb-4">Address</h5>

      <p className="mb-2 text-gray-300 flex items-start">
        <FaMapMarkerAlt className="text-primary mr-3 mt-1" />
        Office Address - S.N 2, 2nd Floor, Ashirwad Complex, Sector 53, Noida
      </p>

      <p className="mb-2 text-gray-300 flex items-start">
        <FaMapMarkerAlt className="text-primary mr-3 mt-1" />
        Registered Address - 2nd Floor, H-1259, DSIIDC Narela Industrial Area, Delhi
      </p>

      <p className="mb-2 text-gray-300 flex items-center">
        <FaPhoneAlt className="text-primary mr-3" />
        +91 9220337642
      </p>

      <p className="mb-2 text-gray-300 flex items-center">
        <FaEnvelope className="text-primary mr-3" />
        contact@solarradian.com
      </p>
    </div>

        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link
                to="/"
                onClick={scrollToTop}
                className="hover:text-white flex items-center space-x-2"
              >
                <FaHome /> <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={scrollToTop}
                className="hover:text-white flex items-center space-x-2"
              >
                <FaInfoCircle /> <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                to="/service"
                onClick={scrollToTop}
                className="hover:text-white flex items-center space-x-2"
              >
                <FaServicestack /> <span>Services</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={scrollToTop}
                className="hover:text-white flex items-center space-x-2"
              >
                <FaEnvelope /> <span>Contact</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-gray-300 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/solarradian/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/solar-radian-delhi/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400 max-w-7xl container mx-auto">
        © {new Date().getFullYear()} Solar Radian. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
