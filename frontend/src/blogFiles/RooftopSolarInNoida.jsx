
import React from "react";

const RooftopSolarInNoida = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-yellow-600">Solar Radian</h1>
          <a
            href="#contact"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600"
          >
            Get Quote
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Rooftop Solar in Noida
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Harness the power of the sun with Solar Radian’s rooftop solar
            solutions in Noida. Lower your electricity bills, earn government
            subsidies, and contribute to a cleaner future.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-gray-700">
            <li>✅ Free site survey across Noida</li>
            <li>✅ End-to-end installation & support</li>
            <li>✅ Subsidy assistance under UP government schemes</li>
            <li>✅ High-efficiency panels with 25-year warranty</li>
          </ul>

          <a
            href="#contact"
            className="inline-block mt-6 bg-yellow-500 text-white px-6 py-3 rounded-md shadow hover:bg-yellow-600"
          >
            Request Free Consultation
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">
            Get a Quick Estimate
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Enter a few details to know your potential savings.
          </p>

          <form className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Monthly Bill (₹)"
              className="w-full px-3 py-2 border rounded"
            />
            <button
              type="button"
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
            >
              Get Estimate
            </button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="bg-yellow-50 border-t border-yellow-100 py-12"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            Ready to Go Solar in Noida?
          </h3>
          <p className="text-gray-600 mt-2">
            Call us at{" "}
            <span className="font-semibold text-yellow-600">
              +91-9876543210
            </span>{" "}
            or request a free quote today.
          </p>

          <a
            href="mailto:contact@solarradian.com"
            className="inline-block mt-4 bg-yellow-500 text-white px-6 py-3 rounded-md shadow hover:bg-yellow-600"
          >
            Email Us
          </a>

          <p className="text-xs text-gray-500 mt-6">
            Serving all sectors of Noida — Residential, Commercial & Industrial.
          </p>
        </div>
      </section>
    </div>
  );
};

export default RooftopSolarInNoida;
