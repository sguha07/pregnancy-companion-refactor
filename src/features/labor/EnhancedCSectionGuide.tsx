import React, { useState, useEffect } from 'react';
import { Shield, Heart, Baby, AlertTriangle, Clock, CheckCircle, Info, Activity, FileText, Users } from 'lucide-react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';

interface EnhancedCSectionGuideProps {
  kb: KnowledgeBaseService;
}

interface CSectionReason {
  category: string;
  reasons: string[];
  description: string;
}

interface BenefitRisk {
  category: string;
  points: string[];
  notes: string;
  type: 'benefit' | 'risk';
  severity?: 'low' | 'medium' | 'high';
}

interface RecoveryPhase {
  phase: string;
  timeframe: string;
  expectations: string[];
  tips: string[];
  warnings: string[];
}

export const EnhancedCSectionGuide: React.FC<EnhancedCSectionGuideProps> = ({ kb }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [csectionData, setCSectionData] = useState<any>(null);

  // Load C-section data on component mount
  useEffect(() => {
    const knowledgeBase = kb.getKnowledgeBase();
    if (knowledgeBase?.cesareanDelivery) {
      setCSectionData(knowledgeBase.cesareanDelivery);
    }
  }, [kb]);

  // Comprehensive C-section reasons data
  const csectionReasons: CSectionReason[] = [
    {
      category: 'Labor-Related Issues',
      description: 'When labor doesn\'t progress normally or complications arise during delivery',
      reasons: [
        'Labor not progressing - cervix doesn\'t fully dilate',
        'Abnormal fetal heart rate - may signal baby isn\'t getting enough oxygen',
        'Cord prolapse - umbilical cord slips out first, cutting off oxygen',
        'Failed induction of labor'
      ]
    },
    {
      category: 'Baby\'s Position or Health',
      description: 'When baby\'s position or health condition affects safe vaginal delivery',
      reasons: [
        'Breech presentation - feet or buttocks first',
        'Transverse position - baby lying sideways',
        'Face-up or head tilted position',
        'Very large baby (macrosomia)',
        'Baby with medical condition requiring specialized care'
      ]
    },
    {
      category: 'Maternal Health Conditions',
      description: 'When mother\'s health conditions make C-section safer',
      reasons: [
        'Diabetes with complications',
        'High blood pressure or preeclampsia',
        'Heart or lung disease',
        'Active genital herpes infection',
        'HIV with high viral load',
        'Severe maternal illness'
      ]
    },
    {
      category: 'Placenta and Cord Issues',
      description: 'When placenta or umbilical cord positioning creates risks',
      reasons: [
        'Placenta previa - placenta covers the cervix',
        'Placental abruption - placenta detaches early',
        'Cord wrapped around baby\'s neck (severe cases)',
        'Cord between baby\'s head and pelvis'
      ]
    },
    {
      category: 'Multiple Pregnancies',
      description: 'Special considerations for twins, triplets, or higher-order multiples',
      reasons: [
        'Twin pregnancy with complications',
        'Higher-order multiples (triplets+)',
        'Twin-to-twin transfusion syndrome',
        'Complicated positioning of multiple babies'
      ]
    },
    {
      category: 'Previous C-section',
      description: 'Considerations for repeat cesarean delivery',
      reasons: [
        'Previous classical (vertical) C-section incision',
        'Multiple previous C-sections',
        'Uterine rupture risk factors',
        'Failed trial of labor after cesarean (TOLAC)'
      ]
    }
  ];

  // Benefits and risks data
  const benefitsAndRisks: BenefitRisk[] = [
    {
      category: 'Maternal Benefits',
      type: 'benefit',
      points: [
        'May reduce short-term urinary incontinence',
        'Avoids emergency C-section complications',
        'Can help avoid prolonged difficult labor',
        'Birth can be scheduled for peace of mind',
        'May prevent pelvic floor damage'
      ],
      notes: 'Benefits are more evident in first-time C-sections'
    },
    {
      category: 'Infant Benefits',
      type: 'benefit',
      points: [
        'May lower risk of birth injury in large babies',
        'Reduces chance of inhaling meconium',
        'Can reduce infection transmission risk',
        'Prevents complications from difficult delivery',
        'Allows for immediate specialized care if needed'
      ],
      notes: 'Especially relevant in high-risk pregnancies'
    },
    {
      category: 'Short-term Maternal Risks',
      type: 'risk',
      severity: 'medium',
      points: [
        'Longer hospital stay (3-4 days vs 1-2 days)',
        'Higher chance of infection',
        'Surgical complications (bleeding, blood clots)',
        'May delay initial breastfeeding',
        'Pain and discomfort during recovery',
        'Reaction to anesthesia'
      ],
      notes: 'Most complications are temporary and manageable'
    },
    {
      category: 'Long-term Maternal Risks',
      type: 'risk',
      severity: 'medium',
      points: [
        'Future pregnancy complications (placenta previa)',
        'Increased risk of uterine rupture in future pregnancies',
        'Slightly higher risk of hysterectomy',
        'Adhesions and scar tissue formation',
        'Fertility may be slightly affected'
      ],
      notes: 'Risk increases with multiple C-sections'
    },
    {
      category: 'Fetal Risks',
      type: 'risk',
      severity: 'low',
      points: [
        'Breathing issues after birth (transient tachypnea)',
        'Risk of prematurity if due date is inaccurate',
        'Very rare chance of accidental surgical cuts',
        'May affect initial bonding due to medications'
      ],
      notes: 'Risks are usually mild and treatable'
    }
  ];

  // Recovery phases
  const recoveryPhases: RecoveryPhase[] = [
    {
      phase: 'Hospital Stay (0-3 days)',
      timeframe: 'Immediate post-surgery',
      expectations: [
        'Pain management with medications',
        'Catheter for first 12-24 hours',
        'Gradual increase in activity',
        'Begin breastfeeding as soon as possible',
        'Monitor for complications'
      ],
      tips: [
        'Use pain medication as prescribed',
        'Practice deep breathing exercises',
        'Start walking as soon as cleared',
        'Hold pillow against incision when coughing',
        'Accept help with baby care'
      ],
      warnings: [
        'Heavy bleeding or foul-smelling discharge',
        'Signs of infection at incision site',
        'Severe pain not relieved by medication',
        'Difficulty breathing or chest pain'
      ]
    },
    {
      phase: 'First Week Home',
      timeframe: '3-7 days post-surgery',
      expectations: [
        'Continued pain and discomfort',
        'Fatigue and limited mobility',
        'Emotional adjustments',
        'Incision healing begins',
        'Lochia (postpartum bleeding)'
      ],
      tips: [
        'Rest when baby sleeps',
        'Avoid lifting anything heavier than baby',
        'Keep incision clean and dry',
        'Eat nutritious foods',
        'Stay hydrated, especially if breastfeeding'
      ],
      warnings: [
        'Fever over 100.4°F (38°C)',
        'Increasing pain instead of improving',
        'Signs of depression or anxiety',
        'Problems with breastfeeding'
      ]
    },
    {
      phase: 'Weeks 2-6',
      timeframe: '2-6 weeks post-surgery',
      expectations: [
        'Gradual improvement in energy',
        'Pain decreases significantly',
        'Incision continues to heal',
        'Return of some normal activities',
        'Emotional ups and downs are normal'
      ],
      tips: [
        'Gradually increase activity level',
        'Start gentle exercises as cleared',
        'Continue to avoid heavy lifting',
        'Attend all follow-up appointments',
        'Consider postpartum support groups'
      ],
      warnings: [
        'Sudden increase in bleeding',
        'Signs of postpartum depression',
        'Problems with incision healing',
        'Severe abdominal pain'
      ]
    },
    {
      phase: 'Full Recovery (6+ weeks)',
      timeframe: '6 weeks and beyond',
      expectations: [
        'Cleared for normal activities',
        'Exercise and intimacy can resume',
        'Full energy levels return',
        'Emotional adjustment continues',
        'Planning future pregnancies'
      ],
      tips: [
        'Follow provider\'s clearance for activities',
        'Discuss birth control options',
        'Consider future pregnancy timing',
        'Address any ongoing concerns',
        'Celebrate your recovery progress'
      ],
      warnings: [
        'Persistent pain or discomfort',
        'Concerns about future pregnancies',
        'Ongoing emotional difficulties',
        'Problems with scar tissue'
      ]
    }
  ];

  // Get color class for risk severity
  const getRiskColorClass = (severity?: string): string => {
    switch (severity) {
      case 'low': return 'border-green-200 bg-green-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'high': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info className="w-4 h-4" /> },
    { id: 'reasons', label: 'Why C-Section?', icon: <FileText className="w-4 h-4" /> },
    { id: 'benefits-risks', label: 'Benefits & Risks', icon: <Shield className="w-4 h-4" /> },
    { id: 'recovery', label: 'Recovery Guide', icon: <Activity className="w-4 h-4" /> },
    { id: 'preparation', label: 'Preparation', icon: <CheckCircle className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Shield className="w-8 h-8 mr-2 text-purple-600" />
          Complete C-Section Guide
        </h2>
        <p className="text-gray-600">
          Comprehensive information about cesarean delivery - from reasons and preparation to recovery and beyond.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  What is a C-Section?
                </h3>
                <p className="text-blue-800 mb-4">
                  A cesarean section (C-section) is a surgical procedure to deliver your baby through an incision 
                  in your abdomen and uterus. It's a common and safe procedure that accounts for about one-third of U.S. births.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">~33%</div>
                    <div className="text-sm text-gray-600">of U.S. births</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">30-60 min</div>
                    <div className="text-sm text-gray-600">typical procedure</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">3-4 days</div>
                    <div className="text-sm text-gray-600">hospital stay</div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    When C-Sections Help
                  </h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Protects mother and baby in high-risk situations</li>
                    <li>• Prevents complications during difficult labors</li>
                    <li>• Allows for planned, controlled delivery</li>
                    <li>• Enables immediate medical intervention if needed</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Important Reminders
                  </h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Every birth is unique and valid</li>
                    <li>• C-sections can be planned or unplanned</li>
                    <li>• Your safety and baby's safety come first</li>
                    <li>• Recovery is a process - be patient with yourself</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Reasons Tab */}
          {activeTab === 'reasons' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Why Might a C-Section Be Needed?</h3>
                <p className="text-gray-600 mb-4">
                  C-sections may be planned in advance or recommended during labor. Here are the most common reasons:
                </p>
              </div>

              <div className="space-y-4">
                {csectionReasons.map((reasonCategory, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setSelectedReason(selectedReason === reasonCategory.category ? null : reasonCategory.category)}
                      className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900">{reasonCategory.category}</h4>
                        <p className="text-sm text-gray-600 mt-1">{reasonCategory.description}</p>
                      </div>
                      <div className={`transform transition-transform ${selectedReason === reasonCategory.category ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {selectedReason === reasonCategory.category && (
                      <div className="px-4 pb-4 border-t border-gray-100">
                        <ul className="mt-3 space-y-2">
                          {reasonCategory.reasons.map((reason, reasonIndex) => (
                            <li key={reasonIndex} className="flex items-start text-sm text-gray-700">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Remember
                </h4>
                <p className="text-sm text-blue-800">
                  Your healthcare team will guide you toward the safest choice for you and your baby. 
                  Stay flexible - birth plans may change, and that's completely normal.
                </p>
              </div>
            </div>
          )}

          {/* Benefits & Risks Tab */}
          {activeTab === 'benefits-risks' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Understanding Benefits and Risks</h3>
                <p className="text-gray-600">
                  Like any medical procedure, C-sections have both benefits and risks. Here's what you should know:
                </p>
              </div>

              <div className="space-y-6">
                {benefitsAndRisks.map((item, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${getRiskColorClass(item.severity)}`}>
                    <div className="flex items-center mb-3">
                      {item.type === 'benefit' ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      ) : (
                        <AlertTriangle className={`w-5 h-5 mr-2 ${
                          item.severity === 'low' ? 'text-green-600' : 
                          item.severity === 'medium' ? 'text-yellow-600' : 'text-red-600'
                        }`} />
                      )}
                      <h4 className="font-semibold text-gray-900">{item.category}</h4>
                      {item.severity && (
                        <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                          item.severity === 'low' ? 'bg-green-100 text-green-800' :
                          item.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.severity} risk
                        </span>
                      )}
                    </div>
                    
                    <ul className="space-y-1 mb-3">
                      {item.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-sm text-gray-700 flex items-start">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    
                    <p className="text-xs text-gray-600 italic">{item.notes}</p>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Making the Decision
                </h4>
                <p className="text-sm text-yellow-800">
                  The decision for a C-section should always be made in consultation with your healthcare provider, 
                  considering your individual circumstances, health conditions, and preferences.
                </p>
              </div>
            </div>
          )}

          {/* Recovery Tab */}
          {activeTab === 'recovery' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">C-Section Recovery Timeline</h3>
                <p className="text-gray-600">
                  Recovery from a C-section is a gradual process. Here's what to expect at each stage:
                </p>
              </div>

              <div className="space-y-6">
                {recoveryPhases.map((phase, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-semibold text-purple-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                        <p className="text-sm text-gray-600">{phase.timeframe}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Info className="w-4 h-4 mr-1 text-blue-500" />
                          What to Expect
                        </h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {phase.expectations.map((expectation, expIndex) => (
                            <li key={expIndex} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {expectation}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                          Helpful Tips
                        </h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {phase.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1 text-red-500" />
                          Warning Signs
                        </h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {phase.warnings.map((warning, warningIndex) => (
                            <li key={warningIndex} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Recovery Support Tips
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-800">
                  <ul className="space-y-1">
                    <li>• Accept help from family and friends</li>
                    <li>• Focus on rest and bonding with baby</li>
                    <li>• Follow all post-operative instructions</li>
                    <li>• Attend all follow-up appointments</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Stay hydrated and eat nutritious foods</li>
                    <li>• Watch for signs of postpartum depression</li>
                    <li>• Don't rush back to normal activities</li>
                    <li>• Contact provider with any concerns</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Preparation Tab */}
          {activeTab === 'preparation' && (
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Preparing for Your C-Section</h3>
                <p className="text-gray-600">
                  Whether planned or unexpected, being prepared can help reduce anxiety and ensure the best outcome.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    Before Surgery
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Medical Preparation</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Pre-operative blood work and tests</li>
                        <li>• Anesthesia consultation</li>
                        <li>• Stop eating/drinking as instructed</li>
                        <li>• Remove jewelry and nail polish</li>
                        <li>• Shower with antibacterial soap</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">What to Bring</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Comfortable going-home outfit</li>
                        <li>• Nursing bras and comfortable underwear</li>
                        <li>• Baby's car seat and going-home outfit</li>
                        <li>• Phone charger and camera</li>
                        <li>• Insurance cards and ID</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-purple-500" />
                    Support System
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">During Surgery</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Choose who will be present (usually 1 person)</li>
                        <li>• Discuss your preferences with your partner</li>
                        <li>• Consider professional birth photography</li>
                        <li>• Plan for immediate skin-to-skin contact</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Post-Surgery Help</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Arrange help for first 1-2 weeks</li>
                        <li>• Prepare meals in advance or arrange delivery</li>
                        <li>• Child care for older children</li>
                        <li>• Transportation to follow-up appointments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-500" />
                  Birth Preferences for C-Section
                </h4>
                <p className="text-gray-600 mb-4">
                  Even with a C-section, you can have preferences about your birth experience:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">During Surgery</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Type of anesthesia (spinal vs epidural)</li>
                      <li>• Music or conversation preferences</li>
                      <li>• Immediate skin-to-skin contact</li>
                      <li>• Delayed cord clamping if possible</li>
                      <li>• Clear drape to watch birth</li>
                      <li>• Photography permissions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">After Birth</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Breastfeeding initiation timing</li>
                      <li>• Baby's first procedures timing</li>
                      <li>• Rooming-in preferences</li>
                      <li>• Visitor restrictions</li>
                      <li>• Pain management preferences</li>
                      <li>• Hospital stay duration</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Baby className="w-5 h-5 mr-2 text-pink-500" />
                  Preparing Your Baby's Space
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Nursery Setup</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Change table at comfortable height</li>
                      <li>• Everything within easy reach</li>
                      <li>• Comfortable nursing chair</li>
                      <li>• Good lighting for night feeds</li>
                      <li>• Baby monitor if needed</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Recovery Considerations</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Avoid lifting baby crib mattress</li>
                      <li>• Keep baby supplies on one level</li>
                      <li>• Have comfortable feeding areas ready</li>
                      <li>• Consider bassinet for easier access</li>
                      <li>• Prepare diaper changing stations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Questions to Ask Your Provider
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <ul className="space-y-1">
                    <li>• What type of incision will be used?</li>
                    <li>• How long will the surgery take?</li>
                    <li>• What anesthesia options do I have?</li>
                    <li>• Can my partner be present?</li>
                    <li>• When can I start breastfeeding?</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• How long will I stay in the hospital?</li>
                    <li>• What pain management options are available?</li>
                    <li>• When can I resume normal activities?</li>
                    <li>• How will this affect future pregnancies?</li>
                    <li>• What are the signs of complications?</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Information */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          When to Seek Emergency Care After C-Section
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-red-800">
          <div>
            <h4 className="font-medium mb-2">Call 911 or Go to ER Immediately:</h4>
            <ul className="space-y-1">
              <li>• Heavy bleeding (soaking a pad per hour)</li>
              <li>• Severe chest pain or difficulty breathing</li>
              <li>• Signs of blood clot (leg pain, swelling)</li>
              <li>• Severe abdominal pain</li>
              <li>• High fever with chills</li>
              <li>• Fainting or severe dizziness</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Call Your Provider:</h4>
            <ul className="space-y-1">
              <li>• Incision shows signs of infection</li>
              <li>• Fever over 100.4°F (38°C)</li>
              <li>• Increased pain instead of improvement</li>
              <li>• Foul-smelling discharge</li>
              <li>• Difficulty urinating</li>
              <li>• Signs of postpartum depression</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emotional Support */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2" />
          Emotional Wellness After C-Section
        </h3>
        <div className="space-y-4">
          <p className="text-purple-800">
            It's normal to have mixed feelings about your birth experience. Remember that however your baby arrived, 
            you did an amazing job bringing them into the world safely.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Normal Feelings</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Relief that baby is safe and healthy</li>
                <li>• Disappointment if birth didn't go as planned</li>
                <li>• Anxiety about recovery</li>
                <li>• Pride in your strength and resilience</li>
                <li>• Gratitude for medical care</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Seek Support If You Have</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Persistent sadness or mood changes</li>
                <li>• Anxiety about baby's wellbeing</li>
                <li>• Difficulty bonding with baby</li>
                <li>• Thoughts of harming yourself or baby</li>
                <li>• Inability to enjoy activities</li>
              </ul>
            </div>
          </div>
          
          <p className="text-sm text-purple-800">
            Remember: Your birth story is valid and beautiful, regardless of how your baby arrived. 
            If you're struggling emotionally, reach out to your healthcare provider, a counselor, or a support group.
          </p>
        </div>
      </div>
    </div>
  );
};