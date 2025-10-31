import React, { useState } from 'react';
import { Calculator, Sun, Zap, Home, Building, Users, UserCheck } from 'lucide-react';

const SolarCalculator = () => {
  const [activeTab, setActiveTab] = useState('residential');
  const [electricity, setElectricity] = useState('');
  const [area, setArea] = useState('');
  const [capacity, setCapacity] = useState('');
  const [includeSubsidy, setIncludeSubsidy] = useState(true);
  
  const [results, setResults] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateResults = () => {
    const electricityNum = parseFloat(electricity) || 0;
    const areaNum = parseFloat(area) || 0;
    const capacityNum = parseFloat(capacity) || 0;

    if (electricityNum <= 0 || areaNum <= 0 || capacityNum <= 0) {
      alert('Please enter valid positive values for all fields');
      return;
    }

    // Simple calculation logic
    const feasibleCapacity = Math.min(capacityNum, areaNum / 10, electricityNum / 120);
    const costPerKw = feasibleCapacity <= 5 ? 60000 : feasibleCapacity <= 10 ? 55000 : 50000;
    const installationCost = feasibleCapacity * costPerKw;

    let subsidy = 0;
    if (includeSubsidy && activeTab === 'residential') {
      // Fixed subsidy amounts as specified
      subsidy = 78000 + 30000; // Total ₹1,08,000 subsidy
    }

    const effectiveCost = installationCost - subsidy;
    const monthlyGeneration = feasibleCapacity * 120;
    const monthlySavings = monthlyGeneration * 6;
    const paybackMonths = effectiveCost > 0 ? effectiveCost / monthlySavings : 0;

    setResults({
      feasibleCapacity: feasibleCapacity.toFixed(1),
      installationCost,
      subsidy,
      effectiveCost,
      monthlySavings,
      paybackMonths: paybackMonths.toFixed(1)
    });
  };

  const resetForm = () => {
    setElectricity('');
    setArea('');
    setCapacity('');
    setResults(null);
  };

  const tabs = [
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building },
    { id: 'cghsSingle', label: 'CGHS Single', icon: UserCheck },
    { id: 'cghsMulti', label: 'CGHS Multi', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sun className="w-8 h-8 mr-3 text-yellow-300" />
            <h1 className="text-3xl font-bold">Solar Calculator</h1>
          </div>
          <p className="text-blue-100">
            Calculate your solar installation costs and savings
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border mb-6">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 font-medium border-b-2 min-w-max ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-blue-600" />
              Enter Your Details
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Electricity (kWh)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={electricity}
                  onChange={(e) => setElectricity(e.target.value)}
                  placeholder="e.g., 300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rooftop Area (sqm)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g., 200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Capacity (kW)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="e.g., 5.0"
                />
              </div>
            </div>

            {activeTab === 'residential' && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    checked={includeSubsidy}
                    onChange={(e) => setIncludeSubsidy(e.target.checked)}
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Include Subsidy (₹78,000 + ₹30,000 = ₹1,08,000 total)
                  </span>
                </label>
                <p className="text-xs text-gray-600 mt-1 ml-6">
                  Central subsidy: ₹78,000 + State subsidy: ₹30,000
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={calculateResults}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Calculate
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Results */}
            {results && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Calculation Results</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Feasible Capacity</p>
                    <p className="text-xl font-bold text-blue-700">{results.feasibleCapacity} kW</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Installation Cost</p>
                    <p className="text-xl font-bold text-gray-800">{formatCurrency(results.installationCost)}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Subsidy</p>
                    <p className="text-xl font-bold text-green-700">{formatCurrency(results.subsidy)}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Effective Cost</p>
                    <p className="text-xl font-bold text-blue-700">{formatCurrency(results.effectiveCost)}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Monthly Savings</p>
                    <p className="text-xl font-bold text-green-700">{formatCurrency(results.monthlySavings)}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Payback Period</p>
                    <p className="text-xl font-bold text-orange-700">{results.paybackMonths} months</p>
                  </div>
                </div>
                
                {results.subsidy > 0 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 text-center">
                      <strong>Subsidy Breakdown:</strong> Central ₹78,000 + State ₹30,000 = Total ₹1,08,000
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Important Information</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• 1kW solar plant requires approx 10 sqm (100 sq ft) of rooftop area</p>
              <p>• Actual usable area may be 20-50% of total rooftop due to obstructions</p>
              <p>• Residential subsidy: ₹78,000 (Central) + ₹30,000 (State) = ₹1,08,000 total</p>
              <p>• Financing options available with major banks at 7% interest</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;