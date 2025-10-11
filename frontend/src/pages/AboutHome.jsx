import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AboutHome = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-imp-text to-orange-300 py-10 mb-10">
        <div className="container xl:max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            About Solar Radian
          </motion.h1>
        </div>
      </div>

      {/* Short About Section */}
      <div className="container xl:max-w-7xl mx-auto px-4 space-y-4 mb-6 text-gray-700">
        <p>
          <strong>Solar Radian</strong> is a trusted name in solar energy, delivering efficient rooftop solar
          solutions for homes, businesses, and industries. We aim to simplify the solar journey with
          reliable service, innovative designs, and lifetime support.
        </p>

        <p>
          Our experienced team ensures quick installation, free site surveys, and long-term warranties,
          making clean energy accessible and affordable for everyone.
        </p>

        <div className="mt-6 flex justify-center items-center">
          <button
            onClick={() => navigate('/about')}
            className="bg-imp-text hover:bg-orange-300 text-white font-semibold py-2 px-6 rounded-full transition-all duration-200"
          >
            Read More
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutHome;
