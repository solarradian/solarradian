import React from 'react';
import { motion } from 'framer-motion';
import Team from './Team';

const About = () => {
  return (
    <>
      {/* Page Header */}
      <div className="w-full bg-gradient-to-r from-imp-text to-orange-300 py-10 mb-10">
        <div className="container xl:max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.h1>
       
        </div>
      </div>

      {/* About Content */}
      <div className="container xl:max-w-7xl mx-auto px-4 space-y-6 mb-3">
        <p>
          <strong>Solar Radian</strong> is a premier renewable energy company specializing in solar rooftop solutions for residential properties, housing societies, and commercial and industrial clients. Backed by a team of seasoned professionals with extensive experience in the renewable energy sector, we are committed to advancing the solar energy industry.
        </p>

        <p>
          Founded with a vision for a greener future, Solar Radian believes in the transformative power of renewable energy to shape India’s bright future. Our mission is to be a leading, innovative, and quality-focused solar energy company, offering sustainable solutions to meet diverse energy needs. We handle projects for both individual clients and large corporations, with the goal of becoming one of India’s top five solar rooftop companies.
        </p>

        <p>
          Our designs expertly blend rooftop solar solutions with the aesthetic appeal of your property, enhancing both style and functionality. We revolutionize residential solar by providing distinctive structures that set new standards, empowering homeowners to make smarter, more stylish, and sustainable choices, ultimately achieving energy independence.
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li><strong>Experienced and Qualified Team:</strong> Skilled professionals ensuring top-notch service.</li>
          <li><strong>Complimentary Services:</strong> Free site survey, system design, and financial analysis to support your solar investment.</li>
          <li><strong>Efficient Installation:</strong> Quick and hassle-free installation process.</li>
          <li><strong>Long-Term Assurance:</strong> 25-year power warranty on solar panels.</li>
          <li><strong>Comprehensive After-Sales Support:</strong> Ongoing service and support.</li>
        </ul>

        <p>
          At Solar Radian, we simplify the solar journey by offering competitive pricing and ensuring you interact only with us and our vetted installers. We make purchasing solar solutions straightforward with easy financing options and convenient loan servicing. Our dedication to high quality guarantees you receive the best solar solutions available, along with lifetime support for your peace of mind.
        </p>

        {/* Mission, Vision, Values */}
        <div className="mt-10 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">Our Mission</h2>
            <p className='text-center'>
              Our mission at Solar Radian is to deliver exceptional products and services to our clients while advancing the solar energy industry. We strive to make clean and reliable energy available to all.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">Our Vision</h2>
          <p className='text-center'>
              We aim to establish ourselves as a distinguished leader in the solar energy industry. Our vision is to create a lasting legacy of growth and innovation for the future.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">Our Values</h2>
          <p className='text-center'> 
              Our core values of integrity, accountability, teamwork, innovation, and partnership drive our mission to expand the solar industry globally.
            </p>
          </div>
        </div>
      </div>
      <Team/>
    </>
  );
};

export default About;
