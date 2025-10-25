import React from "react";

const RoofSpaceForSolar = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-white ">
        {/* Header */}
        <header className="px-6 py-8 bg-gradient-to-r from-imp-text to-orange-300 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            How Much Roof Space Do You Need for a Solar System?
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white">
            Estimate rooftop area, kW needs, and learn practical tips — focused for
            Delhi &amp; Uttar Pradesh rooftops.
          </p>
        </header>
      <div className="max-w-5xl mx-auto bg-white text-gray-700 shadow-md rounded-2xl overflow-hidden my-8">
    

        {/* Main Content */}
        <main className="p-10  leading-relaxed ">
          <section className="prose max-w-none ">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              Quick Answer: Space per kW
            </h2>
            <p>
              On average, you need <strong>80–100 sq. ft.</strong> of shadow-free
              rooftop area to install <strong>1 kW</strong> of solar panels. That
              means:
            </p>
            <ul className="list-disc pl-6">
              <li>1 kW = 80–100 sq. ft.</li>
              <li>3 kW = 240–300 sq. ft.</li>
              <li>5 kW = 400–500 sq. ft.</li>
              <li>10 kW = 800–1,000 sq. ft.</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold mt-6">
              How to estimate your own roof space needs
            </h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Check your monthly electricity bill.</strong> If you use
                around 300 units/month, you may need a 2.5–3 kW system. For
                500–600 units/month, a 5 kW system is more suitable.
              </li>
              <li>
                <strong>Multiply by roof area per kW.</strong> Example: For 3 kW → 3 × 100 = 300 sq. ft.
              </li>
              <li>
                <strong>Factor in space wastage.</strong> Not all of your roof is usable
                due to water tanks, AC units, or shade. Assume about 75% usable area.
              </li>
            </ol>

            <h3 className="text-lg sm:text-xl font-semibold mt-6">
              Rooftop Area vs. Type of Mounting
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-200 text-sm sm:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border">Mounting Type</th>
                    <th className="p-3 border">Area Needed per kW</th>
                    <th className="p-3 border">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border">Flat RCC Roof</td>
                    <td className="p-3 border">90–100 sq. ft.</td>
                    <td className="p-3 border">
                      Most common in Delhi/UP apartments/homes
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Metal Sheet Roof</td>
                    <td className="p-3 border">70–90 sq. ft.</td>
                    <td className="p-3 border">
                      Used in factories and commercial sites
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border">Tilted South Roof</td>
                    <td className="p-3 border">80–90 sq. ft.</td>
                    <td className="p-3 border">Naturally optimised</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold mt-6">
              What if my roof is small?
            </h3>
            <ul className="list-disc pl-6">
              <li>Use high-efficiency panels (e.g., mono PERC or bifacial)</li>
              <li>Install a smaller system that still reduces your bill</li>
              <li>Try elevated structure to use space underneath</li>
              <li>Combine with battery backup for better usage</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold mt-6">
              Example from Delhi/UP
            </h3>
            <p>
              In a typical Delhi NCR apartment building, a common rooftop of ~2,000 sq. ft.
              can support a 15–20 kW system — enough to power lights, lifts, and water pumps,
              or be shared among flats (via group net metering). In UP cities like Lucknow,
              Kanpur, and Agra, 5–10 kW systems are very feasible.
            </p>

            <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-700 my-6">
              <strong>Pro Tip:</strong> Don’t Guess — Get a Free Site Survey. Assess your
              rooftop properly to maximize solar output. Calculate available space,
              assess shadow impact, plan layout and orientation.
            </blockquote>

            <h3 className="text-lg sm:text-xl font-semibold mt-6">Final Takeaway</h3>
            <p>
              Even 300–500 sq. ft. can be enough for a powerful solar setup in urban or
              semi-urban areas.
            </p>
            <p>
              Curious if your rooftop qualifies? Reach out to us for a no-obligation
              consultation. We’ll help you calculate how much power your roof can
              generate — and how much you can save!
            </p>
          </section>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block px-5 py-3 bg-yellow-500 rounded-lg text-white font-semibold shadow hover:opacity-95 text-center"
            >
              Request a Free Site Survey
            </a>
            <a
              href="mailto:contact@solarradian.com"
              className="inline-block px-5 py-3 border border-gray-300 rounded-lg text-gray-800 font-medium text-center"
            >
              Email us: contact@solarradian.com
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoofSpaceForSolar;
