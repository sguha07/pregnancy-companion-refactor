import React, { useState } from 'react';
import { Clock, Heart, AlertTriangle, Calendar, Activity, CheckCircle } from 'lucide-react';

interface Week40PlusProps {
  kb: any; // KnowledgeBaseService type
  currentWeek: number;
}

export const EnhancedWeek40Plus: React.FC<Week40PlusProps> = ({ kb, currentWeek }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: Calendar },
    { id: 'monitoring', label: 'Monitoring', icon: Heart },
    { id: 'induction', label: 'Induction Info', icon: Activity },
    { id: 'waiting', label: 'While You Wait', icon: Clock }
  ];

  const timelineInfo = {
    "37-40weeks": { status: "Full term", description: "Normal delivery range" },
    "40-41weeks": { status: "Overdue", description: "Continue monitoring, may try membrane sweep" },
    "41-42weeks": { status: "Late term", description: "Closer observation, likely to recommend induction" },
    "42+weeks": { status: "Post-term", description: "Higher risk — induction usually recommended" }
  };

  const whyOverdue = [
    "Uncertain last period date or early ultrasounds weren't done",
    "First pregnancy (more likely to go overdue)",
    "Previous overdue pregnancies",
    "Family history of overdue pregnancies",
    "Having a boy (slightly more likely)",
    "Rarely, placenta or baby issues"
  ];

  const monitoringProcedures = [
    {
      procedure: "Fetal Heart Rate Monitoring",
      description: "Non-stress test to check baby's heartbeat patterns",
      frequency: "Usually twice weekly after 41 weeks",
      purpose: "Ensures baby is still doing well in the womb"
    },
    {
      procedure: "Ultrasound Assessment",
      description: "Checks baby's movement, breathing, and muscle tone",
      frequency: "Weekly or twice weekly",
      purpose: "Monitors baby's well-being and amniotic fluid levels"
    },
    {
      procedure: "Amniotic Fluid Check",
      description: "Measures amount of fluid around baby (oligohydramnios screening)",
      frequency: "With each ultrasound",
      purpose: "Low fluid can indicate placenta isn't functioning optimally"
    },
    {
      procedure: "Cervical Assessment",
      description: "Checks if cervix is beginning to soften, thin, or dilate",
      frequency: "At regular appointments",
      purpose: "Helps determine readiness for labor and delivery options"
    }
  ];

  const membraneSweeping = {
    what: "Provider inserts finger into cervix and sweeps around inner edges",
    purpose: "Releases hormones (like oxytocin) to potentially kickstart labor",
    when: "Usually offered around 41 weeks",
    benefits: [
      "Safe way to reduce need for medical induction",
      "Can be done in office without medication",
      "May help natural labor begin within 48 hours"
    ],
    expectations: [
      "May cause cramping and spotting for 24 hours",
      "Success rate varies - works for about 1 in 8 women",
      "Can be repeated if first attempt unsuccessful",
      "Not painful but may be uncomfortable"
    ]
  };

  const inductionMethods = {
    cervixSoftening: {
      method: "Prostaglandins medication",
      purpose: "Prepare cervix by making it softer and thinner",
      howGiven: "Gel, tablet, or insert placed near cervix",
      timeframe: "Several hours to overnight"
    },
    waterBreaking: {
      method: "Artificial rupture of membranes (AROM)",
      purpose: "Break amniotic sac to encourage contractions",
      howGiven: "Thin hook to make small opening in sac",
      timeframe: "Immediate, contractions usually start within hours"
    },
    contractions: {
      method: "Pitocin (synthetic oxytocin) IV",
      purpose: "Trigger or regulate contractions",
      howGiven: "Intravenous drip that can be adjusted",
      timeframe: "Contractions typically start within 30 minutes"
    }
  };

  const waitingTips = [
    {
      category: "Stay Active",
      tips: [
        "Take gentle walks daily (may help encourage labor)",
        "Do prenatal yoga or stretching",
        "Climb stairs (if comfortable)",
        "Bounce gently on birthing ball",
        "Swimming (if water hasn't broken)"
      ]
    },
    {
      category: "Rest and Nutrition",
      tips: [
        "Eat well-balanced meals to maintain energy",
        "Stay hydrated with plenty of water",
        "Get adequate sleep while you still can",
        "Take warm baths for relaxation",
        "Continue taking prenatal vitamins"
      ]
    },
    {
      category: "Mental Health",
      tips: [
        "Do relaxing activities (reading, music, crafts)",
        "Talk out frustrations with your support system",
        "Practice breathing and relaxation techniques",
        "Avoid setting specific 'deadline' expectations",
        "Remember that going overdue is very common"
      ]
    },
    {
      category: "Practical Preparation",
      tips: [
        "Finalize hospital bag and birth plan",
        "Ensure car seat is properly installed",
        "Stock up on postpartum supplies",
        "Prepare meals to freeze for after baby arrives",
        "Confirm childcare plans for other children"
      ]
    }
  ];

  const getCurrentStatus = () => {
    if (currentWeek >= 42) return timelineInfo["42+weeks"];
    if (currentWeek >= 41) return timelineInfo["41-42weeks"];
    if (currentWeek >= 40) return timelineInfo["40-41weeks"];
    return timelineInfo["37-40weeks"];
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">What Does "Overdue" Mean?</h3>
        <div className="bg-blue-100 p-4 rounded-lg mb-4">
          <p className="text-blue-800 mb-2">
            <strong>Your due date is just a best estimate — not an expiration date.</strong>
          </p>
          <p className="text-blue-700 text-sm">
            Most babies are born between 37 and 42 weeks. Only about 5% of babies are born on their actual due date!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(timelineInfo).map(([period, info]) => {
            const isCurrentPeriod = 
              (period === "40-41weeks" && currentWeek >= 40 && currentWeek < 41) ||
              (period === "41-42weeks" && currentWeek >= 41 && currentWeek < 42) ||
              (period === "42+weeks" && currentWeek >= 42) ||
              (period === "37-40weeks" && currentWeek >= 37 && currentWeek < 40);

            return (
              <div key={period} className={`p-4 rounded-lg border ${
                isCurrentPeriod 
                  ? 'bg-yellow-100 border-yellow-300 ring-2 ring-yellow-400' 
                  : 'bg-white border-gray-200'
              }`}>
                <h4 className={`font-semibold mb-1 ${
                  isCurrentPeriod ? 'text-yellow-900' : 'text-gray-900'
                }`}>
                  {period.replace('weeks', ' weeks')}
                </h4>
                <p className={`text-sm font-medium ${
                  isCurrentPeriod ? 'text-yellow-800' : 'text-blue-700'
                }`}>
                  {info.status}
                </p>
                <p className={`text-sm ${
                  isCurrentPeriod ? 'text-yellow-700' : 'text-gray-600'
                }`}>
                  {info.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-900 mb-4">Why Might You Go Overdue?</h3>
        <p className="text-amber-800 text-sm mb-3">
          You're more likely to go past your due date if:
        </p>
        <ul className="space-y-2">
          {whyOverdue.map((reason, i) => (
            <li key={i} className="text-sm text-amber-700 flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-900 mb-2">Important Reminder</h4>
        <p className="text-green-800 text-sm">
          Going overdue is common and usually not dangerous with proper monitoring. Your healthcare team 
          will keep a close eye on both you and your baby to ensure everything remains safe.
        </p>
      </div>
    </div>
  );

  const renderMonitoring = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">Continued Monitoring</h3>
        <p className="text-purple-800 text-sm">
          When you go past your due date, your healthcare provider will monitor you and your baby more closely 
          to ensure everything is progressing safely.
        </p>
      </div>

      {monitoringProcedures.map((procedure, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{procedure.procedure}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800">What it is:</h4>
                <p className="text-sm text-gray-600">{procedure.description}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">How often:</h4>
                <p className="text-sm text-gray-600">{procedure.frequency}</p>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-blue-900">Purpose:</h4>
              <p className="text-sm text-blue-800">{procedure.purpose}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4">Membrane Sweeping (Stripping)</h3>
        
        <div className="bg-indigo-100 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-indigo-900 mb-2">What it is:</h4>
          <p className="text-indigo-800 text-sm">{membraneSweeping.what}</p>
          <p className="text-indigo-800 text-sm mt-2">
            <strong>Purpose:</strong> {membraneSweeping.purpose}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3">Benefits:</h4>
            <ul className="space-y-1">
              {membraneSweeping.benefits.map((benefit, i) => (
                <li key={i} className="text-sm text-green-800 flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-3">What to Expect:</h4>
            <ul className="space-y-1">
              {membraneSweeping.expectations.map((expectation, i) => (
                <li key={i} className="text-sm text-yellow-800 flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  {expectation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInduction = () => (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-orange-900 mb-2">Labor Induction</h3>
        <p className="text-orange-800 text-sm">
          If natural labor doesn't begin, your provider may recommend induction, usually after 41-42 weeks. 
          This helps ensure the safety of both you and your baby.
        </p>
      </div>

      {Object.entries(inductionMethods).map(([key, method]) => (
        <div key={key} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{method.method}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800">Purpose:</h4>
                <p className="text-sm text-gray-600">{method.purpose}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">How it's given:</h4>
                <p className="text-sm text-gray-600">{method.howGiven}</p>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900">Timeframe:</h4>
              <p className="text-sm text-blue-800">{method.timeframe}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Induction Process</h4>
        <p className="text-blue-800 text-sm mb-3">
          Induction is often done in steps, starting with the gentlest method and progressing as needed:
        </p>
        <ol className="text-sm text-blue-700 space-y-1">
          <li>1. Cervix softening (if needed)</li>
          <li>2. Membrane sweeping (if not already done)</li>
          <li>3. Water breaking (if appropriate)</li>
          <li>4. Medication to start contractions</li>
        </ol>
      </div>
    </div>
  );

  const renderWaiting = () => (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-green-900 mb-2">Productive and Soothing Tasks for the Final Stretch</h3>
        <p className="text-green-800 text-sm">
          While you wait for labor to begin naturally, here are helpful ways to spend your time and stay positive.
        </p>
      </div>

      {waitingTips.map((category, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 text-purple-600 mr-2" />
            {category.category}
          </h3>
          
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {category.tips.map((tip, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start">
                <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
        <h3 className="text-lg font-semibold text-pink-900 mb-3">Encouragement for the Final Wait</h3>
        <div className="space-y-3 text-pink-800">
          <p className="flex items-start">
            <Heart className="w-4 h-4 text-pink-600 mr-2 mt-1 flex-shrink-0" />
            <span className="text-sm">
              <strong>Trust your body</strong> — you're almost there! Your baby will come when they're ready.
            </span>
          </p>
          <p className="flex items-start">
            <Heart className="w-4 h-4 text-pink-600 mr-2 mt-1 flex-shrink-0" />
            <span className="text-sm">
              <strong>This waiting period is temporary</strong> — soon you'll be holding your baby in your arms.
            </span>
          </p>
          <p className="flex items-start">
            <Heart className="w-4 h-4 text-pink-600 mr-2 mt-1 flex-shrink-0" />
            <span className="text-sm">
              <strong>Use this time for self-care</strong> — rest, eat well, and enjoy these final moments of pregnancy.
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  const currentStatus = getCurrentStatus();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Calendar className="w-8 h-8 mr-2 text-blue-600" />
          Week {currentWeek}: When Baby's Overdue
        </h2>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 font-medium">Current Status: Week {currentWeek}</p>
              <p className="text-lg font-bold text-purple-600">{currentStatus.status}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">What to Expect:</p>
              <p className="text-sm text-gray-800">{currentStatus.description}</p>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <section.icon className="w-4 h-4 mr-2" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeSection === 'overview' && renderOverview()}
        {activeSection === 'monitoring' && renderMonitoring()}
        {activeSection === 'induction' && renderInduction()}
        {activeSection === 'waiting' && renderWaiting()}
      </div>
    </div>
  );
};