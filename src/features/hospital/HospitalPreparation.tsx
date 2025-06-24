import React, { useState } from 'react';
import { Package, FileText, Car, Check, Square, Stethoscope } from 'lucide-react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';

interface HospitalPreparationProps {
  kb: KnowledgeBaseService;
}

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
}

export const HospitalPreparation: React.FC<HospitalPreparationProps> = ({ kb }) => {
  const [activeTab, setActiveTab] = useState('bag');
  const [checkedItems, setCheckedItems] = useState(new Set<string>());

  // Get hospital information from knowledge base
  const hospitalInfo = kb.getKnowledgeBase()?.hospitalPreparation;

  // Comprehensive fallback data structure
  const fallbackHospitalInfo = {
    hospitalBag: {
      forMom: [
        "Comfortable pajamas or nightgowns",
        "Comfortable going-home outfit",
        "Underwear (disposable recommended)",
        "Nursing bras",
        "Slippers with good grip",
        "Toiletries and personal items",
        "Phone charger",
        "Insurance cards and ID"
      ],
      forBaby: [
        "Going-home outfit (2 sizes)",
        "Car seat (properly installed)",
        "Blanket for warmth",
        "Hat and mittens",
        "Burp cloths",
        "Pacifiers (if desired)"
      ],
      forPartner: [
        "Change of clothes",
        "Toiletries",
        "Snacks and drinks",
        "Phone charger",
        "Camera for photos",
        "Pillow from home"
      ],
      documents: [
        "Insurance cards",
        "Photo ID",
        "Birth plan copies",
        "Emergency contact list",
        "Pediatrician information",
        "Hospital pre-registration papers"
      ]
    },
    birthPlan: {
      flexibility: "Remember, birth plans are preferences, not requirements. Stay flexible!",
      laborPreferences: [
        "Pain management preferences",
        "Movement and positioning during labor",
        "Who you want present during delivery",
        "Music or lighting preferences",
        "Delayed cord clamping preference"
      ],
      deliveryPreferences: [
        "Episiotomy preferences",
        "Assisted delivery preferences",
        "Immediate skin-to-skin contact",
        "Eye ointment timing for baby",
        "Vitamin K shot preferences"
      ],
      postpartumCare: [
        "Breastfeeding or formula preferences",
        "Rooming-in preferences",
        "Visitor restrictions",
        "Photography permissions",
        "Circumcision decisions (if applicable)"
      ]
    },
    preregistration: [
      "Complete hospital pre-registration by 36 weeks",
      "Confirm insurance coverage and bring cards",
      "Know your hospital's entrance and parking",
      "Pre-pay any estimated costs if possible",
      "Confirm pediatrician hospital privileges"
    ],
    practicalTips: [
      "Pack your hospital bag by 36 weeks",
      "Keep important phone numbers easily accessible", 
      "Do a practice drive to the hospital",
      "Arrange child care for older children",
      "Prepare meals for after coming home",
      "Install and inspect your car seat",
      "Charge all electronic devices before leaving",
      "Bring comfortable slippers with good grip",
      "Pack snacks that you enjoy",
      "Don't pack too much - you won't need everything"
    ]
  };

  // ULTRA-SAFE: Use fallback data if knowledge base data is not available
  const hospitalData = hospitalInfo || fallbackHospitalInfo;

  // ULTRA-SAFE: Create safe accessors with guaranteed arrays
  const safeHospitalBag = {
    forMom: Array.isArray(hospitalData?.hospitalBag?.forMom) 
      ? hospitalData.hospitalBag.forMom 
      : fallbackHospitalInfo.hospitalBag.forMom,
    forBaby: Array.isArray(hospitalData?.hospitalBag?.forBaby) 
      ? hospitalData.hospitalBag.forBaby 
      : fallbackHospitalInfo.hospitalBag.forBaby,
    forPartner: Array.isArray(hospitalData?.hospitalBag?.forPartner) 
      ? hospitalData.hospitalBag.forPartner 
      : fallbackHospitalInfo.hospitalBag.forPartner,
    documents: Array.isArray(hospitalData?.hospitalBag?.documents) 
      ? hospitalData.hospitalBag.documents 
      : fallbackHospitalInfo.hospitalBag.documents
  };

  const safeBirthPlan = {
    flexibility: hospitalData?.birthPlan?.flexibility || fallbackHospitalInfo.birthPlan.flexibility,
    laborPreferences: Array.isArray(hospitalData?.birthPlan?.laborPreferences)
      ? hospitalData.birthPlan.laborPreferences
      : fallbackHospitalInfo.birthPlan.laborPreferences,
    deliveryPreferences: Array.isArray(hospitalData?.birthPlan?.deliveryPreferences)
      ? hospitalData.birthPlan.deliveryPreferences
      : fallbackHospitalInfo.birthPlan.deliveryPreferences,
    postpartumCare: Array.isArray(hospitalData?.birthPlan?.postpartumCare)
      ? hospitalData.birthPlan.postpartumCare
      : fallbackHospitalInfo.birthPlan.postpartumCare
  };

  const safePreregistration = Array.isArray(hospitalData?.preregistration)
    ? hospitalData.preregistration
    : fallbackHospitalInfo.preregistration;

  const safePracticalTips = Array.isArray(hospitalData?.practicalTips)
    ? hospitalData.practicalTips
    : fallbackHospitalInfo.practicalTips;

  // Convert hospital bag items to checklist format using safe data
  const createChecklistItems = (): ChecklistItem[] => {
    const items: ChecklistItem[] = [];
    let id = 0;

    Object.entries(safeHospitalBag).forEach(([category, categoryItems]: [string, any]) => {
      if (Array.isArray(categoryItems)) {
        categoryItems.forEach((item) => {
          items.push({
            id: `${id++}`,
            text: item,
            category: category
          });
        });
      }
    });

    return items;
  };

  const checklistItems = createChecklistItems();

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const getProgress = () => {
    return Math.round((checkedItems.size / checklistItems.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Stethoscope className="w-8 h-8 mr-2 text-purple-600" />
          Hospital Preparation
        </h2>

        {!hospitalInfo && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Using fallback data. Knowledge base may not be fully loaded.
            </p>
          </div>
        )}

        {/* FIXED: Responsive flex wrapping for tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'bag', label: 'Hospital Bag', icon: Package },
            { id: 'plan', label: 'Birth Plan', icon: FileText },
            { id: 'tips', label: 'Practical Tips', icon: Car }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hospital Bag Checklist */}
        {activeTab === 'bag' && (
          <div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Hospital Bag Checklist</h3>
                <span className="text-sm text-gray-600">{getProgress()}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgress()}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(
                checklistItems.reduce((acc, item) => {
                  if (!acc[item.category]) acc[item.category] = [];
                  acc[item.category].push(item);
                  return acc;
                }, {} as Record<string, ChecklistItem[]>)
              ).map(([category, items]) => (
                <div key={category} className="border rounded-lg p-4">
                  <h4 className="font-medium capitalize mb-3">
                    {category === 'forMom' ? 'For Mom' : 
                     category === 'forBaby' ? 'For Baby' : 
                     category === 'forPartner' ? 'For Partner' : 
                     category.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <button
                          type="button"
                          onClick={() => toggleItem(item.id)}
                          className="mr-3"
                        >
                          {checkedItems.has(item.id) ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <span className={`text-sm ${checkedItems.has(item.id) ? 'line-through text-gray-500' : ''}`}>
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setCheckedItems(new Set())}
                className="text-sm text-purple-600 hover:text-purple-800 underline"
              >
                Reset Checklist
              </button>
            </div>
          </div>
        )}

        {/* Birth Plan */}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Creating Your Birth Plan</h3>
              <p className="text-sm text-blue-800 mb-3">{safeBirthPlan.flexibility}</p>
            </div>

            {/* ULTRA-SAFE: Using safe birth plan data with proper null checks */}
            {Object.entries(safeBirthPlan).map(([section, items]: [string, any]) => {
              if (section === 'flexibility' || !Array.isArray(items)) return null;
              return (
                <div key={section} className="border rounded-lg p-4">
                  <h4 className="font-medium capitalize mb-3">
                    {section.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <ul className="space-y-2">
                    {items.map((item: string, i: number) => (
                      <li key={i} className="flex items-start text-sm">
                        <span className="text-purple-600 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* Practical Tips */}
        {activeTab === 'tips' && (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-3">Pre-Registration</h3>
              <ul className="space-y-2 text-sm">
                {/* ULTRA-SAFE: Using safe preregistration array */}
                {safePreregistration.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-4 h-4 mr-2 text-green-600 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-3">Practical Tips</h3>
              <ul className="space-y-2 text-sm">
                {/* ULTRA-SAFE: Using safe practical tips array */}
                {safePracticalTips.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <Car className="w-4 h-4 mr-2 text-purple-600 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Don't Forget!</h4>
              <p className="text-sm text-yellow-800">
                Car seat must be properly installed before leaving the hospital. Many hospitals won't discharge without seeing the car seat properly installed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};