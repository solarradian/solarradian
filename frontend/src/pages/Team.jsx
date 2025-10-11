import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { motion } from 'framer-motion';

// Import team member images
import swati from "../assets/swatimam.jpg";
import team01 from "../assets/Team01.jpg";
import den2 from "../assets/den2.png";
import mohasim from "../assets/mohasim.jpg";
import rakesh from "../assets/rakesh.jpg";
import jubair from "../assets/Jubair.jpg";
import shubham from "../assets/shubham.jpg";

const Team = () => {

  const teamMembers = [
    { id: 1, img: swati, name: "Swati", role: "CEO and Founder" },
    { id: 2, img: team01, name: "Mohd Salman", role: "Project Head" },
    { id: 3, img: den2, name: "Anmol Kumar", role: "Admin Executive" },
    { id: 4, img: mohasim, name: "Mo Hasim", role: "Software Engineer" },
    { id: 5, img: rakesh, name: "Rakesh Kumar", role: "Business Head" },
    { id: 6, img: jubair, name: "Mohd Jubair", role: "Sales Exicutive" },
    { id: 7, img: shubham, name: "Shubham Kumar", role: "Sales Executive" },
  ];

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
            Our Team
          </motion.h1>
       
        </div>
      </div>
      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h6 className="text-blue-600 uppercase font-semibold">Team Member</h6>
        <h1 className="text-3xl md:text-4xl font-bold mb-10">
          Experienced Team Members
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                    className="w-full h-72 object-cover object-top"
                  src={member.img}
                  alt={member.name}
                />
                {/* Social Icons */}
                <div className="absolute top-3 right-3 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                  <a
                    href="#"
                    className="bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="#"
                    className="bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h5 className="text-lg font-semibold">{member.name}</h5>
                <span className="text-gray-600">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;
