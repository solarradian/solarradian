

import React from "react";
import { useNavigate } from "react-router-dom";

const RooftopSolarinGreaterNoida = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto rounded-2xl p-4 ">
      {/* Header */}
      <header className="flex items-start md:items-center justify-between gap-6 rounded-md border p-5 bg-gradient-to-br from-white to-amber-50">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
            Rooftop Solar in{" "}
            <span className="text-amber-500">
              Greater Noida 
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            The smartest investment you can make for your home and future —
            clean, powerful, and subsidy-backed.
          </p>
        </div>

        <div className="flex-shrink-0 text-right">
          <div className="text-sm text-slate-500">Call us</div>
          <a
            href="tel:+919220337642"
            className="font-medium text-slate-900 block"
          >
            +91-9220337642
          </a>
          <a
            href="mailto:contact@solarradian.com"
            className="text-sm text-amber-600 block"
          >
            contact@solarradian.com
          </a>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="mt-8  rounded-md border p-5 bg-gradient-to-br from-white to-amber-50">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          Why Noida, Greater Noida & Ghaziabad Are Ideal for Solar
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          When it comes to India’s best-planned cities, Noida, Greater Noida, and
          Ghaziabad always make the list. With wide roads, green spaces, and
          modern infrastructure, these NCR cities are now leading the clean
          energy revolution. If you live in Noida, Greater Noida, or Ghaziabad,
          switching to rooftop solar isn’t just good for the environment — it’s
          one of the smartest financial investments you can make. 
        </p>
      </section>

      {/* Financial Section */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <article className="md:col-span-2 bg-white rounded-xl p-6 border">
          <h3 className="font-semibold text-slate-800 mb-2">
            💰 Why Going Solar in Noida Makes Perfect Financial Sense
          </h3>
          <p className="text-sm text-slate-600">
            A typical household in Noida/Greater Noida/Ghaziabad spends around
            ₹7,500 per month on electricity — nearly ₹90,000 per year. Installing
            a 3 kW rooftop solar system with net metering can reduce this bill by
            up to 90%.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>• Initial investment: ~₹2,00,000 for a 3 kW system</li>
            <li>• Annual ROI: ~25%</li>
            <li>• Lifetime savings: ₹20.2 lakh</li>
            <li>• Payback period: 3–4 years</li>
          </ul>

          <p className="mt-4 text-sm text-slate-600">
            Compare that to traditional options:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>• Fixed Deposits: ~6–7% annual return</li>
            <li>• Stock Markets: 10–12% (variable and risky)</li>
            <li>• Solar: Consistent ~25% ROI, guaranteed for 25 years</li>
          </ul>

          <p className="mt-3 text-sm text-slate-600">
            Solar is not only a smarter investment, it’s a cleaner, safer, and
            long-term power solution for your home.
          </p>
        </article>

        <aside className="rounded-xl border p-5 bg-gradient-to-br from-white to-amber-50">
          <h3 className="text-md font-semibold text-slate-800">⚡ Key Benefits</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>• Reduce your electricity bills by up to 90%</li>
            <li>
              • Avail subsidies under PM Surya Ghar Muft Bijli Yojana & UP state
              subsidy
            </li>
            <li>• Earn via net metering for excess power sent to grid</li>
            <li>• Zero maintenance, 25+ years system life</li>
            <li>• Increase property value with energy independence</li>
          </ul>

          <button
            onClick={() => navigate("/freequote")}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl shadow-sm border border-amber-300 bg-amber-500 text-white font-semibold text-sm hover:opacity-95"
          >
            Register Your Rooftop
          </button>
        </aside>
      </section>

      {/* Why Choose Solar Radian */}
      <section className="mt-8 rounded-xl border p-5 bg-gradient-to-br from-white to-amber-50">
        <h3 className="font-semibold text-slate-800 mb-3">🏠 Why Choose Solar Radian</h3>
        <p className="text-sm text-slate-600 mb-3">
          Solar Radian is an MNRE-empanelled solar company under the PM Suryaghar
          Yojana for Delhi and Uttar Pradesh. We specialize in residential,
          institutional, and commercial installations across Noida, Greater
          Noida, Ghaziabad, and Delhi NCR.
        </p>

        <ul className="text-sm text-slate-700 space-y-2">
          <li>• 🌞 Expert solar advisors for personalized design</li>
          <li>• 🧾 Hassle-free subsidy processing (PM Suryaghar & UPNEDA)</li>
          <li>• 💡 High-efficiency ALMM-approved solar panels</li>
          <li>• 💰 Flexible EMI-based financing options</li>
          <li>• ⚙️ End-to-end service from survey to activation</li>
          <li>• 🔋 25-year performance warranty & real-time monitoring</li>
        </ul>
      </section>

      {/* Steps Section */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl p-6 border">
          <h3 className="font-semibold text-slate-800 mb-3">
            🪜 How to Get Solar Installed in Noida with Solar Radian
          </h3>
          <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-2">
            <li>
              <strong>Schedule a Free Site Survey:</strong> Visit our Free Quote
              Page and book your preferred date.
            </li>
            <li>
              <strong>Get a Custom Solar Proposal:</strong> Our experts will
              provide a detailed proposal including size, savings & ROI.
            </li>
            <li>
              <strong>Installation & Activation:</strong> Once approved,
              installation is completed within 4–6 weeks including subsidy, net
              metering & inspection.
            </li>
          </ol>
          <p className="mt-4 text-sm text-slate-600">
            From start to finish — we handle everything so you can enjoy a
            smooth, transparent solar journey.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border flex flex-col justify-between">
          <div>
            <h4 className="font-semibold text-slate-800">
              🌍 The Time to Go Solar Is Now
            </h4>
            <p className="mt-2 text-sm text-slate-600">
              With 300+ days of sunshine, generous subsidies, and strong
              returns, there’s never been a better time to install rooftop solar
              in Noida or Greater Noida.
            </p>
          </div>

          <button
            onClick={() => navigate("/freequote")}
            className="mt-6 text-center px-4 py-2 rounded-lg border border-amber-300 bg-amber-500 text-white font-semibold text-sm hover:opacity-95"
          >
            Get a Free Quote
          </button>
        </div>
      </section>

     
    </div>
  );
};

export default RooftopSolarinGreaterNoida;
