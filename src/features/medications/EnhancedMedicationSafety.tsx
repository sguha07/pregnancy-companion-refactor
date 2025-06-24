import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, CheckCircle, XCircle, Info, Pill, Heart, Activity } from 'lucide-react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';
import { Medication } from '../../types';

interface EnhancedMedicationSafetyProps {
  kb: KnowledgeBaseService;
}

interface MedicationCategory {
  condition: string;
  medications: Medication[];
}

interface SafetyLevel {
  level: string;
  color: string;
  icon: React.ReactNode;
  description: string;
}

export const EnhancedMedicationSafety: React.FC<EnhancedMedicationSafetyProps> = ({ kb }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Medication[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [medicationData, setMedicationData] = useState<MedicationCategory[]>([]);

  // Safety level configurations
  const safetyLevels: Record<string, SafetyLevel> = {
    'Generally Safe': {
      level: 'Generally Safe',
      color: 'green',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'Considered safe for use during pregnancy with minimal risk to mother and baby.'
    },
    'Use with Caution': {
      level: 'Use with Caution',
      color: 'yellow',
      icon: <AlertTriangle className="w-5 h-5" />,
      description: 'May be used when benefits outweigh risks. Consult your healthcare provider.'
    },
    'Avoid': {
      level: 'Avoid',
      color: 'red',
      icon: <XCircle className="w-5 h-5" />,
      description: 'Not recommended during pregnancy due to potential risks to mother or baby.'
    }
  };

  // Load medication data on component mount
  useEffect(() => {
    const knowledgeBase = kb.getKnowledgeBase();
    if (knowledgeBase?.medications?.byCondition) {
      setMedicationData(knowledgeBase.medications.byCondition);
    }
  }, [kb]);

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = kb.checkMedicationSafety(searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, kb]);

  // Get all available conditions for filtering
  const getConditions = (): string[] => {
    const conditions = medicationData.map(cat => cat.condition);
    return ['all', ...conditions];
  };

  // Filter medications based on selected category
  const getFilteredMedications = (): Medication[] => {
    if (selectedCategory === 'all') {
      return medicationData.flatMap(cat => 
        cat.medications.map(med => ({ ...med, condition: cat.condition }))
      );
    }
    const category = medicationData.find(cat => cat.condition === selectedCategory);
    return category ? category.medications.map(med => ({ ...med, condition: category.condition })) : [];
  };

  // Get safety color class
  const getSafetyColorClass = (safetyLevel: string): string => {
    const level = safetyLevels[safetyLevel];
    if (!level) return 'text-gray-600 bg-gray-100';
    
    switch (level.color) {
      case 'green': return 'text-green-700 bg-green-100 border-green-200';
      case 'yellow': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'red': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Render medication card
  const renderMedicationCard = (medication: Medication, isSearchResult = false) => {
    const safety = safetyLevels[medication.safetyLevel] || safetyLevels[medication.safety];
    const isExpanded = showDetails === `${medication.drug}-${medication.condition}`;

    return (
      <div 
        key={`${medication.drug}-${medication.condition || 'unknown'}`}
        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{medication.drug}</h3>
            {medication.brand && (
              <p className="text-sm text-gray-600 mb-1">Brand: {medication.brand}</p>
            )}
            {medication.condition && (
              <p className="text-sm text-purple-600 mb-2">Used for: {medication.condition}</p>
            )}
          </div>
          
          <div className={`flex items-center px-3 py-1 rounded-full border ${getSafetyColorClass(medication.safetyLevel || medication.safety)}`}>
            {safety?.icon}
            <span className="ml-1 text-sm font-medium">{safety?.level || medication.safety}</span>
          </div>
        </div>

        {safety && (
          <p className="text-sm text-gray-600 mb-3">{safety.description}</p>
        )}

        {medication.note && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <div className="flex items-start">
              <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
              <p className="text-sm text-blue-800">{medication.note}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowDetails(isExpanded ? null : `${medication.drug}-${medication.condition}`)}
          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
        >
          {isExpanded ? 'Show Less' : 'Show Details'}
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Safety Information</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Safety Level: {medication.safetyLevel || medication.safety}</li>
                  {medication.condition && <li>• Condition: {medication.condition}</li>}
                  {medication.brand && <li>• Common Brand: {medication.brand}</li>}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Important Notes</h4>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Always consult your healthcare provider before taking any medication during pregnancy.</p>
                  <p>Even "safe" medications should be used only when necessary and at the lowest effective dose.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Pill className="w-8 h-8 mr-2 text-purple-600" />
          Enhanced Medication Safety Guide
        </h2>
        <p className="text-gray-600">
          Search for medications and learn about their safety during pregnancy. Always consult your healthcare provider before taking any medication.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center mb-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold">Search Medications</h3>
        </div>
        
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Enter medication name (generic or brand name)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
        </div>

        {searchTerm && searchResults.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Search Results for "{searchTerm}":</h4>
            {searchResults.map(medication => renderMedicationCard(medication, true))}
          </div>
        )}

        {searchTerm && searchResults.length === 0 && (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-600">No medications found for "{searchTerm}"</p>
            <p className="text-sm text-gray-500 mt-2">
              Try searching for the generic name or consult your healthcare provider for unlisted medications.
            </p>
          </div>
        )}
      </div>

      {/* Category Filter and Browse */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Browse by Condition</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {getConditions().map(condition => (
              <option key={condition} value={condition}>
                {condition === 'all' ? 'All Conditions' : condition}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {getFilteredMedications().map(medication => renderMedicationCard(medication))}
        </div>

        {getFilteredMedications().length === 0 && (
          <div className="text-center py-8">
            <Info className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">No medications found for the selected category.</p>
          </div>
        )}
      </div>

      {/* Safety Guidelines */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-red-500" />
          Important Safety Guidelines
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {Object.values(safetyLevels).map(level => (
            <div key={level.level} className={`p-4 rounded-lg border ${getSafetyColorClass(level.level)}`}>
              <div className="flex items-center mb-2">
                {level.icon}
                <span className="ml-2 font-semibold">{level.level}</span>
              </div>
              <p className="text-sm">{level.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            General Recommendations
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Always consult your healthcare provider before taking any medication</li>
            <li>• Use the lowest effective dose for the shortest duration possible</li>
            <li>• Inform all healthcare providers that you're pregnant</li>
            <li>• Keep a list of all medications you're taking</li>
            <li>• Don't stop prescribed medications without consulting your provider</li>
            <li>• Report any unusual symptoms or side effects immediately</li>
          </ul>
        </div>
      </div>

      {/* Emergency Information */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          When to Seek Immediate Help
        </h3>
        <div className="text-sm text-red-800 space-y-2">
          <p>Contact your healthcare provider immediately if you experience:</p>
          <ul className="ml-4 space-y-1">
            <li>• Severe allergic reactions (rash, difficulty breathing, swelling)</li>
            <li>• Unexpected bleeding or spotting</li>
            <li>• Severe nausea, vomiting, or abdominal pain after taking medication</li>
            <li>• Unusual symptoms after starting a new medication</li>
            <li>• Any concerns about medication effects on your pregnancy</li>
          </ul>
        </div>
      </div>
    </div>
  );
};