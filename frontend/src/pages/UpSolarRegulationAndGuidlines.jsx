import React from "react";
import { FaSun, FaRegFileAlt } from "react-icons/fa";

const UpSolarRegulationAndGuidlines = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-imp-text to-orange-300 py-12 shadow-md">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-3">
            <FaSun className="text-yellow-200" /> Uttar Pradesh Solar Regulations & Guidelines
          </h1>
          <p className="mt-4 text-white text-lg md:text-xl">
            Official guidelines for rooftop solar adoption in Uttar Pradesh.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            Uttar Pradesh is actively promoting renewable energy through the <strong>Uttar Pradesh Solar Energy Policy 2022</strong>. 
            The policy aims to achieve 22,000 MW of solar power by 2026–27, with a focus on rooftop solar installations for residential, commercial, and government buildings.
          </p>
        </section>

        {/* Residential Rooftop Scheme */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Residential Rooftop Scheme</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 pl-4">
            <li><strong>Subsidy:</strong> ₹15,000 per kW, up to ₹30,000 per consumer, in addition to central assistance.</li>
            <li><strong>Net Metering:</strong> Export surplus energy to the grid.</li>
            <li><strong>Implementation:</strong> Managed under "Saurya Uttar Pradesh Yojna".</li>
          </ul>
        </section>

        {/* Non-Residential Institutions */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Non-Residential Institutions</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 pl-4">
            <li>Deployment of rooftop solar plants for captive/self-consumption.</li>
            <li>Net metering arrangements facilitated through district solar cells.</li>
          </ul>
        </section>

        {/* Implementation & Governance */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Implementation & Governance</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 pl-4">
            <li><strong>UPNEDA:</strong> Nodal agency responsible for policy implementation.</li>
            <li><strong>District Solar Cells:</strong> Support rooftop solar installations under Chief District Officer leadership.</li>
          </ul>
        </section>

        {/* Download Official Guidelines */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Download Official Guidelines</h2>
          <a
            href="https://solarcitiesportal.upneda.org.in/images/Uttar_Pradesh_Solar_Energy_Policy2022_English.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
          >
            <FaRegFileAlt className="mr-2" /> Download PDF (English)
          </a>
          <br />
          <a
            href="https://solar.upneda.in/?page_id=148"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
          >
            <FaRegFileAlt className="mr-2" /> Download PDF (Hindi)
          </a>
        </section>
      </div>
    </div>
  );
};

export default UpSolarRegulationAndGuidlines;
