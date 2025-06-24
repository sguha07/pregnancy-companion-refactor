import React, { useState } from 'react';
import { HelpCircle, Clock, Heart, Users, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface LaborFAQProps {
  kb: any; // KnowledgeBaseService type
}

interface FAQItem {
  question: string;
  answer: string;
  details?: string;
  category: string;
}

export const EnhancedLaborFAQ: React.FC<LaborFAQProps> = ({ kb }) => {
  const [activeCategory, setActiveCategory] = useState<string>('practical');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const categories = [
    { id: 'practical', label: 'Practical Questions', icon: HelpCircle },
    { id: 'labor', label: 'Labor Process', icon: Clock },
    { id: 'comfort', label: 'Comfort & Support', icon: Heart },
    { id: 'medical', label: 'Medical Concerns', icon: AlertCircle }
  ];

  const faqData: FAQItem[] = [
    // Practical Questions
    {
      question: "What if I have to go to the bathroom during labor?",
      answer: "Totally normal and encouraged",
      details: "Your care team may help with a bedpan or catheter if needed. A full bladder can actually slow labor, so it's important to urinate regularly. Don't be embarrassed - your medical team has seen it all and wants to help you stay comfortable.",
      category: "practical"
    },
    {
      question: "Will my pubic hair be shaved?",
      answer: "Nope, not anymore",
      details: "Shaving used to be routine but isn't necessary now. Research showed it doesn't reduce infection rates. No need to shave at home either - come as you are! Your comfort is what matters most.",
      category: "practical"
    },
    {
      question: "Will I be exposed in front of strangers?",
      answer: "Only as needed, and always respectfully",
      details: "Vaginal exams and newborn checks may happen, but your privacy is respected. You control who else is in the room besides essential medical staff. Medical professionals are used to this and maintain your dignity throughout.",
      category: "practical"
    },
    {
      question: "What if I make loud noises?",
      answer: "Completely okay — and expected",
      details: "Grunting, moaning, or yelling is part of the process. No one will judge — it's a workout! Making noise can actually help you cope with contractions. Your care team expects this and won't be surprised.",
      category: "practical"
    },
    // Labor Process Questions
    {
      question: "How do I know if it's true labor vs. false labor?",
      answer: "True labor contractions are regular, get stronger, and don't stop with movement",
      details: "True labor: Regular pattern, grow closer together, 30-60 seconds long, get stronger over time, don't stop when you move. False labor (Braxton Hicks): Irregular, don't get closer, vary in length, usually mild, often stop if you walk or change positions.",
      category: "labor"
    },
    {
      question: "When should I go to the hospital?",
      answer: "Follow the 5-1-1 rule for first-time moms",
      details: "Contractions every 5 minutes, lasting 1 minute each, for 1 hour. If you've had babies before, go sooner. Also go immediately if your water breaks, you have heavy bleeding, or severe pain.",
      category: "labor"
    },
    {
      question: "What happens if my water breaks at home?",
      answer: "Call your provider immediately and note the details",
      details: "Note the time, amount (gush or trickle), color, and smell. Clear or slightly pink fluid is normal. Green, brown, or foul-smelling fluid requires immediate medical attention. Don't use tampons or have intercourse after your water breaks.",
      category: "labor"
    },
    {
      question: "How long will labor last?",
      answer: "It varies widely, but first babies typically take longer",
      details: "First-time moms: Average 12-20 hours total, with pushing lasting 1-3 hours. Subsequent babies: Often shorter, 6-8 hours total. Every labor is different - some are faster, some slower. Your care team will monitor progress.",
      category: "labor"
    },
    // Comfort & Support Questions
    {
      question: "Can my partner stay with me the whole time?",
      answer: "Usually yes, including during a C-section",
      details: "Most hospitals encourage partner support throughout labor and delivery. During a C-section, your partner can typically stay by your head. Check your hospital's specific policies, especially regarding visiting restrictions.",
      category: "comfort"
    },
    {
      question: "What if I change my mind about pain medication?",
      answer: "That's completely normal and okay",
      details: "Your birth plan is flexible. You can ask for pain relief even if you planned to go without, or decline it if you originally wanted it. There's no 'right' way - only what feels right for you in the moment.",
      category: "comfort"
    },
    {
      question: "Can I eat during labor?",
      answer: "Policies vary, but light snacks are often allowed in early labor",
      details: "Many hospitals now allow light foods like toast, crackers, or fruit in early labor. Clear liquids are usually fine throughout. Ice chips are typically always available. Check your hospital's policy and discuss with your provider.",
      category: "comfort"
    },
    {
      question: "What if I feel like I'm not coping well?",
      answer: "Tell your care team immediately - they're there to help",
      details: "Labor is intense, and feeling overwhelmed is normal. Your nurses and providers have many tools to help: position changes, breathing techniques, massage, pain medication, or just emotional support. Never hesitate to speak up.",
      category: "comfort"
    },
    // Medical Concerns
    {
      question: "Does labor hurt my baby?",
      answer: "Unlikely — babies are built for this",
      details: "Your baby's heartbeat may slow slightly during contractions, but this is normal. Babies are designed to handle the journey through the birth canal. The squeezing actually helps prepare their lungs for breathing air.",
      category: "medical"
    },
    {
      question: "What if there's an emergency during delivery?",
      answer: "Your medical team is prepared for all scenarios",
      details: "While emergencies are rare, your care team trains constantly for them. They have protocols for cord prolapse, shoulder dystocia, bleeding, and other complications. Trust that they'll act quickly and explain what's happening when possible.",
      category: "medical"
    },
    {
      question: "Will I need an episiotomy?",
      answer: "They're much less common now and only done when medically necessary",
      details: "Most women don't need episiotomies. Providers now prefer to let natural tearing occur (which heals better) or use techniques to prevent tearing altogether, like perineal massage and controlled delivery.",
      category: "medical"
    },
    {
      question: "What if my baby's heart rate drops?",
      answer: "Your team will take immediate action",
      details: "Occasional dips in baby's heart rate during contractions are normal. If it becomes concerning, your team might change your position, give you oxygen, give IV fluids, or recommend delivery. Continuous monitoring helps catch any issues early.",
      category: "medical"
    },
    {
      question: "What happens right after the baby is born?",
      answer: "Focus is on you, baby, and bonding",
      details: "Baby will be placed on your chest for skin-to-skin contact if possible. Apgar scores are taken at 1 and 5 minutes. The umbilical cord is clamped and cut. You'll deliver the placenta. Any tears are repaired. First breastfeeding often happens within the first hour.",
      category: "medical"
    }
  ];

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqData.filter(faq => faq.category === activeCategory);

  const renderFAQList = () => (
    <div className="space-y-4">
      {filteredFAQs.map((faq, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <button
            onClick={() => toggleExpanded(index)}
            className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
              {expandedItems.has(index) ? (
                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </div>
          </button>
          
          {expandedItems.has(index) && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="pt-4">
                <div className="bg-green-50 p-3 rounded-lg mb-3">
                  <p className="font-medium text-green-900 text-sm flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    {faq.answer}
                  </p>
                </div>
                {faq.details && (
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.details}</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <HelpCircle className="w-8 h-8 mr-2 text-purple-600" />
          Labor & Delivery FAQ
        </h2>

        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <p className="text-purple-800 text-sm">
            <strong>Common questions about labor and delivery.</strong> Remember, every birth experience is unique. 
            These answers provide general guidance, but always discuss your specific situation with your healthcare provider.
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
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        {renderFAQList()}

        {/* Contact Provider Note */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">When in Doubt, Ask</h4>
              <p className="text-blue-800 text-sm mt-1">
                Don't hesitate to ask your healthcare provider any questions you have. They're there to support you 
                and want you to feel informed and comfortable throughout your pregnancy and labor experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};