import React from "react";
import { FaSolarPanel, FaBolt, FaBatteryFull, FaCheckCircle } from "react-icons/fa";

const OnGridVsOffGridSolar = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-imp-text to-orange-300 py-10 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold">
          On-Grid vs Off-Grid Solar Systems: What’s Right for You in Delhi/UP?
        </h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto">
          Understand the difference between On-Grid and Off-Grid solar systems — and find which fits your home or business best.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
        {/* Intro Section */}
        <section>
          <p className="text-lg leading-relaxed">
            As rooftop solar grows across India, homeowners and businesses often ask:
            <span className="font-semibold text-yellow-600">
              {" "}“Should I go for on-grid or off-grid solar?”
            </span>{" "}
            The right choice depends on your location, power reliability and budget.
            This guide explains both systems in simple language.
          </p>
        </section>

        {/* On-Grid Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
            <FaSolarPanel /> What Is an On-Grid Solar System?
          </h2>
          <p className="mt-3">
            Also called <span className="font-semibold">grid-tied</span>, an on-grid system is connected to the local electricity network.
          </p>

          <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
            <FaBolt className="text-yellow-500" /> How It Works
          </h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Your solar panels generate electricity.</li>
            <li>You use that electricity for daily needs.</li>
            <li>Any extra electricity exports to the grid (via net metering).</li>
            <li>When solar production is low (night/clouds), you draw from the grid.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 text-green-600 flex items-center gap-2">
            <FaCheckCircle /> Key Benefits
          </h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Lower upfront cost (no battery bank required).</li>
            <li>Net metering reduces your bills — often dramatically.</li>
            <li>Well suited for cities/towns with stable grid supply (Delhi, Noida, Ghaziabad, Lucknow).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 text-red-600">Limitations</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Does not supply power during grid outages unless you use a hybrid inverter with batteries.</li>
          </ul>
        </section>

        {/* Off-Grid Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
            <FaBatteryFull /> What Is an Off-Grid Solar System?
          </h2>
          <p className="mt-3">
            An off-grid system is <span className="font-semibold">fully independent</span> from the electricity grid. It stores solar power in batteries and supplies energy even when the grid is down.
          </p>

          <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
            <FaBolt className="text-yellow-500" /> How It Works
          </h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Solar panels charge a battery bank.</li>
            <li>An inverter draws power from batteries to run appliances.</li>
            <li>You're fully self-reliant — no grid connection.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 text-green-600 flex items-center gap-2">
            <FaCheckCircle /> Key Benefits
          </h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Works during power outages.</li>
            <li>Ideal for remote or rural locations with poor grid access.</li>
            <li>No electricity bill if you meet all your needs from solar.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 text-red-600">Limitations</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Higher upfront cost because of batteries.</li>
            <li>System size limited by battery capacity.</li>
            <li>Batteries need maintenance and eventual replacement.</li>
          </ul>
        </section>

        {/* Comparison Table */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            On-Grid vs Off-Grid: Quick Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Feature</th>
                  <th className="border border-gray-300 p-3 text-left">On-Grid System</th>
                  <th className="border border-gray-300 p-3 text-left">Off-Grid System</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Grid Connection", "Yes", "No"],
                  ["Net Metering", "Available", "Not applicable"],
                  ["Works During Power Cuts", "No (unless hybrid)", "Yes"],
                  ["Batteries Required", "No", "Yes"],
                  ["Ideal For", "Cities/towns with grid", "Remote areas or backup needs"],
                  ["Initial Cost", "Lower", "Higher"],
                  ["Maintenance", "Minimal", "Moderate (batteries)"],
                ].map(([feature, onGrid, offGrid]) => (
                  <tr key={feature}>
                    <td className="border border-gray-300 p-3 font-medium">{feature}</td>
                    <td className="border border-gray-300 p-3">{onGrid}</td>
                    <td className="border border-gray-300 p-3">{offGrid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recommendation Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            Which One Is Better for You in Delhi/UP?
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-green-600">Choose On-Grid if:</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>You live in a city like Delhi, Noida, Ghaziabad, Lucknow, or Kanpur.</li>
                <li>Your area has a reliable grid supply.</li>
                <li>You want maximum ROI and lower bills.</li>
                <li>You are eligible for government subsidy (often available for on-grid residential systems).</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-600">Choose Off-Grid if:</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>You live in a rural area or face frequent power cuts.</li>
                <li>You want complete energy independence.</li>
                <li>You are okay with a higher upfront cost.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Hybrid Option Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            Hybrid Option: Best of Both Worlds?
          </h2>
          <p>
            A <span className="font-semibold">hybrid system</span> is grid-connected but includes battery backup.
            It provides outage protection while letting you use net metering — a more flexible (but costlier) choice
            for places with unstable supply.
          </p>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-3xl font-bold">Need Expert Help Choosing the Right System?</h2>
          <p className="mt-4 text-lg">
            At <span className="font-semibold">Solar Radian</span>, we offer:
          </p>
          <ul className="mt-4  ">
            <li>✅ Free site survey</li>
            <li>✅ Customized system design</li>
            <li>✅ Net metering and subsidy assistance</li>
            <li>✅ Installation & after-sales service</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default OnGridVsOffGridSolar;
