import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const RooftopSolarGuide = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 lg:p-12">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-600 mb-6 text-center leading-snug">
          How Rooftop Solar Works: A Simple Guide for Homeowners
        </h1>

        {/* Intro */}
        <p className="text-base sm:text-lg leading-relaxed mb-5">
          A rooftop solar system is a setup where solar panels are installed on
          the roof of your home to capture sunlight and convert it into
          electricity. This electricity can be used to power your household
          appliances, lights, fans, air conditioners, and more.
        </p>
        <p className="text-base sm:text-lg leading-relaxed mb-8">
          You can think of it as generating your own electricity — clean, green,
          and free from the sun.
        </p>

        {/* Section 1: Components */}
        <h2 className="text-xl sm:text-2xl font-semibold text-yellow-600 mb-4">
          1️⃣ Key Components of a Rooftop Solar System
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-8 text-sm sm:text-base">
          <li>
            <strong>Solar Panels:</strong> Capture sunlight and convert it into
            DC (direct current) electricity.
          </li>
          <li>
            <strong>Inverter:</strong> Converts DC power into AC (alternating
            current) electricity for your home.
          </li>
          <li>
            <strong>Net Meter:</strong> Measures both generation and
            consumption.
          </li>
          <li>
            <strong>Mounting Structure:</strong> Holds panels at the best angle
            for maximum sunlight.
          </li>
          <li>
            <strong>Wiring & Safety Equipment:</strong> Connects all components
            and ensures safe operation.
          </li>
        </ul>

        {/* Section 2: Step by Step */}
        <h2 className="text-xl sm:text-2xl font-semibold text-yellow-600 mb-4">
          2️⃣ How It Works – Step-by-Step
        </h2>
        <ol className="list-decimal pl-5 sm:pl-6 space-y-2 mb-8 text-sm sm:text-base">
          <li>Sunlight hits the solar panels on your rooftop.</li>
          <li>The panels convert sunlight into DC electricity.</li>
          <li>The inverter converts DC into AC electricity for home use.</li>
          <li>Your home uses solar power first before drawing from the grid.</li>
          <li>
            Extra electricity is exported to the grid through net metering.
          </li>
          <li>
            At night or on cloudy days, power is automatically drawn from the
            grid.
          </li>
        </ol>

        {/* Section 3: Net Metering */}
        <h2 className="text-xl sm:text-2xl font-semibold text-yellow-600 mb-4">
          3️⃣ What Is Net Metering?
        </h2>
        <p className="leading-relaxed mb-4 text-sm sm:text-base">
          Net metering is a billing system that credits you for the excess
          electricity your solar panels generate and send to the grid. For
          example:
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md text-sm sm:text-base">
          <p>
            🔹 If you use <strong>300 units</strong> and export{" "}
            <strong>200 units</strong>, you’ll be billed for only{" "}
            <strong>100 units</strong>.
          </p>
          <p>This can drastically reduce — even eliminate — your power bill!</p>
        </div>

        {/* Section 4: Suitability */}
        <h2 className="text-xl sm:text-2xl font-semibold text-yellow-600 mb-4">
          4️⃣ Is Rooftop Solar Right for You?
        </h2>
        <p className="mb-3 text-sm sm:text-base">Ask yourself these questions:</p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-8 text-sm sm:text-base">
          <li>Do you have 500–1000 sq. ft. of shade-free rooftop space?</li>
          <li>Are your monthly electricity bills above ₹2,000?</li>
          <li>
            Do you want to reduce your carbon footprint and dependency on the
            grid?
          </li>
        </ul>
        <p className="italic mb-8 text-sm sm:text-base">
          If yes — rooftop solar is a smart, long-term investment for your home.
        </p>

        {/* Section 5: Benefits */}
        <h2 className="text-xl sm:text-2xl font-semibold text-yellow-600 mb-4">
          5️⃣ Benefits of Rooftop Solar
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3 mb-8 text-sm sm:text-base">
          {[
            "Up to 90% lower electricity bills",
            "Government subsidies (up to 40%)",
            "Low maintenance",
            "25+ years panel life",
            "Increases property value",
          ].map((benefit, index) => (
            <li
              key={index}
              className="flex items-center gap-2 bg-yellow-50 p-3 rounded-md shadow-sm"
            >
              <FaCheckCircle className="text-yellow-600 flex-shrink-0" />{" "}
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Section 6: How to Get Started */}
        <h2 className="text-xl sm:text-2xl font-semibold text-yellow-600 mb-4">
          6️⃣ How to Get Started
        </h2>
        <p className="mb-4 leading-relaxed text-sm sm:text-base">
          At <strong>Solar Radian</strong>, we make it simple to switch to
          solar:
        </p>
        <ol className="list-decimal pl-5 sm:pl-6 space-y-2 mb-8 text-sm sm:text-base">
          <li>Free site survey & feasibility check</li>
          <li>Customized system design</li>
          <li>Subsidy application support</li>
          <li>Installation & net metering setup</li>
          <li>Service & maintenance support</li>
        </ol>
        <p className="leading-relaxed text-sm sm:text-base">
          We've helped hundreds of homeowners in Delhi & NCR (Noida, Ghaziabad,
          etc.) make the solar switch — and you could be next!
        </p>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="/contact"
            className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-yellow-600 transition"
          >
            Get a Free Solar Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default RooftopSolarGuide;
