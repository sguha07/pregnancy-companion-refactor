import React, { useState } from 'react';
import { Shield, Car, Baby, AlertTriangle } from 'lucide-react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';
import { EnhancedStrollerGuide } from './EnhancedStrollerGuide';

interface BabyGearGuideProps {
  kb: KnowledgeBaseService;
}

export const BabyGearGuide: React.FC<BabyGearGuideProps> = ({ kb }) => {
  const [activeSection, setActiveSection] = useState<string>('carseat');
  const gearInfo = kb.getBabyGearInfo();

  // Enhanced data structure with comprehensive information
  const gearData = {
    carSeat: {
      types: ["Infant car seat", "Convertible car seat", "All-in-one car seat"],
      keySafety: [
        "5-point harness - must be properly adjusted and snug",
        "Rear-facing for infants (until at least 2 years old)",
        "Side impact and head protection features",
        "Must be properly installed by certified technician",
        "Never use a car seat that's been in an accident",
        "Check expiration date (usually 6-10 years)",
        "Register your car seat for recall notifications"
      ],
      buyingTips: [
        "Easy to install - try fitting in your car before buying",
        "Washable covers are essential for easy cleaning",
        "Choose based on child size and ease of use",
        "Consider travel system compatibility",
        "Look for LATCH system compatibility",
        "Check weight and height limits carefully"
      ],
      avoid: [
        "Don't place car seat in front seat with active airbag",
        "Avoid expired or used seats without known history",
        "Don't turn forward-facing too soon",
        "Never use as a crib or leave baby unattended",
        "Avoid aftermarket products not approved by manufacturer"
      ],
      ageRange: "Birth to booster age (varies by model)",
      specialNotes: [
        "Rear-facing until at least 2 years old (longer is safer)",
        "Get installation checked by a certified technician",
        "Replace car seat after any moderate or severe crash",
        "Never leave a child unattended in a car seat"
      ]
    },
    crib: {
      types: ["Standard crib (non-drop side only)", "Convertible crib", "Mini crib", "Portable crib"],
      keySafety: [
        "Slats no more than 2⅜ inches apart",
        "Firm mattress that fits tightly with no gaps",
        "Lead-free paint and non-toxic finishes",
        "No missing, broken, or loose parts",
        "No corner posts higher than 1/16 inch",
        "Meets current CPSC safety standards (2011+)",
        "Hardware should be secure and regularly checked"
      ],
      buyingTips: [
        "Ensure it meets current safety standards",
        "Comes with complete manual and all hardware",
        "Newer is generally safer than vintage cribs",
        "Consider convertible options for longevity",
        "Check for easy mattress height adjustment",
        "Ensure good build quality and stability"
      ],
      avoid: [
        "Avoid loose bedding, toys, bumpers, or pillows",
        "No drop-side cribs (banned due to safety issues)",
        "Avoid broken or used cribs not meeting current standards",
        "Don't use cribs with decorative cutouts",
        "Avoid cribs with missing parts or hardware"
      ],
      ageRange: "Birth through toddler stage (until child climbs out)",
      specialNotes: [
        "Always place baby on back to sleep",
        "Keep crib bare - no blankets, bumpers, or toys",
        "Use a fitted sheet only",
        "Room temperature should be comfortable for light sleeping"
      ]
    },
    stroller: {
      types: ["Full-size stroller", "Lightweight stroller", "Jogging stroller", "Travel system"],
      keySafety: [
        "5-point harness system that's easy to use but child-resistant",
        "Sturdy brakes that lock both rear wheels securely",
        "Wide wheelbase for stability and tip resistance",
        "Meets ASTM safety standards (F833)",
        "Easy to fold and unfold without pinching hazards",
        "Smooth rolling wheels appropriate for intended use",
        "Secure storage basket rather than handle hooks"
      ],
      buyingTips: [
        "Test fold/unfold mechanism multiple times in store",
        "Check if it fits in your car trunk when folded",
        "Ensure handlebar height is comfortable",
        "Test maneuverability by pushing around store",
        "Check weight limits for both infant and toddler stages",
        "Consider your lifestyle and terrain needs"
      ],
      avoid: [
        "Strollers with scissors-like folding mechanisms",
        "Sharp edges or protruding parts",
        "Insufficient braking system (only one wheel)",
        "Strollers that tip easily when loaded",
        "Models with recent safety recalls"
      ],
      ageRange: "Varies by type (birth to 50+ lbs depending on model)",
      specialNotes: [
        "Always use safety harness, even for short trips",
        "Never hang heavy bags on handlebar",
        "Check brakes before each use",
        "Follow weight limits and age recommendations"
      ]
    },
    babyCarrier: {
      types: ["Soft structured carrier", "Wrap carrier", "Ring sling", "Mei tai"],
      keySafety: [
        "Baby's face should always be visible and airways clear",
        "Baby should be close enough to kiss on the head",
        "Proper weight distribution across carrier's body",
        "Adjustable and padded shoulder straps",
        "Secure waist belt for structured carriers",
        "Breathable fabric to prevent overheating"
      ],
      buyingTips: [
        "Choose adjustable models that fit multiple caregivers",
        "Cotton or bamboo for breathability",
        "Should allow both inward and outward facing",
        "Look for storage pockets if desired",
        "Try before buying if possible",
        "Check weight limits carefully"
      ],
      avoid: [
        "Carriers that don't support baby's airway",
        "Bag-style carriers that can curl baby's spine",
        "Carriers with loose or poorly-made straps",
        "Using carriers beyond weight limits",
        "Carriers where baby cannot be clearly seen"
      ],
      ageRange: "Birth to 35+ lbs (varies by carrier type)",
      specialNotes: [
        "Newborns need extra head and neck support",
        "Check baby's position frequently",
        "Ensure baby's chin is off chest",
        "Take breaks during extended wearing"
      ]
    }
  };

  const sections = [
    { id: 'carseat', label: 'Car Seat', icon: Car, data: gearData.carSeat },
    { id: 'crib', label: 'Crib', icon: Baby, data: gearData.crib },
    { id: 'stroller', label: 'Stroller', icon: Shield, data: gearData.stroller },
    { id: 'carrier', label: 'Baby Carrier', icon: Baby, data: gearData.babyCarrier }
  ];

  const activeData = sections.find(s => s.id === activeSection)?.data;

  const renderGeneralSection = () => (
    <div className="space-y-6">
      {activeData && (
        <div>
          <h3 className="text-xl font-semibold mb-4">
            {sections.find(s => s.id === activeSection)?.label} Safety Guide
          </h3>

          {/* Types */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-blue-900 mb-3">Types Available</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {activeData.types.map((type: string, i: number) => (
                <div key={i} className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  {type}
                </div>
              ))}
            </div>
            {activeData.ageRange && (
              <div className="mt-3 bg-blue-100 p-3 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Age Range:</strong> {activeData.ageRange}
                </p>
              </div>
            )}
          </div>

          {/* Safety Features */}
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-green-900 mb-3">Essential Safety Features</h4>
            <ul className="space-y-2 text-sm">
              {activeData.keySafety.map((feature: string, i: number) => (
                <li key={i} className="flex items-start">
                  <Shield className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Buying Tips */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-purple-900 mb-3">Smart Buying Tips</h4>
            <ul className="space-y-2 text-sm">
              {activeData.buyingTips.map((tip: string, i: number) => (
                <li key={i} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2 mt-2"></div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* What to Avoid */}
          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-red-900 mb-3">What to Avoid</h4>
            <ul className="space-y-2 text-sm">
              {activeData.avoid.map((item: string, i: number) => (
                <li key={i} className="flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-600 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Special Notes */}
          {activeData.specialNotes && (
            <div className="border border-orange-200 bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Important Safety Reminders</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                {activeData.specialNotes.map((note: string, i: number) => (
                  <li key={i}>• {note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderStrollerSection = () => (
    <EnhancedStrollerGuide kb={kb} />
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Shield className="w-8 h-8 mr-2 text-purple-600" />
          Complete Baby Gear Safety Guide
        </h2>

        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <p className="text-purple-800 text-sm">
            <strong>Choosing safe baby gear is crucial for your little one's protection.</strong> This comprehensive guide 
            covers the most important items you'll need, with detailed safety information and buying recommendations.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <section.icon className="w-4 h-4 mr-2" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeSection === 'stroller' ? renderStrollerSection() : renderGeneralSection()}

        {/* General Safety Reminder */}
        <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900">Universal Safety Reminders</h4>
              <ul className="text-amber-800 text-sm mt-2 space-y-1">
                <li>• Always register products for recall notifications</li>
                <li>• Follow manufacturer instructions exactly</li>
                <li>• Regularly inspect items for wear, damage, or loose parts</li>
                <li>• Keep all instruction manuals in a safe place</li>
                <li>• Never modify or add non-approved accessories</li>
                <li>• When in doubt about safety, contact the manufacturer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};