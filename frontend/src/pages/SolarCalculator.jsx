import React, { useState } from 'react';
import { Calculator, Sun, Zap, Home, Building, Users, UserCheck } from 'lucide-react';

const SolarCalculator = () => {
  const [activeTab, setActiveTab] = useState('residential');
  const [formData, setFormData] = useState({
    residential: {
      electricity: '',
      area: '',
      capacity: '',
      includeSubsidy: true
    },
    commercial: {
      electricity: '',
      area: '',
      capacity: '',
      type: ''
    },
    cghsSingle: {
      electricity: '',
      area: '',
      capacity: ''
    },
    cghsMulti: {
      electricity: '',
      area: '',
      capacity: ''
    }
  });

  const [results, setResults] = useState({
    residential: {},
    commercial: {},
    cghsSingle: {},
    cghsMulti: {}
  });

  const updateFormData = (tab, field, value) => {
    setFormData(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value
      }
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateResidential = () => {
    const { electricity, area, capacity, includeSubsidy } = formData.residential;
    const electricityNum = parseFloat(electricity) || 0;
    const areaNum = parseFloat(area) || 0;
    const capacityNum = parseFloat(capacity) || 0;

    if (electricityNum <= 0 || areaNum <= 0 || capacityNum <= 0) {
      alert('Please enter valid positive values for all fields');
      return;
    }

    const feasibleCapacity = Math.min(capacityNum, areaNum / 10, electricityNum / 120);
    let costPerKw;
    if (feasibleCapacity <= 5) {
      costPerKw = 60000;
    } else if (feasibleCapacity <= 10) {
      costPerKw = 55000;
    } else {
      costPerKw = 50000;
    }
    
    const installationCost = feasibleCapacity * costPerKw;

    let centralSubsidy = 0;
    let stateSubsidy = 0;
    if (includeSubsidy) {
      if (feasibleCapacity <= 3) {
        centralSubsidy = feasibleCapacity * 18000;
      } else {
        centralSubsidy = 3 * 18000 + (feasibleCapacity - 3) * 9000;
      }
      stateSubsidy = Math.min(feasibleCapacity * 10000, 30000); // Example state subsidy
    }

    const totalSubsidy = centralSubsidy + stateSubsidy;
    const effectiveCost = installationCost - totalSubsidy;
    const monthlySolarGeneration = feasibleCapacity * 120; // kWh per month
    const monthlyGenerationIncentive = monthlySolarGeneration * 2; // Rs 2 per unit example
    const monthlySavings = monthlySolarGeneration * 6; // Rs 6 per unit saved
    const totalMonthlyBenefits = monthlySavings + monthlyGenerationIncentive;
    const paybackMonths = effectiveCost > 0 ? effectiveCost / totalMonthlyBenefits : 0;

    setResults(prev => ({
      ...prev,
      residential: {
        feasibleCapacity: feasibleCapacity.toFixed(2),
        installationCost,
        centralSubsidy,
        stateSubsidy,
        totalSubsidy,
        effectiveCost,
        monthlyGenerationIncentive,
        monthlySavings,
        totalMonthlyBenefits,
        paybackMonths: paybackMonths.toFixed(1)
      }
    }));
  };

  const calculateCommercial = () => {
    const { electricity, area, capacity, type } = formData.commercial;
    const electricityNum = parseFloat(electricity) || 0;
    const areaNum = parseFloat(area) || 0;
    const capacityNum = parseFloat(capacity) || 0;

    if (electricityNum <= 0 || areaNum <= 0 || capacityNum <= 0) {
      alert('Please enter valid positive values for all fields');
      return;
    }

    if (!type) {
      alert('Please select consumer type (Commercial or Industrial)');
      return;
    }

    const feasibleCapacity = Math.min(capacityNum, areaNum / 10, electricityNum / 120);
    const costPerKw = 50000;
    const installationCost = feasibleCapacity * costPerKw;
    const effectiveCost = installationCost; // No subsidy for commercial
    const ratePerUnit = type === 'Industrial' ? 7 : 8;
    const monthlyGBI = feasibleCapacity * 120 * 1.5; // Generation based incentive
    const monthlySavings = feasibleCapacity * 120 * ratePerUnit;
    const totalMonthlyBenefits = monthlySavings + monthlyGBI;
    const paybackMonths = effectiveCost > 0 ? effectiveCost / totalMonthlyBenefits : 0;

    setResults(prev => ({
      ...prev,
      commercial: {
        feasibleCapacity: feasibleCapacity.toFixed(2),
        installationCost,
        effectiveCost,
        monthlyGBI,
        monthlySavings,
        totalMonthlyBenefits,
        paybackMonths: paybackMonths.toFixed(1)
      }
    }));
  };

  const calculateCghsSingle = () => {
    const { electricity, area, capacity } = formData.cghsSingle;
    const electricityNum = parseFloat(electricity) || 0;
    const areaNum = parseFloat(area) || 0;
    let capacityNum = parseFloat(capacity) || 0;

    if (electricityNum <= 0 || areaNum <= 0 || capacityNum <= 0) {
      alert('Please enter valid positive values for all fields');
      return;
    }

    capacityNum = Math.min(capacityNum, 500); // Cap at 500kW for single point
    const feasibleCapacity = Math.min(capacityNum, areaNum / 10, electricityNum / 120);
    const costPerKw = 50000;
    const installationCost = feasibleCapacity * costPerKw;
    
    const centralSubsidy = feasibleCapacity * 20000; // Example subsidy
    const stateSubsidy = feasibleCapacity * 5000; // Example state subsidy
    const totalSubsidy = centralSubsidy + stateSubsidy;
    const effectiveCost = installationCost - totalSubsidy;
    const monthlyGBI = feasibleCapacity * 120 * 2;
    const monthlySavings = feasibleCapacity * 120 * 6;
    const totalMonthlyBenefits = monthlySavings + monthlyGBI;
    const paybackMonths = effectiveCost > 0 ? effectiveCost / totalMonthlyBenefits : 0;

    setResults(prev => ({
      ...prev,
      cghsSingle: {
        feasibleCapacity: feasibleCapacity.toFixed(2),
        installationCost,
        centralSubsidy,
        stateSubsidy,
        totalSubsidy,
        effectiveCost,
        monthlyGBI,
        monthlySavings,
        totalMonthlyBenefits,
        paybackMonths: paybackMonths.toFixed(1)
      }
    }));
  };

  const calculateCghsMulti = () => {
    const { electricity, area, capacity } = formData.cghsMulti;
    const electricityNum = parseFloat(electricity) || 0;
    const areaNum = parseFloat(area) || 0;
    const capacityNum = parseFloat(capacity) || 0;

    if (electricityNum <= 0 || areaNum <= 0 || capacityNum <= 0) {
      alert('Please enter valid positive values for all fields');
      return;
    }

    const feasibleCapacity = Math.min(capacityNum, areaNum / 10, electricityNum / 120);
    const costPerKw = 50000;
    const installationCost = feasibleCapacity * costPerKw;
    
    const centralSubsidy = feasibleCapacity * 15000; // Lower subsidy for multi-point
    const stateSubsidy = feasibleCapacity * 3000;
    const totalSubsidy = centralSubsidy + stateSubsidy;
    const effectiveCost = installationCost - totalSubsidy;
    const monthlyGBI = feasibleCapacity * 120 * 1.8;
    const monthlySavings = feasibleCapacity * 120 * 6;
    const totalMonthlyBenefits = monthlySavings + monthlyGBI;
    const paybackMonths = effectiveCost > 0 ? effectiveCost / totalMonthlyBenefits : 0;

    setResults(prev => ({
      ...prev,
      cghsMulti: {
        feasibleCapacity: feasibleCapacity.toFixed(2),
        installationCost,
        centralSubsidy,
        stateSubsidy,
        totalSubsidy,
        effectiveCost,
        monthlyGBI,
        monthlySavings,
        totalMonthlyBenefits,
        paybackMonths: paybackMonths.toFixed(1)
      }
    }));
  };

  const resetForm = (tab) => {
    const defaultData = {
      residential: { electricity: '', area: '', capacity: '', includeSubsidy: true },
      commercial: { electricity: '', area: '', capacity: '', type: '' },
      cghsSingle: { electricity: '', area: '', capacity: '' },
      cghsMulti: { electricity: '', area: '', capacity: '' }
    };

    setFormData(prev => ({
      ...prev,
      [tab]: defaultData[tab]
    }));
    
    setResults(prev => ({
      ...prev,
      [tab]: {}
    }));
  };

  const tabs = [
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building },
    { id: 'cghsSingle', label: 'CGHS Single', icon: UserCheck },
    { id: 'cghsMulti', label: 'CGHS Multi', icon: Users }
  ];

  const ResultCard = ({ label, value, highlight = false, isLarge = false }) => (
    <div className={`${isLarge ? 'md:col-span-2' : ''} bg-gradient-to-br ${
      highlight 
        ? 'from-blue-50 to-indigo-100 border-blue-300 shadow-blue-100' 
        : 'from-gray-50 to-gray-100 border-gray-200'
    } p-5 rounded-xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform`}>
      <label className="text-sm font-bold text-gray-700 mb-3 block leading-tight">{label}</label>
      <div className={`text-xl font-bold ${
        highlight ? 'text-blue-700' : 'text-gray-800'
      } ${isLarge ? 'text-2xl' : ''}`}>
        {value}
      </div>
    </div>
  );

  const FormInput = ({ label, value, onChange, type = "number", min = "0", step, max, placeholder, required = true }) => (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-gray-800 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        min={min}
        max={max}
        step={step}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 bg-white text-gray-800 font-medium"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-imp-text to-orange-300 text-white py-20 relative overflow-hidden">
        <div className="absolute z-10 "></div>
        <div className="">
          <div className="flex items-center justify-center mb-6">
            <Sun className="w-16 h-16 mr-4 text-yellow-300 animate-spin" style={{animationDuration: '8s'}} />
            <h1 className="text-4xl md:text-5xl font-bold ">
              Solar Calculator
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Info Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <Calculator className="w-8 h-8 mr-3 text-blue-600" />
                  Solar Plant Installation Details
                </h2>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="flex items-start text-lg">
                    <Zap className="w-5 h-5 mr-3 text-yellow-500 mt-1 flex-shrink-0" />
                    1kW of solar plant installation requires 10 sqm (approx 100 sq feet) of area.
                  </p>
                  
                  <p className="text-base bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    Normally, roofs have multiple projections like parapets, water tanks etc. This reduces the utilization of roof available for solar - approx 20% is available for solar installation. The same can be increased up to 50% by using elevated structures.
                  </p>
                  
                  <p className="text-base bg-green-50 p-4 rounded-lg border-l-4 border-green-500 font-medium">
                    Easy financing options are available with major banks up to ₹2 Lakhs @ 7% Effective Rate for a period of 10 years for residential consumers. A margin money of 10% will be required.
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Cost of Solar Installation</h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-xl text-center border-2 border-green-300 hover:shadow-lg transition-all duration-300">
                      <div className="font-bold text-green-800 text-lg">Up to 5kW</div>
                      <div className="text-green-700 font-semibold">₹60,000 per kW</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl text-center border-2 border-blue-300 hover:shadow-lg transition-all duration-300">
                      <div className="font-bold text-blue-800 text-lg">6kW to 10kW</div>
                      <div className="text-blue-700 font-semibold">₹55,000 per kW</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl text-center border-2 border-purple-300 hover:shadow-lg transition-all duration-300">
                      <div className="font-bold text-purple-800 text-lg">Above 10kW</div>
                      <div className="text-purple-700 font-semibold">₹50,000 per kW</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-full shadow-xl border-4 border-orange-200">
                  <Sun className="w-32 h-32 text-orange-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Tabs */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-8 py-5 font-bold whitespace-nowrap transition-all duration-300 border-b-4 min-w-max ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg transform scale-105'
                          : 'text-gray-600 hover:bg-white hover:text-gray-800 border-transparent hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-6 h-6 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8">
              {/* Residential Form */}
              {activeTab === 'residential' && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormInput
                      label="Electricity Consumption (per month in kWh)"
                      value={formData.residential.electricity}
                      onChange={(e) => updateFormData('residential', 'electricity', e.target.value)}
                      placeholder="e.g., 300"
                    />
                    <FormInput
                      label="Approx Rooftop Area (sqm)"
                      value={formData.residential.area}
                      onChange={(e) => updateFormData('residential', 'area', e.target.value)}
                      placeholder="e.g., 200"
                    />
                    <FormInput
                      label="Desired Solar Installation (kW)"
                      value={formData.residential.capacity}
                      onChange={(e) => updateFormData('residential', 'capacity', e.target.value)}
                      step="0.1"
                      placeholder="e.g., 5.0"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-3"
                        checked={formData.residential.includeSubsidy}
                        onChange={(e) => updateFormData('residential', 'includeSubsidy', e.target.checked)}
                      />
                      <span className="text-sm font-bold text-gray-800">Include PM Surya Ghar subsidy (Recommended)</span>
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={calculateResidential}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform active:scale-95"
                    >
                      Calculate Results
                    </button>
                    <button
                      onClick={() => resetForm('residential')}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg"
                    >
                      Reset Form
                    </button>
                  </div>

                  {results.residential.feasibleCapacity && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                      <ResultCard 
                        label="Approx Feasible RTS Capacity" 
                        value={`${results.residential.feasibleCapacity} kW`} 
                        highlight
                      />
                      <ResultCard 
                        label="Total Installation Cost" 
                        value={formatCurrency(results.residential.installationCost)} 
                      />
                      <ResultCard 
                        label="Central Subsidy (PM Surya Ghar)" 
                        value={formatCurrency(results.residential.centralSubsidy)} 
                        highlight
                      />
                      <ResultCard 
                        label="State Subsidy" 
                        value={formatCurrency(results.residential.stateSubsidy)} 
                      />
                      <ResultCard 
                        label="Total Capital Subsidy" 
                        value={formatCurrency(results.residential.totalSubsidy)} 
                        highlight
                      />
                      <ResultCard 
                        label="Effective Cost to You" 
                        value={formatCurrency(results.residential.effectiveCost)} 
                        highlight
                        isLarge
                      />
                      <ResultCard 
                        label="Monthly Generation Based Incentive" 
                        value={formatCurrency(results.residential.monthlyGenerationIncentive)} 
                      />
                      <ResultCard 
                        label="Monthly Electricity Bill Savings" 
                        value={formatCurrency(results.residential.monthlySavings)} 
                      />
                      <ResultCard 
                        label="Total Monthly Benefits" 
                        value={formatCurrency(results.residential.totalMonthlyBenefits)} 
                        highlight
                      />
                      <ResultCard 
                        label="Investment Payback Period" 
                        value={`${results.residential.paybackMonths} months`} 
                        highlight
                        isLarge
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Commercial Form */}
              {activeTab === 'commercial' && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FormInput
                      label="Electricity Consumption (per month in kWh)"
                      value={formData.commercial.electricity}
                      onChange={(e) => updateFormData('commercial', 'electricity', e.target.value)}
                      placeholder="e.g., 1000"
                    />
                    <FormInput
                      label="Approx Rooftop Area (sqm)"
                      value={formData.commercial.area}
                      onChange={(e) => updateFormData('commercial', 'area', e.target.value)}
                      placeholder="e.g., 500"
                    />
                    <FormInput
                      label="Desired Solar Installation (kW)"
                      value={formData.commercial.capacity}
                      onChange={(e) => updateFormData('commercial', 'capacity', e.target.value)}
                      step="0.1"
                      placeholder="e.g., 25.0"
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-800 mb-2">
                        Consumer Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-3 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 bg-white text-gray-800 font-medium"
                        value={formData.commercial.type}
                        onChange={(e) => updateFormData('commercial', 'type', e.target.value)}
                        required
                      >
                        <option value="">Select consumer type</option>
                        <option value="Commercial">Commercial (₹8/unit)</option>
                        <option value="Industrial">Industrial (₹7/unit)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={calculateCommercial}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform active:scale-95"
                    >
                      Calculate Results
                    </button>
                    <button
                      onClick={() => resetForm('commercial')}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg"
                    >
                      Reset Form
                    </button>
                  </div>

                  {results.commercial.feasibleCapacity && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                      <ResultCard 
                        label="Approx Feasible RTS Capacity" 
                        value={`${results.commercial.feasibleCapacity} kW`} 
                        highlight
                      />
                      <ResultCard 
                        label="Total Installation Cost" 
                        value={formatCurrency(results.commercial.installationCost)} 
                      />
                      <ResultCard 
                        label="Effective Cost to Consumer" 
                        value={formatCurrency(results.commercial.effectiveCost)} 
                        highlight
                        isLarge
                      />
                      <ResultCard 
                        label="Monthly Generation Based Incentive" 
                        value={formatCurrency(results.commercial.monthlyGBI)} 
                      />
                      <ResultCard 
                        label="Monthly Electricity Bill Savings" 
                        value={formatCurrency(results.commercial.monthlySavings)} 
                      />
                      <ResultCard 
                        label="Total Monthly Benefits" 
                        value={formatCurrency(results.commercial.totalMonthlyBenefits)} 
                        highlight
                      />
                      <ResultCard 
                        label="Investment Payback Period" 
                        value={`${results.commercial.paybackMonths} months`} 
                        highlight
                        isLarge
                      />
                    </div>
                  )}
                </div>
              )}

              {/* CGHS Single Form */}
              {activeTab === 'cghsSingle' && (
                <div className="space-y-8">
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-6">
                    <p className="text-sm font-medium text-yellow-800">
                      <strong>Note:</strong> Maximum capacity allowed for CGHS Single Point connection is 500kW.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormInput
                      label="Electricity Consumption (per month in kWh)"
                      value={formData.cghsSingle.electricity}
                      onChange={(e) => updateFormData('cghsSingle', 'electricity', e.target.value)}
                      placeholder="e.g., 800"
                    />
                    <FormInput
                      label="Approx Rooftop Area (sqm)"
                      value={formData.cghsSingle.area}
                      onChange={(e) => updateFormData('cghsSingle', 'area', e.target.value)}
                      placeholder="e.g., 400"
                    />
                    <FormInput
                      label="Desired Solar Installation (kW)"
                      value={formData.cghsSingle.capacity}
                      onChange={(e) => updateFormData('cghsSingle', 'capacity', e.target.value)}
                      step="0.1"
                      max="500"
                      placeholder="Max 500kW"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={calculateCghsSingle}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform active:scale-95"
                    >
                      Calculate Results
                    </button>
                    <button
                      onClick={() => resetForm('cghsSingle')}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg"
                    >
                      Reset Form
                    </button>
                  </div>

                  {results.cghsSingle.feasibleCapacity && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                      <ResultCard 
                        label="Approx Feasible RTS Capacity" 
                        value={`${results.cghsSingle.feasibleCapacity} kW`} 
                        highlight
                      />
                      <ResultCard 
                        label="Total Installation Cost" 
                        value={formatCurrency(results.cghsSingle.installationCost)} 
                      />
                      <ResultCard 
                        label="Central Subsidy" 
                        value={formatCurrency(results.cghsSingle.centralSubsidy)} 
                        highlight
                      />
                      <ResultCard 
                        label="State Subsidy" 
                        value={formatCurrency(results.cghsSingle.stateSubsidy)} 
                      />
                      <ResultCard 
                        label="Total Capital Subsidy" 
                        value={formatCurrency(results.cghsSingle.totalSubsidy)} 
                        highlight
                      />
                      <ResultCard 
                        label="Effective Cost to Consumer" 
                        value={formatCurrency(results.cghsSingle.effectiveCost)} 
                        highlight
                        isLarge
                      />
                      <ResultCard 
                        label="Monthly Generation Based Incentive" 
                        value={formatCurrency(results.cghsSingle.monthlyGBI)} 
                      />
                      <ResultCard 
                        label="Monthly Electricity Bill Savings" 
                        value={formatCurrency(results.cghsSingle.monthlySavings)} 
                      />
                      <ResultCard 
                        label="Total Monthly Benefits" 
                        value={formatCurrency(results.cghsSingle.totalMonthlyBenefits)} 
                        highlight
                      />
                      <ResultCard 
                        label="Investment Payback Period" 
                        value={`${results.cghsSingle.paybackMonths} months`} 
                        highlight
                        isLarge
                      />
                    </div>
                  )}
                </div>
              )}

              {/* CGHS Multi Form */}
              {activeTab === 'cghsMulti' && (
                <div className="space-y-8">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
                    <p className="text-sm font-medium text-blue-800">
                      <strong>CGHS Multi Point:</strong> Suitable for larger installations with multiple connection points for better distribution.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormInput
                      label="Electricity Consumption (per month in kWh)"
                      value={formData.cghsMulti.electricity}
                      onChange={(e) => updateFormData('cghsMulti', 'electricity', e.target.value)}
                      placeholder="e.g., 1200"
                    />
                    <FormInput
                      label="Approx Rooftop Area (sqm)"
                      value={formData.cghsMulti.area}
                      onChange={(e) => updateFormData('cghsMulti', 'area', e.target.value)}
                      placeholder="e.g., 600"
                    />
                    <FormInput
                      label="Desired Solar Installation (kW)"
                      value={formData.cghsMulti.capacity}
                      onChange={(e) => updateFormData('cghsMulti', 'capacity', e.target.value)}
                      step="0.1"
                      placeholder="e.g., 50.0"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={calculateCghsMulti}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 transform active:scale-95"
                    >
                      Calculate Results
                    </button>
                    <button
                      onClick={() => resetForm('cghsMulti')}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg"
                    >
                      Reset Form
                    </button>
                  </div>

                  {results.cghsMulti.feasibleCapacity && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                      <ResultCard 
                        label="Approx Feasible RTS Capacity" 
                        value={`${results.cghsMulti.feasibleCapacity} kW`} 
                        highlight
                      />
                      <ResultCard 
                        label="Total Installation Cost" 
                        value={formatCurrency(results.cghsMulti.installationCost)} 
                      />
                      <ResultCard 
                        label="Central Subsidy" 
                        value={formatCurrency(results.cghsMulti.centralSubsidy)} 
                        highlight
                      />
                      <ResultCard 
                        label="State Subsidy" 
                        value={formatCurrency(results.cghsMulti.stateSubsidy)} 
                      />
                      <ResultCard 
                        label="Total Capital Subsidy" 
                        value={formatCurrency(results.cghsMulti.totalSubsidy)} 
                        highlight
                      />
                      <ResultCard 
                        label="Effective Cost to Consumer" 
                        value={formatCurrency(results.cghsMulti.effectiveCost)} 
                        highlight
                        isLarge
                      />
                      <ResultCard 
                        label="Monthly Generation Based Incentive" 
                        value={formatCurrency(results.cghsMulti.monthlyGBI)} 
                      />
                      <ResultCard 
                        label="Monthly Electricity Bill Savings" 
                        value={formatCurrency(results.cghsMulti.monthlySavings)} 
                      />
                      <ResultCard 
                        label="Total Monthly Benefits" 
                        value={formatCurrency(results.cghsMulti.totalMonthlyBenefits)} 
                        highlight
                      />
                      <ResultCard 
                        label="Investment Payback Period" 
                        value={`${results.cghsMulti.paybackMonths} months`} 
                        highlight
                        isLarge
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 shadow-xl border border-green-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Why Choose Solar Energy?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Clean Energy</h4>
                <p className="text-gray-600 text-sm">Generate electricity from renewable solar energy, reducing carbon footprint</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Cost Savings</h4>
                <p className="text-gray-600 text-sm">Reduce electricity bills significantly with government subsidies and incentives</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">Long Term Investment</h4>
                <p className="text-gray-600 text-sm">25+ years of clean energy generation with minimal maintenance required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

   
     
    </div>
  );
};

export default SolarCalculator;