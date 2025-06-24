import React, { useState } from 'react';
import { Clock, Heart, AlertCircle, HelpCircle, Activity, Shield } from 'lucide-react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';
import { EnhancedPainManagement } from './EnhancedPainManagement';
import { EnhancedLaborFAQ } from './EnhancedLaborFAQ';
import { EnhancedCSectionGuide } from './EnhancedCSectionGuide';

interface LaborDeliveryGuideProps {
  kb: KnowledgeBaseService;
}

export const LaborDeliveryGuide: React.FC<LaborDeliveryGuideProps> = ({ kb }) => {
  const [activeSection, setActiveSection] = useState<string>('signs');

  const sections = [
    { id: 'signs', label: 'Signs of Labor', icon: Clock },
    { id: 'stages', label: 'Labor Stages', icon: Activity },
    { id: 'csection', label: 'C-Section Guide', icon: Shield },
    { id: 'pain', label: 'Pain Management', icon: Heart },
    { id: 'faq', label: 'FAQ', icon: HelpCircle }
  ];

  const signsOfLabor = [
    {
      sign: 'Lightening (Baby "Dropping")',
      description: 'Baby settles deeper into the pelvis',
      timing: 'A few weeks before labor in first pregnancies, possibly just before or during labor in later pregnancies',
      whatYouFeel: [
        'Belly looks lower and tilts forward',
        'Easier breathing (less pressure on diaphragm)',
        'More bladder pressure and frequent urination',
        'Pelvic discomfort or twinges',
        'Lower center of gravity or shift in balance'
      ],
      note: 'Not everyone feels or notices lightening — that\'s normal too.'
    },
    {
      sign: 'Braxton Hicks Contractions',
      description: 'Irregular, usually painless contractions (tightening of the uterus)',
      timing: 'Second and third trimesters, more frequently near your due date',
      whatYouFeel: [
        'A tightening sensation that comes and goes',
        'Contractions that are not rhythmic or progressively stronger',
        'Often more noticeable when you touch your belly'
      ],
      note: 'These are "practice" contractions that help your uterus prepare for labor.'
    },
    {
      sign: 'Bloody Show',
      description: 'The release of the mucus plug that seals the cervix during pregnancy',
      timing: 'Days or hours before labor — or sometimes a week or more before',
      whatYouFeel: [
        'A discharge that\'s pink, brownish, or blood-tinged',
        'Mucus that may look thick or stringy'
      ],
      note: 'This is normal and expected. But if bleeding is heavy like a period, contact your care provider immediately.'
    },
    {
      sign: 'Water Breaking',
      description: 'Rupture of the amniotic sac',
      timing: 'Can happen before labor starts or during labor',
      whatYouFeel: [
        'A gush or trickle of fluid from your vagina',
        'Fluid that\'s clear, slightly pink, or slightly bloody',
        'Continuous leaking or intermittent gushing'
      ],
      note: 'Call your provider immediately if your water breaks, especially if the fluid is green, brown, or has a foul smell.'
    },
    {
      sign: 'Regular Contractions',
      description: 'True labor contractions that become progressively stronger and closer together',
      timing: 'As labor begins and progresses',
      whatYouFeel: [
        'Contractions that feel like intense menstrual cramps',
        'Pain that starts in the back and moves to the front',
        'Contractions that don\'t stop when you change positions or rest',
        'Increasingly painful and regular pattern'
      ],
      note: 'Time your contractions and call your provider when they follow the 5-1-1 rule (or earlier if advised).'
    }
  ];

  const laborStages = [
    {
      stage: 'Stage 1: Early Labor to Full Dilation',
      description: 'Begins with regular contractions and ends when cervix is fully dilated (10 cm)',
      phases: [
        {
          phase: 'Early Labor (0-6 cm)',
          duration: '6-12 hours (first baby), 2-5 hours (subsequent)',
          whatHappens: 'Cervix thins and dilates, contractions start mild and irregular',
          whatToDo: [
            'Rest and conserve energy during early labor',
            'Try upright positions or change postures frequently',
            'Use comfort measures like massage, heating pads, or water therapy',
            'Request or decline pain relief according to your preferences',
            'Stay in close communication with care team'
          ]
        },
        {
          phase: 'Active Labor (6-8 cm)',
          duration: '3-5 hours (first baby), 2-3 hours (subsequent)',
          whatHappens: 'Contractions become stronger, longer, and closer together',
          whatToDo: [
            'Focus on breathing techniques and relaxation',
            'Continue position changes for comfort',
            'Consider pain management options if desired',
            'Stay hydrated and follow care provider guidance',
            'Prepare for more intense contractions'
          ]
        },
        {
          phase: 'Transition (8-10 cm)',
          duration: '30 minutes to 2 hours',
          whatHappens: 'Most intense contractions, cervix completes dilation',
          whatToDo: [
            'Focus on one contraction at a time',
            'Use breathing techniques to avoid pushing urge',
            'Accept support and encouragement',
            'Remember this phase is the shortest but most intense'
          ]
        }
      ]
    },
    {
      stage: 'Stage 2: Pushing and Delivery',
      description: 'Begins when cervix is fully dilated (10 cm)',
      duration: '1-3 hours (first baby), 20 minutes to 2 hours (subsequent)',
      keyPoints: [
        'Crowning occurs when baby\'s head becomes visible',
        'May take several pushes after crowning',
        'Pausing during crowning helps prevent tears',
        'Back labor possible if baby is posterior'
      ],
      whatToDo: [
        'Push only when instructed (when cervix is fully dilated)',
        'Expect pushing to last 1-2 hours, longer if it\'s your first baby',
        'Pause pushing when asked—especially during crowning—to prevent tears',
        'Use a mirror or touch the baby\'s head to stay motivated',
        'If experiencing back labor: use counterpressure, heat/cold, position changes'
      ]
    },
    {
      stage: 'Stage 3: Delivery of Placenta',
      description: 'Delivery of placenta after baby is born',
      duration: '5-30 minutes after birth',
      whatHappens: [
        'Mild contractions resume to deliver placenta',
        'Provider may massage abdomen to help uterus contract',
        'Oxytocin may be given to reduce bleeding',
        'Placenta examined for completeness'
      ],
      whatToDo: [
        'Push once more when instructed to expel placenta',
        'Allow provider to check for tears and perform stitches if needed',
        'Ask to see placenta if interested',
        'Begin skin-to-skin contact with baby'
      ]
    }
  ];

  const renderSigns = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Signs That Labor May Be Near</h3>
        <p className="text-blue-800 text-sm">
          As you enter the final stretch of pregnancy, your body will show signs that it's preparing for delivery. 
          These signs don't always mean labor is starting immediately, but they suggest your body is getting close.
        </p>
      </div>

      {signsOfLabor.map((sign, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{sign.sign}</h3>
          <p className="text-gray-700 mb-4">{sign.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">When It Happens:</h4>
              <p className="text-sm text-purple-800">{sign.timing}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">What You May Feel:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                {sign.whatYouFeel.map((feeling, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    {feeling}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 p-3 rounded border border-amber-200">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> {sign.note}
            </p>
          </div>
        </div>
      ))}

      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h4 className="font-semibold text-red-900 mb-2">When to Go to the Hospital</h4>
        <div className="text-red-800 text-sm space-y-2">
          <p><strong>5-1-1 Rule (for first-time moms):</strong> Contractions every 5 minutes, lasting 1 minute each, for 1 hour</p>
          <p><strong>If you've had babies before:</strong> Go sooner - contractions every 7-10 minutes</p>
          <p><strong>Go immediately if:</strong> Water breaks, heavy bleeding, severe pain, or you feel something is wrong</p>
        </div>
      </div>
    </div>
  );

  const renderStages = () => (
    <div className="space-y-6">
      {laborStages.map((stage, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{stage.stage}</h3>
          <p className="text-gray-700 mb-4">{stage.description}</p>
          
          {stage.phases ? (
            <div className="space-y-4">
              {stage.phases.map((phase, i) => (
                <div key={i} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">{phase.phase}</h4>
                  <p className="text-sm text-purple-700 mb-3">
                    <strong>Duration:</strong> {phase.duration}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">{phase.whatHappens}</p>
                  
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">What You Can Do:</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {phase.whatToDo.map((action, j) => (
                        <li key={j} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {stage.duration && (
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Duration:</strong> {stage.duration}
                  </p>
                </div>
              )}
              
              {stage.keyPoints && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Key Points:</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    {stage.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {stage.whatHappens && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">What Happens:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    {stage.whatHappens.map((event, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        {event}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {stage.whatToDo && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">What You Can Do:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {stage.whatToDo.map((action, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCSectionGuide = () => (
    <EnhancedCSectionGuide kb={kb} />
  );

  const renderPainManagement = () => (
    <EnhancedPainManagement kb={kb} />
  );

  const renderFAQ = () => (
    <EnhancedLaborFAQ kb={kb} />
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Heart className="w-8 h-8 mr-2 text-pink-600" />
          Complete Labor & Delivery Guide
        </h2>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <section.icon className="w-4 h-4 mr-2" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeSection === 'signs' && renderSigns()}
        {activeSection === 'stages' && renderStages()}
        {activeSection === 'csection' && renderCSectionGuide()}
        {activeSection === 'pain' && renderPainManagement()}
        {activeSection === 'faq' && renderFAQ()}
      </div>
    </div>
  );
};