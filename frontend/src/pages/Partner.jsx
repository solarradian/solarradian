import { useState } from "react";
import { motion } from "framer-motion";

const Partner = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    experience: "",
    address: "",
    area: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: send data to backend (API or PHP)
  };

  // Animations
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div>
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-imp-text to-orange-300 py-10 mb-10">
        <div className="container xl:max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Become a Partner
          </motion.h1>
       
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-5xl mx-auto px-4 pb-16 border border-gray-600 p-4 rounded-md">
        <motion.p
          className="text-lg mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}

        >
          Be a part of the renewable energy revolution! Collaborate with us to
          deliver innovative solar solutions and build a sustainable future
          together.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {/* Name */}
          <motion.div variants={fadeUp}>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition transform hover:scale-[1.02]"
              placeholder="Your Name"
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp}>
            <label className="block text-sm font-medium mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition transform hover:scale-[1.02]"
              placeholder="Your Email"
            />
          </motion.div>

          {/* Mobile */}
          <motion.div variants={fadeUp}>
            <label className="block text-sm font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              pattern="[0-9]{10}"
              required
              value={formData.mobile}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition transform hover:scale-[1.02]"
              placeholder="10-digit Mobile Number"
            />
          </motion.div>

          {/* Experience */}
          <motion.div variants={fadeUp}>
            <label className="block text-sm font-medium mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition transform hover:scale-[1.02]"
              placeholder="Years of Experience"
            />
          </motion.div>

          {/* Address */}
          <motion.div variants={fadeUp}>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition transform hover:scale-[1.02]"
              placeholder="Address"
            />
          </motion.div>

          {/* Area */}
          <motion.div variants={fadeUp}>
            <label className="block text-sm font-medium mb-1">
              Targeted Area for Rooftop Solar
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition transform hover:scale-[1.02]"
              placeholder="Targeted Area"
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition transform hover:scale-[1.02]"
              placeholder="Your Message"
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={fadeUp}
            className="md:col-span-2 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="submit"
              className="bg-imp-text text-white font-semibold px-6 py-3 rounded-md shadow-lg transition"
            >
              Send Message
            </button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default Partner;
