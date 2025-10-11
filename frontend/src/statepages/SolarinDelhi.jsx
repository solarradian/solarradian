import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

// SolarinDelhi.jsx
// Single-file React component styled with Tailwind CSS
// Usage: import SolarinDelhi from './SolarinDelhi'; <SolarinDelhi onRegister={() => {}} />

const  SolarinDelhi = () => {
  const navigate = useNavigate()
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <header className="flex items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
            Rooftop Solar in <span className="text-amber-500">Delhi</span>
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Powering the Capital with clean, reliable solar energy — simple, fast and
            subsidy-backed.
          </p>
        </div>

        <div className="flex-shrink-0">
          <div className="text-right">
            <div className="text-sm text-slate-500">Call us</div>
            <a href="tel:+919220337642" className="font-medium text-slate-900 block">
              +91-9220337642
            </a>
            <a href="mailto:contact@solarradian.com" className="text-sm text-amber-600 block">
              contact@solarradian.com
            </a>
          </div>
        </div>
      </header>

      {/* Hero / Overview */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <article className="md:col-span-2 bg-slate-50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-800">Why Delhi Is Perfect for Solar</h2>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            Delhi gets over 300 days of bright sunshine each year. With strong
            government incentives, simplified approvals and high electricity
            tariffs (₹10–₹12/unit), rooftop solar systems generally pay back within
            3–4 years and provide clean electricity for 20+ years.
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-700">
            <div>
              <dt className="font-medium">Net Metering</dt>
              <dd>Available for systems above 1 kWp</dd>
            </div>
            <div>
              <dt className="font-medium">System Capacity</dt>
              <dd>Min: 1 kWp • No maximum</dd>
            </div>
            <div>
              <dt className="font-medium">Ownership</dt>
              <dd>CAPEX (self) or RESCO (third-party)</dd>
            </div>
            <div>
              <dt className="font-medium">Billing</dt>
              <dd>Annual settlement; APPC for exported energy</dd>
            </div>
          </dl>

          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>• Multiple net metering options (individual / group / virtual)</li>
            <li>• Generation-Based Incentives (₹2–₹3 / unit for up to 5 years)</li>
            <li>• No DDA / Municipal approval required for typical rooftops</li>
            <li>• Mandatory for large government/educational/medical rooftops &gt;500 m²</li>
          </ul>
        </article>

        <aside className="rounded-xl border p-5 bg-gradient-to-br from-white to-amber-50">
          <h3 className="text-md font-semibold text-slate-800">Solar Policy Highlights</h3>
          <p className="mt-2 text-sm text-slate-600">Key incentives and easy installation rules for Delhi residents.</p>

          <div className="mt-4 text-sm">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-500 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 11l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div className="font-medium text-slate-800">Generation-Based Incentives</div>
                <div className="text-slate-600">Residential: ₹2–₹3 per unit (for up to 5 years)</div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-500 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div className="font-medium text-slate-800">No Extra Charges</div>
                <div className="text-slate-600">Exempted from banking, wheeling and other fees</div>
              </div>
            </div>
          </div>

          <button
            onClick={ () => navigate('/freequote')}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl shadow-sm border border-amber-300 bg-amber-500 text-white font-semibold text-sm hover:opacity-95"
          >
            Register Your Rooftop
          </button>
        </aside>
      </section>

      {/* ROI Example & Table */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl p-6 border">
          <h3 className="font-semibold text-slate-800">Example: ROI for a Typical Delhi Home</h3>
          <p className="mt-2 text-sm text-slate-600">3 kWp rooftop system — estimated cost ₹2,00,000 (before subsidy)</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-amber-50 rounded-lg text-center">
              <div className="text-xs text-slate-500">Annual ROI</div>
              <div className="text-lg font-bold text-amber-600">~25%</div>
              <div className="text-xs text-slate-500">(for 25 years)</div>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg text-center">
              <div className="text-xs text-slate-500">Lifetime Savings</div>
              <div className="text-lg font-bold text-slate-600">₹9,00,000</div>
              <div className="text-xs text-slate-500">(over 25 years)</div>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg text-center">
              <div className="text-xs text-slate-500">Payback</div>
              <div className="text-lg font-bold text-amber-600">3 - 4 yrs</div>
              <div className="text-xs text-slate-500">(typical)</div>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-3 py-2 font-medium">Parameter</th>
                  <th className="px-3 py-2 font-medium">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-3 py-3">Net Metering</td>
                  <td className="px-3 py-3">Available for systems above 1 kWp</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">System Capacity</td>
                  <td className="px-3 py-3">Min: 1 kWp • No maximum limit</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">Ownership Options</td>
                  <td className="px-3 py-3">CAPEX (self-owned) or RESCO (third-party owned)</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">Billing Mechanism</td>
                  <td className="px-3 py-3">Annual settlement; surplus exported to grid compensated at APPC</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">Other Charges</td>
                  <td className="px-3 py-3">Exempted from banking, wheeling, and additional fees</td>
                </tr>
                <tr>
                  <td className="px-3 py-3">Incentives</td>
                  <td className="px-3 py-3">GBI & Capital Subsidy available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border">
          <h4 className="font-semibold text-slate-800">Why Choose Solar Radian</h4>
          <ul className="mt-3 text-sm text-slate-600 space-y-2">
            <li>• MNRE-empanelled under PM Suryaghar (Delhi & UP)</li>
            <li>• Hassle-free subsidy assistance via PM Suryaghar portal</li>
            <li>• Certified end-to-end installation and lifetime support</li>
            <li>• ALMM-approved panels and 25-year performance warranty</li>
            <li>• Customized proposal & detailed ROI calculations</li>
          </ul>

          <div className="mt-6">
          <button   onClick={ () => navigate('/freequote')} className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md shadow-sm border  bg-imp-text text-white font-semibold text-sm hover:bg-orange-300 duration-200"> 
          Get a Free Quote</button>

            <div className="mt-3 text-xs text-slate-500">Or email us at contact@solarradian.com</div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="mt-8 text-center text-sm text-slate-600">
        <p>
          Solar Radian – Empowering homes, schools & businesses to harness the sun.
        </p>
        <p className="mt-2">Website: <a href="https://www.solarradian.com" className="text-amber-600">www.solarradian.com</a></p>
      </footer>
    </div>
  );
}

export default SolarinDelhi;