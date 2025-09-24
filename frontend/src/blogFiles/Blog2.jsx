import React from "react";
const Blog2 = () => {
  return (
     <div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-800">
      <header>
        <h1 className="text-3xl font-bold text-imp-text">On-Grid vs Off-Grid Solar Systems: What’s Right for You in Delhi/UP?</h1>
        <p className="mt-2 text-sm text-gray-600">As rooftop solar grows across India, homeowners and businesses often ask: <strong>"Should I go for on-grid or off-grid solar?"</strong> The right choice depends on your location, power reliability and budget. This guide explains both systems in plain language.</p>
      </header>

      <section>
         <h1 className="text-imp-text font-bold text-2xl">What Is an On-Grid Solar System?</h1>
        <p>Also called <em>grid-tied</em>, an on-grid system is connected to the local electricity network.</p>
        <p><strong>🔧 How it works:</strong></p>
        <ul>
          <li>Your solar panels generate electricity.</li>
          <li>You use that electricity for daily needs.</li>
          <li>Any extra electricity exports to the grid (via net metering).</li>
          <li>When solar production is low (night/clouds), you draw from the grid.</li>
        </ul>

        <p><strong>Key benefits</strong></p>
        <ul>
          <li>Lower upfront cost (no battery bank required).</li>
          <li>Net metering reduces your bills — often dramatically.</li>
          <li>Well suited for cities/towns with stable grid supply (Delhi, Noida, Ghaziabad, Lucknow).</li>
        </ul>

        <p><strong>Limitations</strong></p>
        <ul>
          <li>Does not supply power during grid outages unless you use a hybrid inverter with batteries.</li>
        </ul>
      </section>

      <section>
        <h2>What Is an Off-Grid Solar System?</h2>
        <p>An off-grid system is fully independent from the electricity grid. It stores solar power in batteries and supplies energy even when the grid is down.</p>
        <p><strong>🔧 How it works:</strong></p>
        <ul>
          <li>Solar panels charge a battery bank.</li>
          <li>An inverter draws power from batteries to run appliances.</li>
          <li>You're fully self-reliant — no grid connection.</li>
        </ul>

        <p><strong>Key benefits</strong></p>
        <ul>
          <li>Works during power outages.</li>
          <li>Ideal for remote or rural locations with poor grid access.</li>
          <li>No electricity bill if you meet all your needs from solar.</li>
        </ul>

        <p><strong>Limitations</strong></p>
        <ul>
          <li>Higher upfront cost because of batteries.</li>
          <li>System size limited by battery capacity.</li>
          <li>Batteries need maintenance and eventual replacement.</li>
        </ul>
      </section>

      <section>
        <h1 className="text-imp-text font-bold text-2xl">On-Grid vs Off-Grid: Quick Comparison</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 p-3 text-left">Feature</th>
                <th className="border border-gray-200 p-3 text-left">On-Grid System</th>
                <th className="border border-gray-200 p-3 text-left">Off-Grid System</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-200 p-3">Grid Connection</td>
                <td className="border border-gray-200 p-3">Yes</td>
                <td className="border border-gray-200 p-3">No</td>
              </tr>

              <tr className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-200 p-3">Net Metering</td>
                <td className="border border-gray-200 p-3">Available</td>
                <td className="border border-gray-200 p-3">Not applicable</td>
              </tr>

              <tr className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-200 p-3">Works During Power Cuts</td>
                <td className="border border-gray-200 p-3">No (unless hybrid)</td>
                <td className="border border-gray-200 p-3">Yes</td>
              </tr>

              <tr className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-200 p-3">Batteries Required</td>
                <td className="border border-gray-200 p-3">No</td>
                <td className="border border-gray-200 p-3">Yes</td>
              </tr>

              <tr className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-200 p-3">Ideal For</td>
                <td className="border border-gray-200 p-3">Cities/towns with grid</td>
                <td className="border border-gray-200 p-3">Remote areas or backup needs</td>
              </tr>

              <tr className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-200 p-3">Initial Cost</td>
                <td className="border border-gray-200 p-3">Lower</td>
                <td className="border border-gray-200 p-3">Higher</td>
              </tr>

              <tr className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-200 p-3">Maintenance</td>
                <td className="border border-gray-200 p-3">Minimal</td>
                <td className="border border-gray-200 p-3">Moderate (batteries)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h1 className="text-imp-text font-bold text-2xl">Which One Is Better for You in Delhi/UP?</h1>

        <p><strong>Choose On-Grid if:</strong></p>
        <ul>
          <li>You live in a city like Delhi, Noida, Ghaziabad, Lucknow, or Kanpur.</li>
          <li>Your area has a reliable grid supply.</li>
          <li>You want maximum ROI and lower bills.</li>
          <li>You are eligible for government subsidy (often available for on-grid residential systems).</li>
        </ul>

        <p><strong>Choose Off-Grid if:</strong></p>
        <ul>
          <li>You live in a rural area or face frequent power cuts.</li>
          <li>You want complete energy independence.</li>
          <li>You are okay with a higher upfront cost.</li>
        </ul>

        <h3>Hybrid Option: Best of Both Worlds?</h3>
        <p>A hybrid system is grid-connected but includes battery backup. It gives outage protection while letting you use net metering: a more flexible (but costlier) choice for places with unstable supply.</p>

        <h3>Need Expert Help Choosing the Right System?</h3>
        <p>At <strong>Solar Radian</strong>, we offer:</p>
        <ul>
          <li>Free site survey</li>
          <li>Customized system design</li>
          <li>Net metering and subsidy assistance</li>
          <li>Installation & after-sales service</li>
        </ul>

             </section>
    </div>
  );
}


export default Blog2;