import React from "react";
import { FaBuilding, FaBolt, FaRupeeSign, FaCheckCircle, FaFileInvoice, FaHandshake } from "react-icons/fa";

const SolarForSocieties = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-imp-text to-orange-300 py-10 text-center text-white shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold">
          Solar for Apartments and Societies: Is It Possible?
        </h1>
        <p className="mt-3 text-base max-w-3xl mx-auto">
          High-rise apartments and housing societies can also benefit from rooftop solar. Learn how to go solar for your society in Delhi or Uttar Pradesh.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">

        {/* Intro */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-base leading-relaxed">
            While individual houses get direct rooftop access, societies can install a common solar system on the terrace through Residential Welfare Associations (RWAs) or builders. 
          </p>
          <p className="text-base mt-3 leading-relaxed">
            The electricity generated can power common areas, shared facilities, or even be distributed among flats via sub-metering or net metering (depending on DISCOM policies).
          </p>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2 mb-4">
            <FaBuilding /> Yes, Societies Can Go Solar — Here's How
          </h2>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>Power common area loads: lifts, lights, pumps, security systems</li>
            <li>Supply shared facilities: clubhouse, gym, parking areas</li>
            <li>Distributed among flats via sub-metering or net metering (based on DISCOM policy)</li>
          </ul>
        </section>

        {/* Types of Solar Setups */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Types of Solar Setups for Apartments</h2>
          <div className="space-y-6 text-base">
            <div>
              <h3 className="font-semibold text-lg mb-2">Common Load Solar System (Most Popular)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Powers only common facilities</li>
                <li>Benefits all residents by reducing monthly maintenance charges</li>
                <li>Ideal for both old and new societies</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Individual Meter-Based Systems (Less Common)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Individual flats install solar and connect to their own meter</li>
                <li>Challenging due to limited access to rooftop area and wiring constraints</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Virtual Net Metering / Group Net Metering</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Electricity generated at one point (society rooftop) adjusted against multiple meters</li>
                <li>Available in Delhi (Group & Virtual Net Metering policy)</li>
                <li>UP is exploring this model in select zones</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2 mb-4">
            <FaCheckCircle /> Key Benefits of Solar for Societies
          </h2>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>Lower monthly maintenance bills</li>
            <li>25+ years of free electricity for common areas</li>
            <li>Eligible for Central Govt subsidy under PM Surya Ghar Yojana</li>
            <li>Eligible for Delhi Govt subsidy under PM Surya Ghar Yojana</li>
            <li>Improves property value and green image</li>
            <li>Extra power can be exported to the grid as a source of income</li>
          </ul>
        </section>

        {/* Challenges Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Common Challenges (And Solutions)</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-base border border-gray-200">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Challenge</th>
                  <th className="border px-4 py-2 text-left">Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Rooftop space availability</td>
                  <td className="border px-4 py-2">Conduct a site survey to optimize panel layout</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">Cost-sharing among residents</td>
                  <td className="border px-4 py-2">Form a Solar Committee and decide on cost-sharing or reserve usage</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Lack of awareness</td>
                  <td className="border px-4 py-2">Organize a solar awareness meeting with residents</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-4 py-2">DISCOM approval and net metering</td>
                  <td className="border px-4 py-2">Let your solar installer handle documentation and approvals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Policies */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Solar in Delhi & UP: Policies</h2>
          <div className="grid md:grid-cols-2 gap-6 text-base">
            {/* Delhi */}
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Delhi</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Group/Virtual Net Metering allowed</li>
                <li>DISCOMs: BRPL, BYPL, TPDDL, NDMC support society solar</li>
                <li>Central Govt: 40% subsidy up to 3 kW per flat (cumulative 500 kW)</li>
                <li>Delhi Govt subsidy for systems up to 3 kW per flat (cumulative 500 kW)</li>
              </ul>
            </div>
            {/* UP */}
            <div className="border border-gray-200 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Uttar Pradesh</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>UPNEDA supports solar for group housing under net metering</li>
                <li>Up to 500 kW capacity can be installed on society roofs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Savings Example */}
        <section className="bg-white rounded-2xl shadow-md p-6 text-base">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Example: What Your Society Could Save</h2>
          <p>
            If your society pays ₹15,000/month for common area electricity, a 25 kW system could generate ~3,000 units/month, saving ~₹20,000/month, payback in 4–5 years, and deliver free power for 20+ more years.
          </p>
        </section>

        {/* How Solar Radian Helps */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
            <FaHandshake /> How Solar Radian Can Help
          </h2>
          <ul className="list-disc list-inside mt-3 space-y-2 text-base">
            <li>Free rooftop assessment</li>
            <li>Detailed financial and savings proposal</li>
            <li>Help with RWA approvals and subsidy applications</li>
            <li>Installation, commissioning, and post-installation service</li>
          </ul>
          <p className="mt-3 font-medium text-gray-700">
            We’ve helped several societies in Delhi NCR, Noida, Ghaziabad, Lucknow, Kanpur, and other cities go solar. Yours can be next.
          </p>
        </section>
      </main>
    </div>
  );
};

export default SolarForSocieties;
