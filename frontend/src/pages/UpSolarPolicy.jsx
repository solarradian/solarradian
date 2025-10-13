import React from "react";
import { motion } from "framer-motion";
import { Sun, Leaf, Building2, Home, Zap, CheckCircle2 } from "lucide-react";
import { Navigate, useNavigate } from 'react-router-dom';

const UpSolarPolicy = () => {

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
          Uttar Pradesh Solar Energy Policy 2022
        </motion.h1>
        <p className="mt-2 text-lg">Empowering Uttar Pradesh with Sustainable Solar Growth</p>
      </section>

      {/* Policy Overview */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-imp-text mb-4">🏡 Policy Overview</h2>
        <p className="text-gray-700 mb-4">
          The <strong>Uttar Pradesh Solar Energy Policy 2022</strong> aims to transform the state into a solar hub by promoting installations across all sectors — residential, commercial, industrial, and agricultural. 
          Implemented by <strong>UPNEDA (Uttar Pradesh New & Renewable Energy Development Agency)</strong>, the policy supports both rooftop and ground-mounted projects to achieve a cleaner energy mix.
        </p>

        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li><strong>Applicable Till:</strong> 2027</li>
          <li><strong>Implementing Agency:</strong> Uttar Pradesh New & Renewable Energy Development Agency (UPNEDA)</li>
          <li><strong>Total Target:</strong> 22 GW (including 4.5 GW from rooftop solar)</li>
        </ul>
      </section>

      {/* Key Features */}
      <section className="max-w-6xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-imp-text mb-4">🔹 Key Features</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Encourages solar installations across residential, commercial, and agricultural sectors.</li>
          <li>Promotes RESCO, Open Access, Energy Banking, and Group/Net Metering models.</li>
          <li>Exemption from rooftop construction permission — solar structures under 4.5m not included in building height.</li>
          <li>No inspection required by the State Electrical Inspector for grid-connected solar systems up to 10 kW.</li>
        </ul>
      </section>

      {/* Subsidy Structure */}
      <section className="max-w-6xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-imp-textmb-4">💰 Subsidy Structure</h2>

        <h3 className="font-semibold text-lg text-gray-800 mb-2">Residential Sector</h3>
        <ul className="list-disc ml-6 text-gray-700 space-y-1 mb-4">
          <li>State subsidy up to ₹30,000 per consumer.</li>
          <li>Central Financial Assistance (CFA) up to ₹78,000 from MNRE.</li>
          <li>Net metering allowed for systems between 1 kW and 2 MW.</li>
        </ul>

        <h3 className="font-semibold text-lg text-gray-800 mb-2">Commercial / Industrial Sector</h3>
        <ul className="list-disc ml-6 text-gray-700 space-y-1 mb-4">
          <li>100% electricity duty exemption for 10 years.</li>
          <li>Full annual energy banking permitted.</li>
          <li>Creation of land banks for private and public solar parks.</li>
          <li>50% waiver on wheeling and transmission charges.</li>
        </ul>

        <h3 className="font-semibold text-lg text-gray-800 mb-2">Open Access Projects</h3>
        <ul className="list-disc ml-6 text-gray-700 space-y-1 mb-4">
          <li>100% power sale allowed to third parties.</li>
          <li>100% stamp duty exemption for land used for solar projects.</li>
          <li>Standard land lease rate: ₹15,000 per acre per year for 30 years.</li>
          <li>50% waiver on wheeling and cross-subsidy charges.</li>
        </ul>

        <h3 className="font-semibold text-lg text-gray-800 mb-2">Agricultural Sector</h3>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Under PM-KUSUM, 60–70% subsidy on solar pumps (depending on farmer category).</li>
          <li>Government support for transmission line costs in Bundelkhand and Purvanchal regions.</li>
        </ul>
      </section>

      {/* Benefits Summary */}
      <section className="max-w-6xl mx-auto px-6 py-8 bg-green-50 rounded-2xl shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-imp-text mb-6">🌞 Benefits for Consumers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-4 bg-white rounded-xl shadow text-center">
            <Sun className="text-orange-300  w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold">Lower Electricity Bills</h3>
            <p className="text-sm text-gray-600">Save up to 80% on energy bills with rooftop solar.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow text-center">
            <Zap className="text-orange-300  w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold">Subsidy + Tax Benefits</h3>
            <p className="text-sm text-gray-600">Get dual benefits from state and central government incentives.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow text-center">
            <Building2 className="text-orange-300  w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold">Industrial Growth</h3>
            <p className="text-sm text-gray-600">Waivers on transmission, wheeling, and energy banking charges.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow text-center">
            <Leaf className="text-orange-300 w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold">Clean & Green Energy</h3>
            <p className="text-sm text-gray-600">Support UP’s goal of becoming India’s renewable powerhouse.</p>
          </div>
        </div>
      </section>

      {/* How to Go Solar with Solar Radian */}
      <section className="max-w-6xl mx-auto px-6 py-10 text-center bg-white rounded-2xl shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-imp-text mb-6">☀️ How to Go Solar in Uttar Pradesh with Solar Radian</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-4 bg-green-50 rounded-xl shadow">
            <Home className="text-imp-text w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-2">Step 1: Free Site Survey</h3>
            <p>Book a site visit and get an assessment of your rooftop and energy potential.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl shadow">
            <Building2 className="text-imp-text w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-2">Step 2: Customized Proposal</h3>
            <p>We’ll provide an ROI-focused proposal with savings and subsidy details.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl shadow">
            <Sun className="text-imp-text w-8 h-8 mb-2" />
            <h3 className="font-semibold mb-2">Step 3: Installation & Commissioning</h3>
            <p>Get your solar system installed within 4–6 weeks with MNRE-certified standards.</p>
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

export default UpSolarPolicy;
