import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// WhySolar.jsx
// Tailwind + Framer Motion component for Solar Radian
// Usage: <WhySolar onSurvey={() => {}} onCalculator={() => {}} />

const features = [
  {
    title: 'Reduced Energy Bills',
    body:
      'Cut your electricity bills by up to 40% (or more depending on location and consumer category). Once installed, sunlight is free — no fuel, no price hikes.',
    emoji: '💡',
  },
  {
    title: 'Safe Investment, High Returns',
    body:
      'Solar provides steady, tax-free returns — typically an 18–22% ROI over 25+ years, outperforming many traditional investments.',
    emoji: '💰',
  },
  {
    title: 'Minimal Maintenance',
    body:
      'Very low upkeep: occasional cleaning and an optional low-cost AMC keep your system efficient for decades.',
    emoji: '⚙️',
  },
  {
    title: 'Environmentally Friendly',
    body:
      'Reduce your carbon footprint. Solar adoption helps cut CO₂ emissions and improves air quality for future generations.',
    emoji: '🌍',
  },
  {
    title: 'Accessible for Everyone',
    body:
      'From 1 kW homes to MW-scale commercial plants — customized designs for every rooftop, space and budget.',
    emoji: '🌞',
  },
  {
    title: 'National Impact',
    body:
      'Solar reduces import dependence, creates jobs, and supports inclusive economic growth across India.',
    emoji: '🇮🇳',
  },
];

const stats = [
  { label: 'Projected ROI', value: '18–22% p.a.' },
  { label: 'System Life', value: '25+ years' },
  { label: 'Sunshine Days (India)', value: '300+/year' },
  { label: 'CO₂ Reduction (example)', value: '275M tonnes' },
];

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.5 },
  },
};

const card = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const FeatureCard = ({ emoji, title, body }) => (
  <motion.div
    variants={card}
    className="bg-white rounded-2xl p-5 shadow-md border border-slate-200 text-gray-700 hover:shadow-lg transition-shadow"
  >
    <div className="flex items-start gap-4">
      <div className="text-3xl shrink-0" aria-hidden>
        {emoji}
      </div>
      <div>
        <h3 className="text-lg font-semibold leading-snug text-gray-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
      </div>
    </div>
  </motion.div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-gray-700">
    <div className="text-xs uppercase tracking-wider text-gray-500">{label}</div>
    <div className="mt-1 text-xl font-bold text-gray-900">{value}</div>
  </div>
);

const WhySolar = ({  className = '' }) => {
    const navigate = useNavigate()
  return (
    <section
      className={`w-full py-12 md:py-20 bg-white text-gray-700 ${className}`}
      aria-labelledby="why-solar-heading"
    >
      <div className="w-full bg-gradient-to-r from-imp-text to-orange-300 py-10 mb-10">
            <h2
              id="why-solar-heading"
              className="text-4xl sm:text-5xl font-bold  text-center text-white"
            >
              Why Go Solar withSolar Radian
            </h2>
          </div>
      <div className="container xl:max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
        
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
        >
          {/* Left column: features */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>

          {/* Right column: stats + CTA */}
          <motion.aside variants={card} className="lg:col-span-1 sticky top-24">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Snapshot</h3>
              <p className="mt-2 text-sm text-gray-600">
                Financially smart, low-maintenance, and climate-friendly. A rooftop solar system
                pays for itself many times over.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <button
                  onClick={ () => navigate('/solar-calculator')}
                  className="w-full rounded-xl py-3 font-semibold shadow-sm border border-imp-text bg-amber-50 hover:bg-orange-300 text-gray-900"
                >
                  Run Solar Savings Calculator
                </button>

                <button
                  onClick={ () => navigate('/freequote')}
                  className="w-full rounded-xl py-3 font-semibold bg-imp-text text-white hover:bg-orange-300"
                >
                  Book Free Site Survey
                </button>

                <Link
                  to="/contact"
                  className="mt-2 text-center text-sm text-gray-600 underline"
                >
                  Contact Solar Radian for a Personalized Proposal
                </Link>
              </div>

              <div className="mt-5 text-xs text-gray-500">
                <strong>Note:</strong> Savings vary by location, system size, and consumption. Use
                the calculator or request a site visit for an exact quote.
              </div>
            </div>
          </motion.aside>
        </motion.div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <div className="rounded-2xl p-6 bg-gradient-to-r from-amber-50 to-white border border-amber-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold text-gray-900">
                The only mistake is delaying the decision.
              </h4>
              <p className="mt-1 text-sm text-gray-600">
                Every month you postpone solar adoption is a month of lost savings. Start your solar
                journey today.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={ () => navigate('/freequote')}
                className="rounded-full px-6 py-3 font-semibold bg-imp-text text-white hover:bg-orange-300"
              >
                Schedule Free Site Survey
              </button>
              <button
                onClick={ () => navigate('/solar-calculator')}
                className="rounded-full px-6 py-3 font-semibold border border-imp-text bg-white hover:bg-orange-300 text-gray-900"
              >
                Run Savings Calculator
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySolar;
