import React, { useEffect, useState } from "react";
import quote from '../assets/quote.jpg'
import { motion } from "framer-motion";
const FreeQuote = () => {
 

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
            Free Quote
          </motion.h1>
       
        </div>
      </div>

      {/* Quote Section */}
      <section className="container mx-auto my-16 px-4">
        <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left Image */}
          <div className="relative h-[400px] md:h-auto">
            <img
              src={quote}
              alt="Quote"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="p-8">
            <h6 className="text-blue-600 font-semibold">Free Quote</h6>
            <h1 className="text-3xl font-bold mb-4">Get A Free Visit</h1>
            <p className="mb-6 text-gray-600">
              India's trusted solar expert offering stylish, sustainable and
              affordable rooftop solutions with lifetime support.
            </p>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border rounded-md p-3 w-full"
                required
              />
              <input
                type="text"
                placeholder="Your Mobile"
                className="border rounded-md p-3 w-full"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border rounded-md p-3 w-full"
                required
              />
              <input
                type="text"
                placeholder="Your Address"
                className="border rounded-md p-3 w-full"
                required
              />
              <select className="border rounded-md p-3 w-full" required>
                <option>Select Project Type</option>
                <option>On Grid</option>
                <option>Off Grid</option>
                <option>Hybrid</option>
              </select>
              <input
                type="number"
                placeholder="Capacity (kW)"
                className="border rounded-md p-3 w-full"
                required
              />
              <textarea
                placeholder="Additional Remarks"
                rows="3"
                className="border rounded-md p-3 w-full col-span-2"
              ></textarea>
              <button
                type="submit"
                className="col-span-2 bg-imp-text text-white py-3 rounded-md hover:bg-orange-300 duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

    
    </>
  );
};

export default FreeQuote;
