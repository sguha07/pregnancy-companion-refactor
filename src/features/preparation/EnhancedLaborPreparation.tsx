import React, { useState } from 'react';
import { Activity, Heart, Wind, Brain, Target, Clock, AlertCircle } from 'lucide-react';

interface LaborPreparationProps {
  kb: any; // KnowledgeBaseService type
}

export const EnhancedLaborPreparation: React.FC<LaborPreparationProps> = ({ kb }) => {
  const [activeSection, setActiveSection] = useState<string>('kegel');

  const sections = [
    { id: 'kegel', label: 'Kegel Exercises', icon: Heart },
    { id: 'massage', label: 'Perineal Massage', icon: Activity },
    { id: 'breathing', label: 'Breathing Techniques', icon: Wind },
    { id: 'relaxation', label: 'Relaxation Methods', icon: Brain }
  ];

  const kegelExercises = {
    why: [
      'Strengthens muscles supporting your uterus, bladder, and bowel',
      'Helps reduce risk of urinary incontinence and hemorrhoids',
      'Aids recovery after birth',
      'Improves circulation to pelvic area',
      'May help with labor and delivery'
    ],
    how: [
      'Identify pelvic muscles (try to stop your urine stream briefly to find them)',
      'Contract for 5 seconds, relax for 5 seconds. Build up to 10-second holds',
      'Goal: 3 sets of 10 Kegels per day + 3 sets of "mini-Kegels" (quick pulses)',
      'Don\'t flex abdomen/thighs/glutes, and don\'t hold your breath',
      'Practice regularly throughout pregnancy for best results'
    ],
    schedule: {
      beginner: 'Start with 5-second holds, 5 times, 3 times per day',
      intermediate: 'Work up to 10-second holds, 10 times, 3 times per day',
      advanced: 'Add quick pulse contractions - 10 fast pulses, 3 times per day'
    },
    tips: [
      'Practice while sitting, standing, or lying down',
      'Do them during routine activities (watching TV, waiting in line)',
      'Focus on lifting and squeezing, not bearing down',
      'Be patient - it takes 6-8 weeks to see improvement',
      'Continue after pregnancy for long-term pelvic health'
    ],
    avoid: 'Don\'t flex abdomen/thighs/glutes, don\'t hold breath, only identify muscles with urine stream once'
  };

  const perinealMassage = {
    when: 'Last few weeks of pregnancy (typically starting around 34-36 weeks)',
    why: [
      'May help stretch vaginal tissues and reduce stinging or tearing during birth',
      'Might reduce the need for an episiotomy (a surgical cut)',
      'Helps you become familiar with the stretching sensation of labor',
      'Can improve blood flow to the perineal area'
    ],
    howToSteps: [
      'Wash hands thoroughly and trim nails',
      'Use a mild lubricant (vitamin E oil or water-based lube)',
      'Insert thumbs into your vagina about 1-2 inches',
      'Press downward and outward toward the rectum',
      'Massage in a U-shape motion for 8-10 minutes daily',
      'Gradually increase pressure as tissues become more flexible'
    ],
    tips: [
      'Best done after a warm bath when tissues are relaxed',
      'Some discomfort is normal - stop if you feel sharp pain',
      'Your partner can assist if you\'re comfortable with that',
      'Use a mirror to help guide you initially',
      'Be gentle and patient - tissues need time to stretch'
    ],
    importantNotes: [
      'Not recommended if you have active vaginal infection',
      'Stop if you experience bleeding or severe pain',
      'Not proven to prevent all tearing, but may help',
      'Some women find it uncomfortable - it\'s optional'
    ]
  };

  const breathingTechniques = [
    {
      technique: 'Slow Breathing (Early Labor)',
      when: 'During early labor contractions',
      how: [
        'Inhale slowly through nose for 4 counts',
        'Exhale gently through mouth for 6 counts',
        'Focus on making exhale longer than inhale',
        'Keep breathing steady and controlled',
        'Practice daily so it becomes automatic'
      ],
      benefits: 'Helps you stay calm and conserve energy during early labor'
    },
    {
      technique: 'Quick Breathing (Transition)',
      when: 'During intense transition contractions',
      how: [
        'Take light, shallow breaths through mouth',
        'Breathe in for 1 count, out for 1 count',
        'Keep breathing high in chest, not deep belly breaths',
        'Use only during peak of contraction',
        'Return to slow breathing between contractions'
      ],
      benefits: 'Helps manage very intense contractions when you can\'t focus on slow breathing'
    },
    {
      technique: 'Panting (When Told Not to Push)',
      when: 'When you feel urge to push but cervix isn\'t fully dilated',
      how: [
        'Take short, quick breaths like a panting dog',
        'Keep breaths shallow and light',
        'Say "hee-hee-hoo" pattern if it helps',
        'Focus on not bearing down',
        'Listen to your care team\'s guidance'
      ],
      benefits: 'Prevents pushing before cervix is ready, reducing risk of swelling or tearing'
    },
    {
      technique: 'Cleansing Breaths',
      when: 'Beginning and end of each contraction',
      how: [
        'Take one deep breath in through nose',
        'Exhale completely through mouth with a sigh',
        'Use to signal start and end of contraction',
        'Helps you reset between contractions',
        'Signals to partner that contraction is starting/ending'
      ],
      benefits: 'Provides oxygen boost and helps you transition in and out of contractions'
    }
  ];

  const relaxationMethods = [
    {
      method: 'Progressive Muscle Relaxation',
      description: 'Systematically tense and relax muscle groups',
      instructions: [
        'Start from head or feet and work through each muscle group',
        'Tense muscles for 5 seconds, then relax for 10 seconds',
        'Notice the difference between tension and relaxation',
        'Move through: face, neck, shoulders, arms, chest, abdomen, hips, legs, feet',
        'End with whole body relaxation for 2-3 minutes'
      ],
      practiceTime: '15-20 minutes daily',
      benefits: 'Teaches body awareness and helps release physical tension during labor'
    },
    {
      method: 'Touch Relaxation (with Partner)',
      description: 'Partner-assisted relaxation through gentle touch',
      instructions: [
        'Partner applies gentle, firm pressure to tense areas',
        'Focus areas: temples, shoulders, back, arms, legs, hands, feet',
        'Use sweeping or circular motions',
        'Communicate what feels good and what doesn\'t',
        'Practice different pressures and techniques'
      ],
      practiceTime: '10-15 minutes several times per week',
      benefits: 'Promotes endorphin release for natural pain relief and strengthens partner support'
    },
    {
      method: 'Guided Imagery',
      description: 'Mental visualization for relaxation and pain management',
      instructions: [
        'Choose a peaceful scene (beach, forest, mountain, etc.)',
        'Engage all senses: What do you see, hear, smell, feel?',
        'Add calming music or nature sounds',
        'Picture yourself in this place during contractions',
        'Return to this mental "safe space" whenever needed'
      ],
      practiceTime: '10-15 minutes daily',
      benefits: 'Provides mental escape and helps reframe contraction sensations'
    },
    {
      method: 'Meditation and Mindfulness',
      description: 'Focused attention and present-moment awareness',
      instructions: [
        'Focus on breathing rhythm or repeat a calming word/phrase',
        'When mind wanders, gently return focus to breath or word',
        'Practice accepting sensations without resistance',
        'Acknowledge thoughts and feelings without judgment',
        'Start with 5 minutes and gradually increase time'
      ],
      practiceTime: '5-20 minutes daily',
      benefits: 'Develops ability to stay present and calm during intense sensations'
    }
  ];

  const renderKegel = () => (
    <div className="space-y-6">
      <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
        <h3 className="text-xl font-semibold text-pink-900 mb-4">Kegel Exercises (Pelvic Floor Training)</h3>
        
        <div className="bg-pink-100 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-pink-900 mb-2">Why Do Kegel Exercises?</h4>
          <ul className="space-y-1">
            {kegelExercises.why.map((reason, i) => (
              <li key={i} className="text-sm text-pink-800 flex items-start">
                <Heart className="w-4 h-4 text-pink-600 mr-2 mt-0.5 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-pink-200">
            <h4 className="font-semibold text-pink-900 mb-3">How to Do Kegel Exercises</h4>
            <ol className="space-y-2">
              {kegelExercises.how.map((step, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start">
                  <span className="font-medium text-pink-600 mr-2 mt-0.5">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Progression Schedule</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Beginner:</strong> {kegelExercises.schedule.beginner}</p>
                <p><strong>Intermediate:</strong> {kegelExercises.schedule.intermediate}</p>
                <p><strong>Advanced:</strong> {kegelExercises.schedule.advanced}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Helpful Tips</h4>
              <ul className="space-y-1">
                {kegelExercises.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-blue-800 flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="font-semibold text-red-900 mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Important Don'ts
          </h4>
          <p className="text-sm text-red-800">{kegelExercises.avoid}</p>
        </div>
      </div>
    </div>
  );

  const renderMassage = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-xl font-semibold text-purple-900 mb-4">Perineal Massage</h3>
        
        <div className="bg-purple-100 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-purple-900 mb-2">When and Why</h4>
          <p className="text-sm text-purple-800 mb-3">
            <strong>When:</strong> {perinealMassage.when}
          </p>
          <div>
            <strong className="text-purple-900">Why it may help:</strong>
            <ul className="mt-2 space-y-1">
              {perinealMassage.why.map((benefit, i) => (
                <li key={i} className="text-sm text-purple-800 flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3">Step-by-Step Instructions</h4>
            <ol className="space-y-2">
              {perinealMassage.howToSteps.map((step, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start">
                  <span className="font-medium text-purple-600 mr-2 mt-0.5">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Helpful Tips</h4>
              <ul className="space-y-1">
                {perinealMassage.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-blue-800 flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-2">Important Notes</h4>
              <ul className="space-y-1">
                {perinealMassage.importantNotes.map((note, i) => (
                  <li key={i} className="text-sm text-orange-800 flex items-start">
                    <AlertCircle className="w-3 h-3 text-orange-600 mr-2 mt-1 flex-shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBreathing = () => (
    <div className="space-y-6">
      {breathingTechniques.map((technique, index) => (
        <div key={index} className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-900">{technique.technique}</h3>
            <div className="flex items-center text-sm text-blue-700">
              <Clock className="w-4 h-4 mr-1" />
              {technique.when}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">How to Practice:</h4>
              <ol className="space-y-2">
                {technique.how.map((step, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start">
                    <span className="font-medium text-blue-600 mr-2 mt-0.5">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Benefits:</h4>
              <p className="text-sm text-green-800">{technique.benefits}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRelaxation = () => (
    <div className="space-y-6">
      {relaxationMethods.map((method, index) => (
        <div key={index} className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-indigo-900">{method.method}</h3>
              <p className="text-indigo-700 text-sm mt-1">{method.description}</p>
            </div>
            <div className="flex items-center text-sm text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
              <Target className="w-4 h-4 mr-1" />
              {method.practiceTime}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-900 mb-3">Instructions:</h4>
              <ol className="space-y-2">
                {method.instructions.map((instruction, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start">
                    <span className="font-medium text-indigo-600 mr-2 mt-0.5">{i + 1}.</span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Benefits:</h4>
              <p className="text-sm text-green-800">{method.benefits}</p>
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
          <Activity className="w-8 h-8 mr-2 text-purple-600" />
          Complete Labor Preparation Guide
        </h2>

        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <p className="text-purple-800 text-sm">
            <strong>Preparing your body and mind for labor can help you feel more confident and may improve your birth experience.</strong> 
            Start these exercises and techniques early in your third trimester, and practice them regularly. Remember, every labor 
            is different, but preparation can help you feel more ready.
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
        {activeSection === 'kegel' && renderKegel()}
        {activeSection === 'massage' && renderMassage()}
        {activeSection === 'breathing' && renderBreathing()}
        {activeSection === 'relaxation' && renderRelaxation()}

        {/* Final Tips */}
        <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg border border-pink-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-pink-600" />
            Final Preparation Tips
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Physical Preparation:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Pack your hospital bag by 36 weeks</li>
                <li>• Review your birth plan and discuss preferences with your care provider</li>
                <li>• Make sure your partner/support person is prepped and ready</li>
                <li>• Install the car seat and have it checked by a certified technician</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Mental Preparation:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Trust your body — you're almost there!</li>
                <li>• Remember that labor is temporary</li>
                <li>• Stay flexible — birth plans may change</li>
                <li>• Focus on meeting your baby rather than the pain</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Reminder */}
        <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900">Remember</h4>
              <p className="text-amber-800 text-sm mt-1">
                These preparation techniques are tools to help you, but every labor is unique. Don't worry if you 
                can't do everything perfectly or if labor doesn't go according to plan. Your healthcare team is 
                there to support you no matter what happens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};