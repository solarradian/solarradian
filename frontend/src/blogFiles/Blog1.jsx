import React from 'react';

const Blog1 = () => {
  return (
    <>
    
      {/* Blog Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 mt-6 text-imp-text">1. How Rooftop Solar Works: A Simple Guide for Homeowners</h2>
        <p className="mb-4 text-gray-700">
          A rooftop solar system is a setup where solar panels are installed on the roof of your home to capture sunlight and convert it into electricity. This electricity can be used to power your household appliances, lights, fans, air conditioners, and more.
        </p>
        <p className="mb-6 text-gray-700">
          You can think of it as generating your own electricity — clean, green, and free from the sun.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-imp-text">2. Key Components of a Rooftop Solar System</h2>
        <p className="mb-4 text-gray-700">Here's what a basic on-grid rooftop solar system includes:</p>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li className="mb-2"><strong>Solar Panels</strong> – These capture sunlight and convert it into DC (direct current) electricity.</li>
          <li className="mb-2"><strong>Inverter</strong> – Converts DC power from the panels into AC (alternating current) electricity, which your home uses.</li>
          <li className="mb-2"><strong>Net Meter</strong> – Measures both the electricity your system generates and how much you consume from the grid.</li>
          <li className="mb-2"><strong>Mounting Structure</strong> – Holds the solar panels at the right angle for maximum sunlight exposure.</li>
          <li className="mb-2"><strong>Wiring & Safety Equipment</strong> – Connects the components and ensures safe operation.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-imp-text">3. How It Works – Step-by-Step</h2>
        <ol className="list-decimal pl-6 mb-6 text-gray-700">
          <li className="mb-2">Sunlight hits the solar panels on your rooftop.</li>
          <li className="mb-2">The panels convert sunlight into DC electricity.</li>
          <li className="mb-2">The inverter converts DC into AC electricity, suitable for home use.</li>
          <li className="mb-2">Your home appliances use the solar electricity first.</li>
          <li className="mb-2">If you produce more than you consume, extra power goes to the grid (net metering).</li>
          <li className="mb-2">At night or on cloudy days, you automatically draw power from the grid as usual.</li>
        </ol>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-imp-text">4. What Is Net Metering?</h2>
        <p className="mb-4 text-gray-700">Net metering is a billing system that credits you for the excess electricity your solar panels generate and send to the grid. For example:</p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li className="mb-2">If you use 300 units in a month and export 200 units,</li>
          <li className="mb-2">You are billed only for the net 100 units.</li>
        </ul>
        <p className="mb-6 text-gray-700">
          This helps you save significantly on your electricity bill, and sometimes you may even have zero bills!
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-imp-text">5. Is Rooftop Solar Right for You?</h2>
        <p className="mb-4 text-gray-700">Ask yourself:</p>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          <li className="mb-2">Do you have 500–1000 sq. ft. of shade-free rooftop space?</li>
          <li className="mb-2">Are your monthly electricity bills above ₹2,000?</li>
          <li className="mb-2">Do you want to reduce your carbon footprint and dependency on the grid?</li>
        </ul>
        <p className="mb-6 text-gray-700">
          If yes, rooftop solar could be a perfect long-term investment for your home.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-imp-text">6. Benefits of Rooftop Solar</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li className="mb-2">Lower electricity bills (up to 90% savings)</li>
          <li className="mb-2">Government subsidies available (up to 40% for residential systems)</li>
          <li className="mb-2">Low maintenance</li>
          <li className="mb-2">25+ years of panel life</li>
          <li className="mb-2">Increases property value</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-6 text-imp-text">7. How to Get Started</h2>
        <p className="mb-4 text-gray-700">At Solar Radian, we make it simple:</p>
        <ol className="list-decimal pl-6 mb-4 text-gray-700">
          <li className="mb-2">Free site survey & feasibility check</li>
          <li className="mb-2">Customized system design</li>
          <li className="mb-2">Subsidy application support</li>
          <li className="mb-2">Installation & net metering</li>
          <li className="mb-2">Service & maintenance support</li>
        </ol>
        <p className="mb-6 text-gray-700">
          We've helped hundreds of homeowners in Delhi & NCR region (Noida, Ghaziabad, etc) make the solar switch. You could be next.
        </p>

      </div>
    </>
  );
};

export default Blog1;