import React from "react";

const PmsuryaGhar = () => {
  return (
    <div>
      {/* Page Header */}
       <div className="w-full bg-gradient-to-r from-imp-text to-orange-300 py-10 mb-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-slideInDown">
            PM Surya Ghar
          </h1>
          {/* Breadcrumb (optional) */}
          {/* <nav aria-label="breadcrumb">
            <ol className="flex justify-center space-x-2 text-white">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li>/</li>
              <li><a href="#" className="hover:underline">Pages</a></li>
              <li>/</li>
              <li className="font-semibold">PM Solar Yojana</li>
            </ol>
          </nav> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-5">
          PM – Surya Ghar: Muft Bijli Yojana
        </h2>
        <p className="mb-6 leading-relaxed">
          Launched on <strong>29th February 2024</strong> by the Ministry of New
          and Renewable Energy (MNRE), the PM Surya Ghar: Muft Bijli Yojana aims
          to empower <strong>1 crore households</strong> by enabling them to
          install rooftop solar and receive up to{" "}
          <strong>300 units/month of free electricity</strong>. The scheme has
          an outlay of ₹75,021 crore and runs until FY 2026-27.
        </p>

        <h4 className="text-xl font-semibold mb-3">Key Objectives:</h4>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Install 1 crore rooftop solar systems in the residential sector.</li>
          <li>Provide free/low-cost electricity up to 300 units/month.</li>
          <li>
            Generate 1,000 billion units of renewable electricity and reduce 720
            million tons of CO₂eq over 25 years.
          </li>
          <li>
            Develop a comprehensive ecosystem including vendors, O&M, and
            regulatory support.
          </li>
          <li>Generate local employment and enhance energy security.</li>
          <li>
            Achieve 30 GW rooftop solar capacity under India’s NDCs by 2026-27.
          </li>
        </ul>

        <h4 className="text-xl font-semibold mb-3">Subsidy Structure:</h4>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong>First 2 kWp:</strong> ₹30,000/kWp
          </li>
          <li>
            <strong>Next 1 kWp:</strong> ₹18,000/kWp
          </li>
          <li>
            <strong>Beyond 3 kWp:</strong> No CFA
          </li>
          <li>
            <strong>GHS/RWA:</strong> ₹18,000/kWp for common facilities (up to
            500 kWp)
          </li>
        </ul>

        <h4 className="text-xl font-semibold mb-3">Example Calculations:</h4>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>1.5 kW → ₹30,000 × 1.5 = ₹45,000</li>
          <li>2.5 kW → ₹30,000 × 2 + ₹18,000 × 0.5 = ₹69,000</li>
          <li>6 kW → ₹30,000 × 2 + ₹18,000 × 1 = ₹78,000</li>
          <li>RWA (100 kW, 20 homes) → ₹18,000 × 60 = ₹10,80,000</li>
        </ul>

        <h4 className="text-xl font-semibold mb-3">Application Steps:</h4>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>
            Register on the{" "}
            <a
              href="https://pmsuryaghar.gov.in"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              PM Suryaghar Portal
            </a>
          </li>
          <li>Choose a vendor or apply yourself.</li>
          <li>Submit application details – discom, consumer number, etc.</li>
          <li>Get feasibility approval and submit bank details.</li>
          <li>Vendor installs system; DISCOM inspects and certifies.</li>
          <li>Request and receive subsidy through the portal.</li>
        </ol>

        <p className="mt-4">
          🔗 <strong>Apply Now:</strong>{" "}
          <a
            href="https://pmsuryaghar.gov.in"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://pmsuryaghar.gov.in
          </a>
        </p>
      </div>
    </div>
  );
};

export default PmsuryaGhar;
