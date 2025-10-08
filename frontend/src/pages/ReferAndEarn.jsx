import { useState } from "react";
import { motion } from "framer-motion";

const ReferAndEarn = () => {
  const [formData, setFormData] = useState({
    your_name: "",
    your_mobile: "",
    friend_name: "",
    friend_mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Referral Data:", formData);
    // TODO: send data to backend (API or PHP)
  };

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
      {/* Page Header */}
      <div className="w-full bg-gradient-to-r from-imp-text to-orange-300 py-10 mb-10">
        <motion.div
        className="w-full "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Refer & Earn
          </h1>
        </div>
      </motion.div>

      </div>


      
      {/* Referral Info + Form */}
      <section className="max-w-6xl mx-auto my-12 px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column */}
        <motion.div
          className="md:col-span-7"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
          <p className="text-gray-700 mb-3">
            At <strong>Solar Radian</strong>, we appreciate and reward our
            customers who help us expand our reach. Our Referral Program offers
            exciting incentives for every successful solar installation you
            refer.
          </p>
          <p className="text-gray-700 mb-3">
            Simply refer a friend, family member, or colleague interested in
            going solar. Once their installation is completed, you’ll receive a{" "}
            <strong>financial reward</strong>.
          </p>
          <p className="text-gray-700 mb-3">
            By participating, you’re not only earning, but also helping your
            network save on energy and supporting a greener planet.
          </p>

          <ul className="space-y-2 mb-5">
            {[
              "Earn rewards for successful referrals",
              "Simple and hassle-free referral process",
              "Help your network save on energy bills",
              "Support a greener planet",
              "Unlimited referral opportunities",
              "Transparent tracking of referral progress",
              "Extra incentives for multiple referrals",
            ].map((item, i) => (
              <li key={i} className="flex items-center text-gray-700">
                <i className="fa fa-check text-green-500 mr-2"></i>
                {item}
              </li>
            ))}
          </ul>

          <p className="font-bold text-green-600">
            Refer and win exciting prizes!
          </p>
        </motion.div>

        {/* Right Column: Referral Form */}
        <motion.div
          className="md:col-span-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h6 className="text-gray-800 font-medium">Your Details</h6>
                <div>
                  <label className="block text-sm font-medium">Your Name</label>
                  <input
                    type="text"
                    name="your_name"
                    value={formData.your_name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="your_mobile"
                    value={formData.your_mobile}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <h6 className="text-gray-800 font-medium">Friend's Details</h6>
                <div>
                  <label className="block text-sm font-medium">
                    Friend's Name
                  </label>
                  <input
                    type="text"
                    name="friend_name"
                    value={formData.friend_name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Friend's Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="friend_mobile"
                    value={formData.friend_mobile}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-imp-text text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
                >
                  Submit Referral
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ReferAndEarn;
