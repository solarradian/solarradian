import React from "react";
import { motion } from "framer-motion";
import { Sun, Building2, Zap, Home, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DelhiSolarPolicy = () => {
     const navigate = useNavigate();
  return (
   
    <div className="bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-imp-text to-orange-300 py-12 text-center text-white shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold"
        >
          Delhi Solar Policy 2023
        </motion.h1>
        <p className="mt-2 text-lg">Powering Delhi’s Green Future with Solar Radian</p>
      </section>

      {/* Policy Overview */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-orange-400 mb-4">🔆 Policy Overview</h2>
        <p className="text-gray-700 mb-4">
          The <strong>Delhi Solar Energy Policy 2023</strong>, officially effective from <strong>14th March 2024</strong>,
          aims to accelerate the adoption of rooftop solar across the National Capital Territory of Delhi.
          Implemented by the <strong>EE & REM Centre, Department of Power, GNCTD</strong>, this forward-looking policy encourages every homeowner,
          institution, and business to embrace clean solar power and contribute to Delhi’s sustainable future.
        </p>

        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li><strong>Policy Launch Date:</strong> 14th March 2024</li>
          <li><strong>Implementing Authority:</strong> EE & REM Centre, Department of Power, GNCTD</li>
          <li><strong>Policy Validity:</strong> 3 years (up to 13th March 2027)</li>
          <li><strong>Minimum Eligible Capacity:</strong> 1 kWp and above</li>
          <li><strong>Target Capacity:</strong> 750 MW of cumulative rooftop solar within 3 years</li>
        </ul>
      </section>

      {/* Models for Consumers with Limited Roof Space */}
      <section className="max-w-6xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-orange-400 mb-4">
          🏢 Models for Consumers with Limited Roof Space
        </h2>
        <p className="text-gray-700 mb-4">
          The Delhi Solar Policy offers flexible participation models for consumers with limited rooftop space:
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg"><CheckCircle2 className="inline mr-2 text-green-600" /> Group Net Metering (GNM)</h3>
            <p className="text-gray-700">Offset surplus solar energy exported from one property against electricity used at other connections under the same DISCOM.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg"><CheckCircle2 className="inline mr-2 text-green-600" /> Community Solar Model</h3>
            <p className="text-gray-700">Ideal for those without rooftops — own a share in a community solar project and receive energy credits accordingly.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg"><CheckCircle2 className="inline mr-2 text-green-600" /> Peer-to-Peer (P2P) Energy Trading</h3>
            <p className="text-gray-700">Buy and sell solar power directly via a digital trading platform — ensuring real-time, transparent energy exchange.</p>
          </div>
        </div>
      </section>

      {/* Models for Consumers with Capital Constraints */}
      <section className="max-w-6xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-orange-400 mb-4">💸 Models for Consumers with Capital Constraints</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg"><Zap className="inline mr-2 text-orange-400 " /> RESCO Model</h3>
            <p className="text-gray-700">A third-party investor installs and maintains the solar system — you pay only for the electricity you consume at a fixed tariff.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg"><Zap className="inline mr-2 text-orange-400 " /> Hybrid RESCO Model</h3>
            <p className="text-gray-700">The developer leases your rooftop and sells generated solar power to DISCOM via PPA, while you enjoy net-metering benefits.</p>
          </div>
        </div>
      </section>

      {/* Incentives */}
      <section className="max-w-6xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-orange-400 mb-4">💰 Incentives under Delhi Solar Energy Policy 2023</h2>

        <h3 className="font-semibold text-lg mb-2">1. Generation-Based Incentive (GBI)</h3>
        <p className="text-gray-700 mb-3">
          GBI is provided for five years from commissioning (if commissioned within the policy period):
        </p>

        <table className="min-w-full border text-gray-700 mb-4">
          <thead className="bg-orange-100">
            <tr>
              <th className="p-2 border">Consumer Type</th>
              <th className="p-2 border">GBI Rate (₹/kWh)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2 border">Residential (up to 3 kW)</td><td className="p-2 border">₹3</td></tr>
            <tr><td className="p-2 border">Residential (3–10 kW)</td><td className="p-2 border">₹2</td></tr>
            <tr><td className="p-2 border">Group Housing / RWAs (up to 500 kW)</td><td className="p-2 border">₹2</td></tr>
            <tr><td className="p-2 border">Commercial & Industrial (first 200 MW)</td><td className="p-2 border">₹1</td></tr>
          </tbody>
        </table>

        <h3 className="font-semibold text-lg mb-2">2. Capital Subsidy</h3>
        <p className="text-gray-700">
          Residential consumers can avail ₹10,000 per kW (max ₹30,000) state subsidy — in addition to the central subsidy under PM Surya Ghar Muft Bijli Yojana.
        </p>
      </section>

      {/* Additional Provisions */}
      <section className="max-w-6xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-orange-400 mb-4">⚙️ Additional Provisions & Highlights</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Exemption from Electrical Inspector approval for systems up to 500 kVA.</li>
          <li>Mandatory solar for government buildings with rooftop area over 500 sq.m.</li>
          <li>Compulsory rooftop solar for all new buildings under UBBL guidelines.</li>
          <li>Formation of Apex Committee led by Minister of Power, GNCTD.</li>
          <li>Creation of a dedicated “Delhi Solar Cell” to support implementation.</li>
          <li>Priority for solarization in government buildings under IPGCL.</li>
        </ul>
      </section>

      {/* How to Go Solar */}
      <section className="max-w-6xl mx-auto px-6 py-10 text-center bg-orange-50 rounded-2xl shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-orange-400 mb-6">☀️ How to Go Solar in Delhi with Solar Radian</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-4 bg-white rounded-xl shadow">
            <Home className="text-orange-400 w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-2">Step 1: Free Site Survey</h3>
            <p>Book a free site survey to assess your rooftop suitability and solar potential.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow">
            <Building2 className="text-orange-400 w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-2">Step 2: Get a Proposal</h3>
            <p>Our experts share a detailed solar proposal showing your savings and ROI before you approve.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow">
            <Sun className="text-orange-400 w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-2">Step 3: Installation & Commissioning</h3>
            <p>Our MNRE-certified team installs and commissions your system in 4–6 weeks.</p>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="text-center py-10 text-gray-600">
        🌍 <strong>Solar Radian</strong> — Empowering Delhi with Clean Energy under the Delhi Solar Energy Policy 2023.
        <br/>
        <button onClick={() => navigate("/freequote")} className=" bg-imp-text rounded-full py-2 px-3 text-white hover:bg-orange-300 duration-200">Free Quote</button>
      </footer>
    </div>
  );
};

export default DelhiSolarPolicy;
