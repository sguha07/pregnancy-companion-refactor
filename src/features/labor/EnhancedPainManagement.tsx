import React, { useState } from 'react';
import { Activity, Heart, Zap, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface PainManagementProps {
  kb: any; // KnowledgeBaseService type
}

export const EnhancedPainManagement: React.FC<PainManagementProps> = ({ kb }) => {
  const [activeCategory, setActiveCategory] = useState<string>('natural');

  const categories = [
    { id: 'natural', label: 'Natural Methods', icon: Heart },
    { id: 'medical', label: 'Medical Options', icon: Zap },
    { id: 'relaxation', label: 'Relaxation Techniques', icon: Activity }
  ];

  const naturalMethods = [
    {
      method: 'Breathing Techniques',
      description: 'Controlled breathing patterns to manage contractions',
      techniques: [
        'Slow breathing for early labor - inhale slowly through nose, exhale gently through mouth',
        'Quick breathing for transition phase - shallow, rapid breaths',
        'Panting instead of pushing when directed by care team'
      ],
      benefits: 'Helps release tension and manage contractions naturally'
    },
    {
      method: 'Movement and Position Changes',
      description: 'Using gravity and movement to ease labor pain',
      techniques: [
        'Walking during early labor',
        'Rocking or swaying motions',
        'Squatting positions',
        'Hands and knees position',
        'Side-lying positions'
      ],
      benefits: 'Can help labor progress and reduce pain intensity'
    },
    {
      method: 'Massage and Touch',
      description: 'Physical comfort measures during labor',
      techniques: [
        'Back massage with sweeping or circular motions',
        'Shoulder and neck massage',
        'Counterpressure on lower back for back labor',
        'Hand and foot massage'
      ],
      benefits: 'Promotes endorphin release for natural pain relief'
    },
    {
      method: 'Water Therapy',
      description: 'Using warm water for pain relief',
      techniques: [
        'Warm showers during labor',
        'Labor tubs or birthing pools',
        'Warm compresses on back or abdomen'
      ],
      benefits: 'Provides muscle relaxation and pain reduction'
    }
  ];

  const medicalOptions = [
    {
      method: 'Epidural Block',
      whenUsed: 'Active labor, often through to delivery or C-section',
      howGiven: 'Through a catheter in lower back',
      reliefLevel: 'Strong, lower-body pain relief',
      impactOnBaby: 'Safe; minimal effects',
      impactOnMother: 'May lower blood pressure; may need catheter; numbness in lower body',
      notes: 'Can be self-adjusted with a button; most widely used and trusted method',
      category: 'common'
    },
    {
      method: 'Spinal Block',
      whenUsed: 'Before C-section or during late labor if birth is imminent',
      howGiven: 'One-time injection in lower back spinal fluid',
      reliefLevel: 'Complete (chest down) for 1-2 hours',
      impactOnBaby: 'Safe',
      impactOnMother: 'Possible headache; bladder numbness; chest heaviness',
      notes: 'Quick onset; often used in surgical settings',
      category: 'common'
    },
    {
      method: 'Combined Spinal-Epidural (CSE)',
      whenUsed: 'Early or active labor, especially if long labor expected',
      howGiven: 'Single spinal injection + ongoing epidural through catheter',
      reliefLevel: 'Fast-acting then continuous relief',
      impactOnBaby: 'Safe',
      impactOnMother: 'Mix of both spinal and epidural impacts',
      notes: 'Best of both worlds; highly effective and increasingly used',
      category: 'common'
    },
    {
      method: 'Opioids',
      whenUsed: 'Early labor; not close to delivery',
      howGiven: 'Injection or IV (may be patient-controlled)',
      reliefLevel: 'Moderate; reduces perception of pain',
      impactOnBaby: 'Sleepiness, slower reflexes if born soon after dose',
      impactOnMother: 'Drowsiness, mild respiratory depression',
      notes: 'Timing important to avoid effects on baby',
      category: 'occasional'
    },
    {
      method: 'Nitrous Oxide (Laughing Gas)',
      whenUsed: 'At any stage; user-controlled',
      howGiven: 'Inhaled via face mask',
      reliefLevel: 'Mild',
      impactOnBaby: 'Minimal',
      impactOnMother: 'Dizziness, light-headedness, nausea',
      notes: "Doesn't eliminate pain but helps manage it mentally; limited use cases",
      category: 'occasional'
    },
    {
      method: 'Local Anesthetic (Perineal Area)',
      whenUsed: 'During episiotomy or to repair vaginal tears after delivery',
      howGiven: 'Injection at vaginal opening',
      reliefLevel: 'Targeted, site-specific',
      impactOnBaby: 'None',
      impactOnMother: 'Rare allergic reactions; temporary numbness',
      notes: 'Very localized; not for contraction pain',
      category: 'occasional'
    }
  ];

  const relaxationTechniques = [
    {
      technique: 'Progressive Muscle Relaxation',
      description: 'Systematically relax one muscle group at a time',
      instructions: [
        'Start from head or feet',
        'Tense each muscle group for 5 seconds',
        'Release and relax for 10 seconds',
        'Notice the difference between tension and relaxation',
        'Move through entire body systematically'
      ]
    },
    {
      technique: 'Touch Relaxation (with Partner)',
      description: 'Partner-assisted relaxation through gentle touch',
      instructions: [
        'Partner applies gentle pressure to temples',
        'Massage shoulders and neck',
        'Apply pressure to lower back',
        'Massage arms, legs, hands, and feet',
        'Use sweeping or circular motions'
      ]
    },
    {
      technique: 'Guided Imagery',
      description: 'Mental visualization for relaxation and pain management',
      instructions: [
        'Visualize a peaceful scene (beach, forest, etc.)',
        'Engage all senses: smells, colors, sounds',
        'Pair with calm music or nature sounds',
        'Focus on details to maintain concentration',
        'Return to the scene during contractions'
      ]
    },
    {
      technique: 'Meditation and Mindfulness',
      description: 'Focused attention and breathing awareness',
      instructions: [
        'Focus on breathing rhythm',
        'Repeat a calming word or sound',
        'Acknowledge thoughts without judgment',
        'Return focus to breath when mind wanders',
        'Practice regularly before labor'
      ]
    }
  ];

  const renderNaturalMethods = () => (
    <div className="space-y-6">
      {naturalMethods.map((method, index) => (
        <div key={index} className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-2">{method.method}</h3>
          <p className="text-green-800 mb-3">{method.description}</p>
          
          <h4 className="font-medium text-green-900 mb-2">Techniques:</h4>
          <ul className="space-y-1 mb-3">
            {method.techniques.map((technique, i) => (
              <li key={i} className="flex items-start text-sm text-green-700">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                {technique}
              </li>
            ))}
          </ul>
          
          <div className="bg-green-100 p-3 rounded">
            <p className="text-sm text-green-800 font-medium">
              <strong>Benefits:</strong> {method.benefits}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMedicalOptions = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Common and Safe Options</h3>
        <p className="text-blue-800 text-sm">These are widely used and have extensive safety data</p>
      </div>
      
      {medicalOptions.filter(option => option.category === 'common').map((option, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-blue-200 shadow-sm">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">{option.method}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">When Used:</span>
                <p className="text-sm text-gray-600">{option.whenUsed}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">How It's Given:</span>
                <p className="text-sm text-gray-600">{option.howGiven}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Relief Level:</span>
                <p className="text-sm text-gray-600">{option.reliefLevel}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Impact on Baby:</span>
                <p className="text-sm text-gray-600">{option.impactOnBaby}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Impact on Mother:</span>
                <p className="text-sm text-gray-600">{option.impactOnMother}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-blue-50 p-3 rounded">
            <p className="text-sm text-blue-800">
              <strong>Notes:</strong> {option.notes}
            </p>
          </div>
        </div>
      ))}
      
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">Occasionally Used Options</h3>
        <p className="text-yellow-800 text-sm">These options are used in specific situations</p>
      </div>
      
      {medicalOptions.filter(option => option.category === 'occasional').map((option, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-yellow-200 shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-900 mb-4">{option.method}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">When Used:</span>
                <p className="text-sm text-gray-600">{option.whenUsed}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">How It's Given:</span>
                <p className="text-sm text-gray-600">{option.howGiven}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Relief Level:</span>
                <p className="text-sm text-gray-600">{option.reliefLevel}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Impact on Baby:</span>
                <p className="text-sm text-gray-600">{option.impactOnBaby}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Impact on Mother:</span>
                <p className="text-sm text-gray-600">{option.impactOnMother}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-yellow-50 p-3 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Notes:</strong> {option.notes}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRelaxationTechniques = () => (
    <div className="space-y-6">
      {relaxationTechniques.map((technique, index) => (
        <div key={index} className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">{technique.technique}</h3>
          <p className="text-purple-800 mb-4">{technique.description}</p>
          
          <h4 className="font-medium text-purple-900 mb-2">How to Practice:</h4>
          <ol className="space-y-2">
            {technique.instructions.map((instruction, i) => (
              <li key={i} className="flex items-start text-sm text-purple-700">
                <span className="font-medium text-purple-600 mr-2 mt-0.5">{i + 1}.</span>
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Heart className="w-8 h-8 mr-2 text-pink-600" />
          Comprehensive Pain Management Guide
        </h2>

        <div className="bg-pink-50 p-4 rounded-lg mb-6">
          <p className="text-pink-800 text-sm">
            <strong>Remember:</strong> Pain management during labor is highly personal. Many people use a combination 
            approach, starting with natural methods and adding medical relief as needed. Your birth plan is flexible - 
            it's okay to change your mind during labor.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeCategory === 'natural' && renderNaturalMethods()}
        {activeCategory === 'medical' && renderMedicalOptions()}
        {activeCategory === 'relaxation' && renderRelaxationTechniques()}

        {/* Important Note */}
        <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900">Important Reminder</h4>
              <p className="text-amber-800 text-sm mt-1">
                Discuss all pain management options with your healthcare provider during your pregnancy. 
                They can help you understand which options are best for your specific situation and create 
                a pain management plan that works for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};