import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import About from './About';
import Team from './Team';
import Service from '../components/Service';

const Home = () => {
  return (
   
    <>
    <HeroCarousel/>
     <About/>
     <Service/>
     <Team />

    </>
  );
};

export default Home;
