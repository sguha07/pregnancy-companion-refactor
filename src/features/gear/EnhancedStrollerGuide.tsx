import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, ShoppingCart, Star } from 'lucide-react';

interface StrollerGuideProps {
  kb: any; // KnowledgeBaseService type
}

export const EnhancedStrollerGuide: React.FC<StrollerGuideProps> = ({ kb }) => {
  const [activeTab, setActiveTab] = useState<string>('types');

  const tabs = [
    { id: 'types', label: 'Stroller Types', icon: ShoppingCart },
    { id: 'safety', label: 'Safety Features', icon: Shield },
    { id: 'buying', label: 'Buying Guide', icon: Star },
    { id: 'avoid', label: 'What to Avoid', icon: AlertTriangle }
  ];

  const strollerTypes = [
    {
      type: 'Full-Size Stroller',
      description: 'Comprehensive stroller with all features',
      features: [
        'Multiple seating positions (upright to fully reclined)',
        'Large storage basket underneath',
        'Adjustable handlebar height',
        'Full weather protection canopy',
        'Smooth suspension system'
      ],
      bestFor: 'Daily use, long walks, newborns to toddlers',
      ageRange: 'Birth to 50+ lbs',
      pros: ['Most comfortable for baby', 'Excellent storage', 'Smooth ride'],
      cons: ['Heavier and bulkier', 'Takes up more car/storage space']
    },
    {
      type: 'Lightweight Stroller',
      description: 'Compact and easy to maneuver',
      features: [
        'Weighs under 15-20 pounds',
        'Quick one-hand fold',
        'Compact when folded',
        'Basic recline positions',
        'Smaller storage basket'
      ],
      bestFor: 'Travel, quick errands, older babies who sit up',
      ageRange: '6 months to 40 lbs',
      pros: ['Easy to carry and store', 'Quick to fold/unfold', 'Great for travel'],
      cons: ['Less storage space', 'May not recline fully', 'Less stable on rough terrain']
    },
    {
      type: 'Jogging Stroller',
      description: 'Designed for active parents who run',
      features: [
        'Three large air-filled wheels',
        'Fixed front wheel for stability while running',
        'Hand brake for speed control',
        'Safety wrist strap',
        'Excellent suspension'
      ],
      bestFor: 'Running, hiking, rough terrain',
      ageRange: '6-8 months to 75 lbs (when baby can sit up unassisted)',
      pros: ['Excellent for exercise', 'Handles any terrain', 'Very stable'],
      cons: ['Not suitable for newborns', 'Heavier', 'Fixed wheel less maneuverable for walking']
    },
    {
      type: 'Travel System',
      description: 'Stroller and infant car seat combination',
      features: [
        'Infant car seat clicks directly into stroller base',
        'No need to wake sleeping baby when transferring',
        'Car seat can be used independently',
        'Stroller converts for toddler use',
        'Usually includes car seat base'
      ],
      bestFor: 'Newborns, families who drive frequently',
      ageRange: 'Birth to 35+ lbs (depending on components)',
      pros: ['Convenient car-to-stroller transfer', 'Good value', 'Grows with baby'],
      cons: ['Heavier when car seat attached', 'May be bulkier', 'Limited car seat upgrade options']
    }
  ];

  const safetyFeatures = [
    {
      feature: '5-Point Harness System',
      importance: 'Critical',
      description: 'Secures baby at shoulders, waist, and between legs',
      whyImportant: 'Prevents baby from sliding out or climbing out of stroller',
      whatToLook: 'Adjustable straps, padded crotch strap, easy-to-use but child-resistant buckles'
    },
    {
      feature: 'Sturdy Brakes That Lock',
      importance: 'Critical',
      description: 'Prevents stroller from rolling when parked',
      whyImportant: 'Essential for safety on any incline or when stopped',
      whatToLook: 'Easy to engage with foot, locks both rear wheels, red indicator when engaged'
    },
    {
      feature: 'Wide Wheelbase for Stability',
      importance: 'High',
      description: 'Prevents tipping over sideways or backwards',
      whyImportant: 'Reduces risk of stroller tipping, especially with diaper bag or shopping',
      whatToLook: 'Wide stance between wheels, low center of gravity, stable when pushing with one hand'
    },
    {
      feature: 'ASTM Safety Standards Compliance',
      importance: 'Critical',
      description: 'Meets rigorous safety testing requirements',
      whyImportant: 'Ensures stroller has passed standardized safety tests',
      whatToLook: 'ASTM F833 certification label, recent certification date'
    },
    {
      feature: 'Easy to Fold and Unfold',
      importance: 'Medium',
      description: 'Smooth folding mechanism that won\'t pinch fingers',
      whyImportant: 'Prevents injury and makes stroller practical to use',
      whatToLook: 'One-hand fold if possible, automatic locks when folded, finger guards'
    }
  ];

  const buyingTips = [
    {
      category: 'Before You Buy',
      tips: [
        'Test fold and unfold the stroller multiple times in the store',
        'Check if it fits in your car trunk when folded',
        'Ensure the handlebar height is comfortable for you and your partner',
        'Test the maneuverability by pushing it around the store',
        'Check weight limits for both infant and toddler stages'
      ]
    },
    {
      category: 'Essential Features to Consider',
      tips: [
        'Adjustable handlebar for different heights',
        'Large, accessible storage basket',
        'Easy-to-clean fabric (removable and machine washable)',
        'Good canopy coverage for sun and weather protection',
        'Smooth-rolling wheels appropriate for your terrain'
      ]
    },
    {
      category: 'Lifestyle Considerations',
      tips: [
        'City living: prioritize compact fold and maneuverability',
        'Suburban: consider storage space and car compatibility',
        'Active lifestyle: look into jogging stroller options',
        'Frequent flyers: check airline gate-check policies',
        'Multiple children: consider double stroller expandability'
      ]
    },
    {
      category: 'Budget Tips',
      tips: [
        'Consider buying a high-quality used stroller if budget is tight',
        'Look for sales during major shopping seasons',
        'Check if your insurance or employer offers baby gear discounts',
        'Register for a stroller as a group gift for baby shower',
        'Consider renting expensive strollers for special trips'
      ]
    }
  ];

  const avoidanceItems = [
    {
      hazard: 'Scissors-like Folding Mechanisms',
      risk: 'High',
      description: 'Can pinch or cut fingers when folding/unfolding',
      whatToLook: 'Older stroller designs with exposed hinges that close like scissors',
      safer: 'Modern strollers with covered hinges and finger guards'
    },
    {
      hazard: 'Sharp Edges or Protruding Parts',
      risk: 'Medium',
      description: 'Can cause cuts or bruises to parent or child',
      whatToLook: 'Metal edges, exposed screws, sharp plastic corners',
      safer: 'Rounded edges, covered hardware, smooth surfaces'
    },
    {
      hazard: 'Insufficient Braking System',
      risk: 'High',
      description: 'Stroller may roll away unexpectedly',
      whatToLook: 'Brakes that don\'t lock securely, only brake one wheel, hard to engage',
      safer: 'Dual-wheel braking, easy foot-operated brakes, clear engagement indicators'
    },
    {
      hazard: 'Strollers That Tip Easily',
      risk: 'High',
      description: 'Can tip over when baby leans or when bags are hung on handles',
      whatToLook: 'Narrow wheelbase, high center of gravity, tips when weight added to handles',
      safer: 'Wide wheelbase, low center of gravity, storage basket rather than handle hooks'
    },
    {
      hazard: 'Recalled Models',
      risk: 'High',
      description: 'May have known safety defects',
      whatToLook: 'Check CPSC website for recalls before buying, especially used strollers',
      safer: 'Register new strollers for recall notifications, avoid recalled models'
    },
    {
      hazard: 'Missing or Damaged Parts',
      risk: 'Medium',
      description: 'Compromises safety and functionality',
      whatToLook: 'Used strollers missing straps, broken wheels, damaged frames',
      safer: 'Complete inspection before purchase, ensure all safety features work'
    }
  ];

  const renderTypes = () => (
    <div className="space-y-6">
      {strollerTypes.map((stroller, index) => (
        <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">{stroller.type}</h3>
          <p className="text-blue-800 mb-4">{stroller.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {stroller.features.map((feature, i) => (
                    <li key={i} className="text-sm text-blue-700 flex items-start">
                      <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-blue-100 p-3 rounded">
                <p className="text-sm"><strong>Best For:</strong> {stroller.bestFor}</p>
                <p className="text-sm"><strong>Age Range:</strong> {stroller.ageRange}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-900 mb-2">Pros:</h4>
                <ul className="space-y-1">
                  {stroller.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-green-700 flex items-start">
                      <span className="text-green-600 mr-2">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-orange-900 mb-2">Considerations:</h4>
                <ul className="space-y-1">
                  {stroller.cons.map((con, i) => (
                    <li key={i} className="text-sm text-orange-700 flex items-start">
                      <span className="text-orange-600 mr-2">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSafety = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-green-900 mb-2">Essential Safety Features</h3>
        <p className="text-green-800 text-sm">
          These safety features are non-negotiable when choosing a stroller. Every stroller should have these basic protections.
        </p>
      </div>

      {safetyFeatures.map((feature, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{feature.feature}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              feature.importance === 'Critical' ? 'bg-red-100 text-red-800' :
              feature.importance === 'High' ? 'bg-orange-100 text-orange-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {feature.importance}
            </span>
          </div>
          
          <p className="text-gray-700 mb-3">{feature.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">Why It's Important:</h4>
              <p className="text-sm text-blue-800">{feature.whyImportant}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-semibold text-purple-900 mb-2">What to Look For:</h4>
              <p className="text-sm text-purple-800">{feature.whatToLook}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBuying = () => (
    <div className="space-y-6">
      {buyingTips.map((section, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            {section.category}
          </h3>
          
          <ul className="space-y-2">
            {section.tips.map((tip, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderAvoid = () => (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Safety Hazards to Avoid</h3>
        <p className="text-red-800 text-sm">
          These features or conditions can pose serious safety risks. Always inspect strollers carefully, especially when buying used.
        </p>
      </div>

      {avoidanceItems.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-red-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-red-900 flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              {item.hazard}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              item.risk === 'High' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
            }`}>
              {item.risk} Risk
            </span>
          </div>
          
          <p className="text-gray-700 mb-4">{item.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded">
              <h4 className="font-semibold text-red-900 mb-2">Watch Out For:</h4>
              <p className="text-sm text-red-800">{item.whatToLook}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-2">Safer Alternative:</h4>
              <p className="text-sm text-green-800">{item.safer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <ShoppingCart className="w-8 h-8 mr-2 text-blue-600" />
          Complete Stroller Safety Guide
        </h2>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-800 text-sm">
            <strong>Choosing the right stroller is crucial for your baby's safety and your convenience.</strong> This guide 
            covers everything you need to know about stroller types, essential safety features, and what to avoid.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'types' && renderTypes()}
        {activeTab === 'safety' && renderSafety()}
        {activeTab === 'buying' && renderBuying()}
        {activeTab === 'avoid' && renderAvoid()}

        {/* Important Safety Note */}
        <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900">Important Safety Reminders</h4>
              <ul className="text-amber-800 text-sm mt-2 space-y-1">
                <li>• Always use the safety harness, even for short trips</li>
                <li>• Never hang heavy bags on the handlebar - use the storage basket</li>
                <li>• Check brakes before each use, especially on inclines</li>
                <li>• Register your stroller for recall notifications</li>
                <li>• Follow weight limits and age recommendations</li>
                <li>• Inspect regularly for wear, damage, or loose parts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};