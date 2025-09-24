import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';

// ✅ Image imports (check your folder structure)
import carousel1 from '../assets/carousel-1.jpg';
import carousel2 from '../assets/carousel-2.jpg';
import carousel3 from '../assets/carousel-3.jpg';

// ✅ Slide content
const slides = [
  {
    image: carousel1,
    title: 'Solar Radian',
    subtitle: 'Your Trusted Solar Energy Partner',
    description: 'Empowering homes and businesses with clean, sustainable solar power.',
  },
  {
    image: carousel2,
    title: 'Save Energy, Save Future',
    subtitle: 'Join the Solar Revolution',
    description: 'Let’s build a greener tomorrow with affordable solar solutions.',
  },
  {
    image: carousel3,
    title: 'Go Solar Today',
    subtitle: 'Harness the Sun for a Better Tomorrow',
    description: 'Affordable, reliable, and clean solar power made simple.',
  },
];

const HeroCarousel = () => {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* 🧪 Debug image with border if images don’t show */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover "
              />

              {/* Overlay Content */}
              <div className="absolute inset-0  bg-opacity-50 flex items-center justify-start">
                <div className="container max-w-[1400px] mx-auto px-6 lg:px-12">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-white max-w-2xl"
                  >
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">{slide.title}</h1>
                    <h2 className="text-2xl lg:text-3xl font-semibold mb-2">{slide.subtitle}</h2>
                    <p className="text-lg lg:text-xl">{slide.description}</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
