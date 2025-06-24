import React, { useState } from 'react';
import { Plane, Car, Ship, AlertTriangle, CheckCircle, Clock, Heart } from 'lucide-react';

interface TravelGuidelinesProps {
  kb: any; // KnowledgeBaseService type
}

export const EnhancedTravelGuidelines: React.FC<TravelGuidelinesProps> = ({ kb }) => {
  const [activeMode, setActiveMode] = useState<string>('general');

  const travelModes = [
    { id: 'general', label: 'General Guidelines', icon: Heart },
    { id: 'car', label: 'Car Travel', icon: Car },
    { id: 'airplane', label: 'Air Travel', icon: Plane },
    { id: 'cruise', label: 'Cruise Travel', icon: Ship }
  ];

  const generalGuidelines = {
    bestTime: {
      period: 'Second trimester (14-28 weeks)',
      reasons: [
        'Morning sickness has usually subsided',
        'Energy levels are typically higher',
        'Risk of miscarriage has decreased significantly',
        'Not yet uncomfortable from size',
        'Lower risk of preterm labor'
      ]
    },
    beforeTravel: [
      'Always consult your doctor before making travel plans',
      'Get written permission for travel, especially if high-risk',
      'Carry medical records and emergency contact information',
      'Research pregnancy-safe healthcare facilities at destination',
      'Check insurance coverage for pregnancy-related care while traveling',
      'Ensure destination has adequate medical facilities'
    ],
    emergencyPrep: [
      'Carry copies of medical records and insurance cards',
      'Know how to contact your doctor while traveling',
      'Research pregnancy-friendly hospitals at your destination',
      'Pack extra medications and prenatal vitamins',
      'Have a plan for early labor if traveling in third trimester',
      'Keep your provider\'s contact information easily accessible'
    ]
  };

  const carTravel = {
    safety: [
      'Wear lap belt below your abdomen and over your upper thighs',
      'Wear diagonal shoulder strap between your breasts and over your shoulder',
      'Adjust seat position for comfort and airbag safety (at least 10 inches from steering wheel)',
      'Never turn off airbags - they\'re safer than not having them',
      'Consider a seat belt adjuster for better positioning'
    ],
    timeRecommendations: [
      'Avoid staying seated for more than 2 hours at a time',
      'Take breaks every 1-2 hours to walk and stretch',
      'Limit total car time to 6 hours per day',
      'Plan for extra travel time due to frequent stops',
      'Consider splitting long trips over multiple days'
    ],
    comfort: [
      'Keep snacks and water easily accessible',
      'Have a travel pillow for lower back support',
      'Wear comfortable, loose clothing',
      'Plan routes with clean restroom facilities',
      'Keep emergency kit with snacks and water',
      'Adjust mirrors before starting to avoid twisting'
    ],
    avoid: [
      'Very long trips in third trimester without medical clearance',
      'Travel if experiencing complications or bleeding',
      'Travel during last 4 weeks of pregnancy unless necessary',
      'Driving when feeling dizzy, nauseous, or very fatigued'
    ]
  };

  const airTravel = {
    whenToFly: {
      safest: '14-28 weeks (second trimester)',
      restrictions: 'Most airlines restrict travel after 36 weeks',
      documentation: 'Many require doctor\'s note after 28-32 weeks'
    },
    preparation: [
      'Book aisle seat for easier bathroom access and leg stretching',
      'Check airline policies for pregnant passengers',
      'Bring medical records and doctor\'s note if required',
      'Pack prenatal vitamins in carry-on luggage',
      'Consider travel insurance that covers pregnancy',
      'Arrive early to allow time for additional security screening'
    ],
    duringFlight: [
      'Wear compression socks to prevent blood clots',
      'Stay hydrated but limit caffeine',
      'Walk around every hour during flight',
      'Avoid raw or undercooked airplane meals',
      'Request pre-boarding assistance if needed',
      'Keep seatbelt fastened below belly when seated'
    ],
    avoid: [
      'Flying after 36 weeks (most airline restrictions)',
      'Travel to high-altitude destinations without medical clearance',
      'Very early morning flights if experiencing morning sickness',
      'Travel if recent bleeding or complications',
      'International travel without adequate travel insurance'
    ],
    tips: [
      'Choose direct flights when possible to minimize travel time',
      'Pack healthy snacks in carry-on',
      'Bring entertainment for potential delays',
      'Consider upgrading seat for extra legroom if budget allows',
      'Check visa requirements - some countries restrict entry for pregnant women'
    ]
  };

  const cruiseTravel = {
    restrictions: [
      'Most cruise lines don\'t allow travel after 24-28 weeks',
      'Check specific cruise line pregnancy policies before booking',
      'Some cruise lines require medical clearance after 24 weeks',
      'May not be allowed to board if showing obvious signs of pregnancy',
      'Emergency medical evacuation from ship can be complicated and expensive'
    ],
    considerations: [
      'Choose ships with medical facilities and doctor on board',
      'Avoid cruises to areas with Zika or other pregnancy risks',
      'Consider seasickness effects on pregnancy',
      'Research medical facilities at ports of call',
      'Book travel insurance that specifically covers pregnancy',
      'Choose cabin with balcony for fresh air access'
    ],
    onBoard: [
      'Bring extra pregnancy medications',
      'Stay hydrated and eat regularly',
      'Avoid raw or undercooked foods',
      'Use handrails on stairs and decks',
      'Be extra cautious around pools and wet areas',
      'Avoid hot tubs and saunas (overheating risk)'
    ],
    safety: [
      'Pack seasickness remedies safe for pregnancy',
      'Be extra cautious with buffet foods',
      'Avoid alcohol completely',
      'Use sunscreen and stay hydrated in tropical climates',
      'Know location of medical center on ship',
      'Consider shorter cruises to reduce risk'
    ]
  };

  const renderGeneral = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">Best Time to Travel</h3>
        <div className="bg-blue-100 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-blue-900 mb-2">{generalGuidelines.bestTime.period}</h4>
          <ul className="space-y-1">
            {generalGuidelines.bestTime.reasons.map((reason, i) => (
              <li key={i} className="text-sm text-blue-800 flex items-start">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Before You Travel</h3>
          <ul className="space-y-2">
            {generalGuidelines.beforeTravel.map((item, i) => (
              <li key={i} className="text-sm text-green-800 flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Emergency Preparedness</h3>
          <ul className="space-y-2">
            {generalGuidelines.emergencyPrep.map((item, i) => (
              <li key={i} className="text-sm text-purple-800 flex items-start">
                <AlertTriangle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderCarTravel = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-xl font-semibold text-green-900 mb-4">Car Travel Safety</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3">Proper Seatbelt Use</h4>
            <ul className="space-y-2">
              {carTravel.safety.map((item, i) => (
                <li key={i} className="text-sm text-green-800 flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Time Recommendations</h4>
            <ul className="space-y-2">
              {carTravel.timeRecommendations.map((item, i) => (
                <li key={i} className="text-sm text-blue-800 flex items-start">
                  <Clock className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3">Comfort Tips</h4>
            <ul className="space-y-2">
              {carTravel.comfort.map((item, i) => (
                <li key={i} className="text-sm text-purple-800 flex items-start">
                  <Heart className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-3">What to Avoid</h4>
            <ul className="space-y-2">
              {carTravel.avoid.map((item, i) => (
                <li key={i} className="text-sm text-red-800 flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAirTravel = () => (
    <div className="space-y-6">
      <div className="bg-sky-50 p-6 rounded-lg border border-sky-200">
        <h3 className="text-xl font-semibold text-sky-900 mb-4">Air Travel Guidelines</h3>
        
        <div className="bg-sky-100 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-sky-900 mb-2">When to Fly</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-sky-800">Safest Period:</p>
              <p className="text-sky-700">{airTravel.whenToFly.safest}</p>
            </div>
            <div>
              <p className="font-medium text-sky-800">Airline Restrictions:</p>
              <p className="text-sky-700">{airTravel.whenToFly.restrictions}</p>
            </div>
            <div>
              <p className="font-medium text-sky-800">Documentation:</p>
              <p className="text-sky-700">{airTravel.whenToFly.documentation}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-sky-200">
              <h4 className="font-semibold text-sky-900 mb-3">Pre-Flight Preparation</h4>
              <ul className="space-y-2">
                {airTravel.preparation.map((item, i) => (
                  <li key={i} className="text-sm text-sky-800 flex items-start">
                    <CheckCircle className="w-4 h-4 text-sky-600 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-3">Helpful Tips</h4>
              <ul className="space-y-2">
                {airTravel.tips.map((item, i) => (
                  <li key={i} className="text-sm text-purple-800 flex items-start">
                    <Heart className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">During Flight</h4>
              <ul className="space-y-2">
                {airTravel.duringFlight.map((item, i) => (
                  <li key={i} className="text-sm text-blue-800 flex items-start">
                    <Plane className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-900 mb-3">What to Avoid</h4>
              <ul className="space-y-2">
                {airTravel.avoid.map((item, i) => (
                  <li key={i} className="text-sm text-red-800 flex items-start">
                    <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCruiseTravel = () => (
    <div className="space-y-6">
      <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
        <h3 className="text-xl font-semibold text-teal-900 mb-4">Cruise Travel Considerations</h3>
        
        <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-200">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900">Important Note</h4>
              <p className="text-amber-800 text-sm mt-1">
                Cruise travel during pregnancy requires extra planning and consideration. Many cruise lines have strict policies 
                about pregnant passengers, and medical care at sea is limited.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-900 mb-3">Restrictions & Policies</h4>
              <ul className="space-y-2">
                {cruiseTravel.restrictions.map((item, i) => (
                  <li key={i} className="text-sm text-red-800 flex items-start">
                    <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-3">Important Considerations</h4>
              <ul className="space-y-2">
                {cruiseTravel.considerations.map((item, i) => (
                  <li key={i} className="text-sm text-orange-800 flex items-start">
                    <Ship className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">On-Board Guidelines</h4>
              <ul className="space-y-2">
                {cruiseTravel.onBoard.map((item, i) => (
                  <li key={i} className="text-sm text-blue-800 flex items-start">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">Safety Tips</h4>
              <ul className="space-y-2">
                {cruiseTravel.safety.map((item, i) => (
                  <li key={i} className="text-sm text-green-800 flex items-start">
                    <Heart className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Plane className="w-8 h-8 mr-2 text-blue-600" />
          Complete Travel Guidelines During Pregnancy
        </h2>

        {/* Travel Mode Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {travelModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeMode === mode.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <mode.icon className="w-4 h-4 mr-2" />
              {mode.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeMode === 'general' && renderGeneral()}
        {activeMode === 'car' && renderCarTravel()}
        {activeMode === 'airplane' && renderAirTravel()}
        {activeMode === 'cruise' && renderCruiseTravel()}

        {/* Final Reminder */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Remember</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="space-y-2">
              <p>• <strong>Always consult your healthcare provider</strong> before making travel plans</p>
              <p>• <strong>Choose the fastest route</strong> to your destination when possible</p>
              <p>• <strong>Stay hydrated</strong> and move frequently during all types of travel</p>
            </div>
            <div className="space-y-2">
              <p>• <strong>Pack extra medications</strong> and carry medical records</p>
              <p>• <strong>Research medical facilities</strong> at your destination</p>
              <p>• <strong>Trust your instincts</strong> - if something feels wrong, seek medical attention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};