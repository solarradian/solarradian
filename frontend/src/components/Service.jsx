import { motion } from "framer-motion";
import { FaSolarPanel, FaArrowRight } from "react-icons/fa";
import s1 from '../assets/s-1.jpg'
import s2 from '../assets/s-2.jpg'
import s3 from '../assets/s-3.jpg'
import { Link } from 'react-router-dom';
const services = [
  {
    id: 1,
    title: "Residential Rooftop Solar",
    description:
      "Residential rooftop solar systems offer homeowners an effective way to cut electricity expenses while promoting sustainability.",
    img: s1,
    link: "/rooftopsolar",
    delay: 0.1,
  },
  {
    id: 2,
    title: "Solar Rooftop in Housing Societies",
    description:
      "Implementing solar rooftop systems in housing societies offers collective advantages for all residents, reducing energy costs.",
    img: s2,
    link: "/rooftopsolar",
    delay: 0.3,
  },
  {
    id: 3,
    title: "Solar Rooftop for Commercial & Industrial",
    description:
      "Commercial and industrial enterprises can reap significant benefits from installing solar rooftop systems, including substantial reductions in energy costs.",
    img: s3,
    link: "/rooftopsolar",
    delay: 0.5,
  },
];

const  Service = () => {
  return (
    <section className="py-16 bg-gray-50">

         <div className="w-full bg-gradient-to-r from-imp-text to-orange-300 py-10 mb-10">
            <div className="container xl:max-w-7xl mx-auto px-4 text-center">
              <motion.h1
                className="text-4xl sm:text-5xl font-bold text-white mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                Our Services
              </motion.h1>
           
            </div>
          </div>

      <div className="max-w-6xl mx-auto px-6 py-5">
        {/* Section Heading */}
      
        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: service.delay, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              <div className="relative p-6">
                {/* Icon */}
                <div className="absolute -top-8 left-6 bg-primary text-white p-3 rounded-full shadow-lg bg-imp-text">
                  <FaSolarPanel className="text-3xl" />
                </div>

                {/* Content */}
                <h4 className="text-xl font-semibold mt-6 mb-3">
                  {service.title}
                </h4>
                <p className="text-gray-600 mb-4">{service.description}</p>

                {/* Button */}
                <Link to={service.link}
                  className="inline-flex text-white items-center px-5 py-2  rounded-full hover:bg-orange-300 bg-imp-text transition"
                >
                  Read More
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Service;