import React from "react";
import { FaSun, FaRegFileAlt } from "react-icons/fa";

const DelhiSolarRegulationAndGuidlines = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-imp-text to-orange-300 py-10 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-3">
            <FaSun className="text-yellow-200" /> Delhi Solar Regulations & Guidelines
          </h1>
          <p className="mt-4 text-white text-lg md:text-xl">
            Everything you need to know about rooftop solar in Delhi.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Delhi has been actively promoting renewable energy through the <strong>Delhi Solar Energy Policy 2023</strong>. 
            The policy encourages rooftop solar installations for residential, commercial, and government buildings 
            to reduce reliance on conventional energy sources.
          </p>
        </section>

        {/* Key Highlights */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Key Highlights</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Subsidies:</strong> ₹10,000 per kW, capped at ₹30,000 for systems up to 3 kW.</li>
            <li><strong>Generation-Based Incentives:</strong> ₹3/unit (up to 3 kW) & ₹2/unit (3–5 kW) for 5 years.</li>
            <li><strong>Net Metering:</strong> Export surplus energy to the grid and receive credits.</li>
            <li><strong>Group & Virtual Net Metering:</strong> Share solar energy among multiple connections.</li>
            <li><strong>Empanelled Vendors:</strong> Installation must be done by government-approved vendors.</li>
            <li><strong>Safety Compliance:</strong> Systems must adhere to fire and safety standards.</li>
          </ul>
        </section>

        {/* Installation Process */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Installation & Approval Process</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Select an empanelled vendor for your rooftop solar system.</li>
            <li>Apply online for net metering with your respective DISCOM (BSES, NDMC, TPDDL).</li>
            <li>DISCOM performs site assessment and feasibility study.</li>
            <li>Install the system as per approved design.</li>
            <li>DISCOM inspects and commissions the system.</li>
            <li>Start generating solar power and export surplus to the grid.</li>
          </ol>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Achievements</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Over 17,000 rooftop solar installations completed as of 2025.</li>
            <li>Government plans to solarize nearly 1,000 government buildings, adding 60 MW capacity.</li>
          </ul>
        </section>

        {/* Downloadable Guidelines */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Guidelines</h2>
          <a
            href="https://solar.delhi.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition"
          >
            <FaRegFileAlt className="mr-2" />Delhi Solar Portal
          </a>
        </section>
      </div>
    </div>
  );
};

export default DelhiSolarRegulationAndGuidlines;
