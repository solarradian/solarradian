// Blog5.jsx
import React from "react";

const Blog5 = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-imp-text">
        How Much Roof Space Do You Need for a Solar System?
      </h2>

      <p>
        If you're thinking of installing solar panels on your rooftop, one
        of the first questions that comes to mind is:
      </p>
      <p className="italic">“Do I have enough space on my roof?”</p>
      <p>
        The good news is that you probably do—especially if you're in Delhi
        or Uttar Pradesh, where rooftops are often spacious. In this blog, we’ll
        explain how much area is required per kilowatt (kW) of solar, what
        factors affect it, and how to estimate your own rooftop potential.
      </p>

       <h2 className="text-2xl font-bold text-imp-text">Quick Answer: How Much Space Per kW?</h2>
      <p>On average, you need:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>80–100 square feet of shadow-free rooftop area to install 1 kilowatt (kW) of solar panels.</li>
      </ul>

      <p>So:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>1 kW = 80–100 sq. ft.</li>
        <li>3 kW = 240–300 sq. ft.</li>
        <li>5 kW = 400–500 sq. ft.</li>
        <li>10 kW = 800–1,000 sq. ft.</li>
      </ul>

      <p>
        This is for a standard rooftop solar system using monocrystalline
        or polycrystalline panels (which are most common in India).
      </p>

       <h2 className="text-2xl font-bold text-imp-text">How to Estimate Your Own Roof Space Needs</h2>
      <ol className="list-decimal list-inside space-y-2">
        <li>
          Check Your Monthly Electricity Bill
          <ul className="list-disc list-inside ml-5 space-y-1">
            <li>If you use around 300 units/month, you may need a 2.5–3 kW system.</li>
            <li>For 500–600 units/month, a 5 kW system is more suitable.</li>
          </ul>
        </li>
        <li>
          Multiply by Roof Area Per kW
          <ul className="list-disc list-inside ml-5">
            <li>Example: For 3 kW → 3 × 100 = 300 sq. ft.</li>
          </ul>
        </li>
        <li>
          Factor in Space Wastage
          <ul className="list-disc list-inside ml-5 space-y-1">
            <li>Not all of your roof is usable due to:
              <ul className="list-disc list-inside ml-5">
                <li>Water tanks, AC units</li>
                <li>Shade from nearby buildings or trees</li>
                <li>Orientation and layout</li>
              </ul>
            </li>
            <li>It’s safe to assume about 75% of roof area is usable.</li>
          </ul>
        </li>
      </ol>

      <h2 className="text-2xl font-bold text-imp-text">Rooftop Area vs. Type of Mounting</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Mounting Type</th>
              <th className="border px-4 py-2 text-left">Area Needed per kW</th>
              <th className="border px-4 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Flat RCC Roof</td>
              <td className="border px-4 py-2">90–100 sq. ft.</td>
              <td className="border px-4 py-2">Most common in Delhi/UP apartments/homes</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border px-4 py-2">Metal Sheet Roof</td>
              <td className="border px-4 py-2">70–90 sq. ft.</td>
              <td className="border px-4 py-2">Used in factories and commercial sites</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Tilted South Roof</td>
              <td className="border px-4 py-2">80–90 sq. ft.</td>
              <td className="border px-4 py-2">Naturally optimised</td>
            </tr>
          </tbody>
        </table>
      </div>

       <h2 className="text-2xl font-bold text-imp-text">What If My Roof Is Small?</h2>
      <p>No worries! Here are some options:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>Use high-efficiency panels (e.g., mono PERC or bifacial)</li>
        <li>Install a smaller system that still reduces your bill</li>
        <li>Try elevated structure to use space underneath</li>
        <li>Combine with battery backup for better usage</li>
      </ul>

      <p className="font-semibold mt-4">Example from Delhi/UP:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>In a typical Delhi NCR apartment building</li>
        <li>A common rooftop of ~2,000 sq. ft. can support a 15–20 kW system</li>
        <li>Enough to power common lights, lifts, water pumps, or be shared among flats (via group net metering)</li>
        <li>In UP cities like Lucknow, Kanpur, and Agra, 5–10 kW systems are very feasible</li>
      </ul>

      <div className="bg-yellow-100 p-4 rounded-md border-l-4 border-yellow-400">
        <p className="font-semibold">Pro Tip:</p>
        <p>Don’t Guess — Get a Free Site Survey. Assess your rooftop properly to maximize solar output.</p>
      </div>

      <ul className="list-disc list-inside space-y-1 mt-2">
        <li>Calculate available space</li>
        <li>Assess shadow impact</li>
        <li>Plan layout and orientation</li>
        <li>Maximize output with minimal space</li>
      </ul>

      <p>We offer free site visits across Delhi, Noida, Ghaziabad, Lucknow, Kanpur, and other parts of UP.</p>

      <div className="bg-green-100 p-4 rounded-md border-l-4 border-green-400 mt-4">
        <p className="font-semibold">Final Takeaway:</p>
        <p>Even 300–500 sq. ft. can be enough for a powerful solar setup in urban or semi-urban areas.</p>
      </div>

      <p className="mt-4">
        Curious if your rooftop qualifies? Reach out to us for a no-obligation consultation. We’ll help you calculate how much power your roof can generate—and how much you can save!
      </p>
    </div>
  );
};

export default Blog5;
