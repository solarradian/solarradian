import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen contaniner xl:max-w-7xl bg-green-50 px-4 py-16">
      
      {/* Super Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md mb-4">Let's Connect</h1>
        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
          We’d love to hear from you! Whether you have a question about services, pricing, location, or anything else,
          our team is ready to answer all your questions.
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="bg-white p-10 rounded-2xl shadow-2xl"
        >
          <motion.h2
            className="text-3xl font-bold text-center text-[#20AF24] mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            🌿 Get in Touch
          </motion.h2>

          <form className="space-y-6">
            {/* Name */}
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20AF24] transition-all duration-200"
              />
            </motion.div>

            {/* Email */}
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20AF24] transition-all duration-200"
              />
            </motion.div>

            {/* Phone */}
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.45 }}>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 12345 67890"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20AF24] transition-all duration-200"
              />
            </motion.div>

            {/* Subject */}
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20AF24] transition-all duration-200"
              />
            </motion.div>

            {/* Message */}
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.55 }}>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="5"
                placeholder="Type your message here..."
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20AF24] transition-all duration-200"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[#20AF24] hover:bg-[#17861c] text-white px-6 py-3 rounded-xl shadow-md transition-all duration-200"
              >
                ✉️ Send Message
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Map Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}
          className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl"
        >
          <iframe
            title="Ashirwad Complex, Noida"
            src="https://www.google.com/maps?q=S.N+2,+2nd+Floor,+Ashirwad+Complex,+Sector+53,+Noida&output=embed"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="rounded-xl"
          ></iframe>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
