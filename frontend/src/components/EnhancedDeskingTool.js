import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EnhancedDeskingTool = () => {
  const [calculation, setCalculation] = useState({
    // Vehicle Info
    vehiclePrice: '',
    tradeValue: '',
    downPayment: '',

    // Finance Terms
    interestRate: '7.5',
    loanTerm: '72',

    // Add-ons (VSC & GAP)
    extendedWarranty: '',
    gapInsurance: '',
    creditLife: '',
    disabilityInsurance: '',
    serviceContract: '',

    // Taxes and Fees
    salesTaxRate: '9.25',
    docFee: '699',
    titleFee: '75',
    registrationFee: '24',

    result: null
  });

  const [activeTab, setActiveTab] = useState('calculator');

  // NVP Warranty Plans (sample data)
  const warrantyPlans = {
    good: [
      { name: 'Powertrain', coverage: '60 months/60k miles', price: 1295 },
      { name: '3 Star', coverage: '48 months/48k miles', price: 1595 }
    ],
    better: [
      { name: '4 Star', coverage: '60 months/60k miles', price: 1995 },
      { name: '5 Star', coverage: '72 months/75k miles', price: 2395 }
    ],
    best: [
      { name: 'Exclusionary', coverage: '84 months/100k miles', price: 2995 },
      { name: 'Exclusionary Plus', coverage: '96 months/125k miles', price: 3495 }
    ]
  };

  const gapOptions = [
    { name: 'Basic GAP', deductible: '$500', price: 795 },
    { name: 'Premium GAP', deductible: '$1000', price: 995 }
  ];

  const calculateDesking = async () => {
    try {
      const calcData = {
        vehicle_price: parseFloat(calculation.vehiclePrice) || 0,
        trade_value: parseFloat(calculation.tradeValue) || 0,
        down_payment: parseFloat(calculation.downPayment) || 0,
        extended_warranty: parseFloat(calculation.extendedWarranty) || 0,
        gap_insurance: parseFloat(calculation.gapInsurance) || 0,
        credit_life: parseFloat(calculation.creditLife) || 0,
        disability_insurance: parseFloat(calculation.disabilityInsurance) || 0,
        service_contract: parseFloat(calculation.serviceContract) || 0,
        sales_tax_rate: parseFloat(calculation.salesTaxRate) / 100,
        doc_fee: parseFloat(calculation.docFee) || 0,
        title_fee: parseFloat(calculation.titleFee) || 0,
        registration_fee: parseFloat(calculation.registrationFee) || 0,
        interest_rate: parseFloat(calculation.interestRate) || 0,
        loan_term: parseInt(calculation.loanTerm) || 72
      };

      const response = await axios.post(`${API}/desking/calculate`, calcData);
      setCalculation(prev => ({ ...prev, result: response.data }));
    } catch (error) {
      console.error('Error calculating:', error);
      alert('Error calculating payment. Please check your inputs.');
    }
  };

  const startDeal = () => {
    alert('Deal structure saved! Moving to finance application...');
    // Here you would normally navigate to finance application or save deal
  };

  const addWarranty = (plan) => {
    setCalculation(prev => ({ ...prev, extendedWarranty: plan.price.toString() }));
  };

  const addGap = (gap) => {
    setCalculation(prev => ({ ...prev, gapInsurance: gap.price.toString() }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="bg-gray-800 rounded-2xl p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8">Enhanced Desking Tool</h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 mr-4 mb-2 rounded-t-lg transition-colors ${
              activeTab === 'calculator' 
                ? 'bg-yellow-400 text-gray-900' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Payment Calculator
          </button>
          <button
            onClick={() => setActiveTab('warranties')}
            className={`px-4 py-2 mr-4 mb-2 rounded-t-lg transition-colors ${
              activeTab === 'warranties' 
                ? 'bg-yellow-400 text-gray-900' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            VSC & Warranties
          </button>
          <button
            onClick={() => setActiveTab('gap')}
            className={`px-4 py-2 mr-4 mb-2 rounded-t-lg transition-colors ${
              activeTab === 'gap' 
                ? 'bg-yellow-400 text-gray-900' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            GAP Insurance
          </button>
        </div>

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2 text-sm md:text-base">Vehicle Price</label>
                  <input
                    type="number"
                    value={calculation.vehiclePrice}
                    onChange={(e) => setCalculation(prev => ({ ...prev, vehiclePrice: e.target.value }))}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
                    placeholder="$25,000"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2 text-sm md:text-base">Trade-In Value</label>
                  <input
                    type="number"
                    value={calculation.tradeValue}
                    onChange={(e) => setCalculation(prev => ({ ...prev, tradeValue: e.target.value }))}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
                    placeholder="$8,000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2 text-sm md:text-base">Down Payment</label>
                  <input
                    type="number"
                    value={calculation.downPayment}
                    onChange={(e) => setCalculation(prev => ({ ...prev, downPayment: e.target.value }))}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
                    placeholder="$3,000"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2 text-sm md:text-base">Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={calculation.interestRate}
                    onChange={(e) => setCalculation(prev => ({ ...prev, interestRate: e.target.value }))}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
                    placeholder="7.5"
                  />
                </div>
              </div>

              {/* Add-ons Section */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-bold text-white mb-4">Add-ons & Protection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Extended Warranty</label>
                    <input
                      type="number"
                      value={calculation.extendedWarranty}
                      onChange={(e) => setCalculation(prev => ({ ...prev, extendedWarranty: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
                      placeholder="$2,495"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">GAP Insurance</label>
                    <input
                      type="number"
                      value={calculation.gapInsurance}
                      onChange={(e) => setCalculation(prev => ({ ...prev, gapInsurance: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
                      placeholder="$795"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Credit Life</label>
                    <input
                      type="number"
                      value={calculation.creditLife}
                      onChange={(e) => setCalculation(prev => ({ ...prev, creditLife: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
                      placeholder="$450"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Service Contract</label>
                    <input
                      type="number"
                      value={calculation.serviceContract}
                      onChange={(e) => setCalculation(prev => ({ ...prev, serviceContract: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
                      placeholder="$1,295"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={calculateDesking}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors"
                >
                  Calculate Payment
                </button>
                
                {calculation.result && (
                  <button
                    onClick={startDeal}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors"
                  >
                    Start Deal
                  </button>
                )}
              </div>
            </div>
            
            {/* Results */}
            {calculation.result && (
              <div className="bg-gray-700 rounded-xl p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4">Deal Structure</h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm md:text-base">Vehicle Price:</span>
                    <span className="text-white font-medium">${calculation.result.vehicle_price?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm md:text-base">Trade Value:</span>
                    <span className="text-white font-medium">-${calculation.result.trade_value?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm md:text-base">Down Payment:</span>
                    <span className="text-white font-medium">-${calculation.result.down_payment?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm md:text-base">Add-ons:</span>
                    <span className="text-white font-medium">+${calculation.result.total_add_ons?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm md:text-base">Tax & Fees:</span>
                    <span className="text-white font-medium">+${(calculation.result.sales_tax + calculation.result.total_fees)?.toLocaleString()}</span>
                  </div>
                  <hr className="border-gray-600" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm md:text-base">Amount Financed:</span>
                    <span className="text-white font-medium">${calculation.result.total_amount_financed?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm md:text-base">Monthly Payment:</span>
                    <span className="text-yellow-400 font-bold text-lg md:text-xl">${calculation.result.monthly_payment}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Warranties Tab */}
        {activeTab === 'warranties' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">NVP Vehicle Service Contracts</h3>
              <p className="text-gray-400">Protect your customer's investment with comprehensive coverage</p>
            </div>

            {Object.entries(warrantyPlans).map(([tier, plans]) => (
              <div key={tier} className="bg-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-bold text-white mb-4 capitalize">{tier} Plans</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plans.map((plan, index) => (
                    <div key={index} className="bg-gray-600 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-bold text-white">{plan.name}</h5>
                          <p className="text-gray-300 text-sm">{plan.coverage}</p>
                        </div>
                        <span className="text-yellow-400 font-bold">${plan.price}</span>
                      </div>
                      <button
                        onClick={() => addWarranty(plan)}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors mt-2"
                      >
                        Add to Deal
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GAP Tab */}
        {activeTab === 'gap' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">GAP Insurance Protection</h3>
              <p className="text-gray-400">Covers the difference between loan balance and vehicle value</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gapOptions.map((gap, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-white mb-2">{gap.name}</h4>
                  <p className="text-gray-300 mb-4">Deductible Coverage: {gap.deductible}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold text-xl">${gap.price}</span>
                    <button
                      onClick={() => addGap(gap)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      Add to Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedDeskingTool;