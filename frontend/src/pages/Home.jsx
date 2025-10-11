import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import About from './About';
import Team from './Team';
import Service from '../components/Service';
import FreeQuote from './FreeQuote';
import AboutHome from './AboutHome';
import WhySolar from './WhySolar';

const Home = () => {
  return (
   
    <>
    <HeroCarousel/>
     <AboutHome/>
     <Service/>
     <WhySolar/>
     <FreeQuote/>


    </>
  );
};

export default Home;
