import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const VehicleDetailPage = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFinanceCalculator, setShowFinanceCalculator] = useState(false);
  const [financeData, setFinanceData] = useState({
    downPayment: '',
    interestRate: '7.5',
    termMonths: '72'
  });

  useEffect(() => {
    fetchVehicle();
  }, [vehicleId]);

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(`${API}/customer/vehicles/${vehicleId}`);
      setVehicle(response.data);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      navigate('/customer-inventory');
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthlyPayment = () => {
    const principal = vehicle.price - (parseFloat(financeData.downPayment) || 0);
    const monthlyRate = parseFloat(financeData.interestRate) / 100 / 12;
    const numPayments = parseInt(financeData.termMonths);

    if (monthlyRate === 0) {
      return (principal / numPayments).toFixed(2);
    }

    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return monthlyPayment.toFixed(2);
  };

  const submitInquiry = () => {
    alert('Inquiry submitted! A representative will contact you shortly.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading vehicle details...</div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Vehicle not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/customer-inventory')}
              className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 7l-.867-2.006A2 2 0 0 0 16.246 4H7.754a2 2 0 0 0-1.887 1.006L5 7H3v11a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7h-2z"/>
              </svg>
              Back to Inventory
            </button>
            <h1 className="text-lg font-bold text-white">Vehicle Details</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vehicle Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-400">
            <span>Stock: {vehicle.stock_number || 'N/A'}</span>
            <span>VIN: {vehicle.vin || 'Available upon request'}</span>
            <span>Mileage: {vehicle.mileage?.toLocaleString()} miles</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="bg-gray-800 rounded-2xl overflow-hidden mb-4">
              {vehicle.images && vehicle.images.length > 0 ? (
                <img
                  src={vehicle.images[selectedImageIndex]}
                  alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-1.26-3.78A2 2 0 0 0 15.84 4H8.16a2 2 0 0 0-1.9 1.22L5 9H3v11a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h-2zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {vehicle.images.slice(0, 12).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-yellow-400' : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Vehicle Specifications */}
            <div className="mt-8 bg-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Vehicle Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year:</span>
                    <span className="text-white font-medium">{vehicle.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Make:</span>
                    <span className="text-white font-medium">{vehicle.make}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Model:</span>
                    <span className="text-white font-medium">{vehicle.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mileage:</span>
                    <span className="text-white font-medium">{vehicle.mileage?.toLocaleString()} miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Condition:</span>
                    <span className="text-white font-medium capitalize">{vehicle.condition}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transmission:</span>
                    <span className="text-white font-medium">{vehicle.transmission || 'Automatic'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fuel Type:</span>
                    <span className="text-white font-medium">{vehicle.fuel_type || 'Gasoline'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Drivetrain:</span>
                    <span className="text-white font-medium">{vehicle.drivetrain || 'FWD'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Exterior Color:</span>
                    <span className="text-white font-medium">{vehicle.exterior_color || 'Available upon request'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Interior Color:</span>
                    <span className="text-white font-medium">{vehicle.interior_color || 'Available upon request'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dealer Information */}
            <div className="mt-8 bg-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Dealer Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Dealership:</span>
                  <span className="text-white font-medium">{vehicle.dealer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white font-medium">
                    {vehicle.dealer_city}, {vehicle.dealer_state}
                  </span>
                </div>
                {vehicle.dealer_phone && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white font-medium">{vehicle.dealer_phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Price & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Price Card */}
              <div className="bg-gray-800 rounded-2xl p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400">
                    ${vehicle.price?.toLocaleString()}
                  </div>
                  <div className="text-gray-400 mt-2">
                    {vehicle.images?.length || 0} photos • {vehicle.mileage?.toLocaleString()} miles
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={submitInquiry}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Get More Info
                  </button>
                  
                  <button
                    onClick={() => setShowFinanceCalculator(!showFinanceCalculator)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Calculate Payment
                  </button>
                  
                  <button
                    onClick={() => window.open(`tel:${vehicle.dealer_phone || '555-123-4567'}`)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Call Dealer
                  </button>
                </div>
              </div>

              {/* Finance Calculator */}
              {showFinanceCalculator && (
                <div className="bg-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Payment Calculator</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Down Payment</label>
                      <input
                        type="number"
                        value={financeData.downPayment}
                        onChange={(e) => setFinanceData(prev => ({ ...prev, downPayment: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
                        placeholder="$3,000"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Interest Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={financeData.interestRate}
                        onChange={(e) => setFinanceData(prev => ({ ...prev, interestRate: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Loan Term</label>
                      <select
                        value={financeData.termMonths}
                        onChange={(e) => setFinanceData(prev => ({ ...prev, termMonths: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-400"
                      >
                        <option value="36">36 months</option>
                        <option value="48">48 months</option>
                        <option value="60">60 months</option>
                        <option value="72">72 months</option>
                        <option value="84">84 months</option>
                      </select>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Estimated Payment:</span>
                        <span className="text-yellow-400 font-bold text-lg">
                          ${calculateMonthlyPayment()}/mo
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs mt-2">
                        Estimate only. Actual terms may vary.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;