import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, Clock, Calendar, CheckCircle, XCircle, Info, Activity, Heart, Thermometer } from 'lucide-react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';
import { Symptom } from '../../types';

interface EnhancedSymptomTrackerProps {
  kb: KnowledgeBaseService;
}

interface SymptomLog {
  id: string;
  symptom: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  notes: string;
  timestamp: Date;
  urgency: string;
  action: string;
}

interface SymptomCategory {
  category: string;
  symptoms: Symptom[];
}

interface UrgencyLevel {
  level: string;
  color: string;
  icon: React.ReactNode;
  description: string;
  timeframe: string;
}

export const EnhancedSymptomTracker: React.FC<EnhancedSymptomTrackerProps> = ({ kb }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Symptom[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [symptomLog, setSymptomLog] = useState<SymptomLog[]>([]);
  const [showLogForm, setShowLogForm] = useState<boolean>(false);
  const [newSymptom, setNewSymptom] = useState<Partial<SymptomLog>>({
    symptom: '',
    severity: 'mild',
    duration: '',
    notes: ''
  });
  const [symptomCategories, setSymptomCategories] = useState<SymptomCategory[]>([]);

  // Urgency level configurations
  const urgencyLevels: Record<string, UrgencyLevel> = {
    'Immediately': {
      level: 'Immediately',
      color: 'red',
      icon: <AlertTriangle className="w-5 h-5" />,
      description: 'Seek emergency medical attention right away',
      timeframe: 'Call 911 or go to ER now'
    },
    'Within 24 hrs': {
      level: 'Within 24 hrs',
      color: 'orange',
      icon: <Clock className="w-5 h-5" />,
      description: 'Contact your healthcare provider within 24 hours',
      timeframe: 'Call provider today'
    },
    'Same day': {
      level: 'Same day',
      color: 'yellow',
      icon: <Calendar className="w-5 h-5" />,
      description: 'Contact your healthcare provider the same day',
      timeframe: 'Call provider today'
    },
    'Next visit': {
      level: 'Next visit',
      color: 'green',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'Discuss at your next scheduled appointment',
      timeframe: 'Mention at next visit'
    }
  };

  // Load symptom data on component mount
  useEffect(() => {
    const knowledgeBase = kb.getKnowledgeBase();
    if (knowledgeBase?.symptomTroubleshooting?.categories) {
      setSymptomCategories(knowledgeBase.symptomTroubleshooting.categories);
    }

    // Load saved symptom log from localStorage
    const savedLog = localStorage.getItem('pregnancySymptomLog');
    if (savedLog) {
      try {
        const parsedLog = JSON.parse(savedLog).map((log: any) => ({
          ...log,
          timestamp: new Date(log.timestamp)
        }));
        setSymptomLog(parsedLog);
      } catch (error) {
        console.error('Error loading symptom log:', error);
      }
    }
  }, [kb]);

  // Save symptom log to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pregnancySymptomLog', JSON.stringify(symptomLog));
  }, [symptomLog]);

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = kb.getSymptomInfo(searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, kb]);

  // Get all available categories for filtering
  const getCategories = (): string[] => {
    const categories = symptomCategories.map(cat => cat.category);
    return ['all', ...categories];
  };

  // Filter symptoms based on selected category
  const getFilteredSymptoms = (): Symptom[] => {
    if (selectedCategory === 'all') {
      return symptomCategories.flatMap(cat => 
        cat.symptoms.map(symptom => ({ ...symptom, category: cat.category }))
      );
    }
    const category = symptomCategories.find(cat => cat.category === selectedCategory);
    return category ? category.symptoms.map(symptom => ({ ...symptom, category: category.category })) : [];
  };

  // Get urgency color class
  const getUrgencyColorClass = (urgency: string): string => {
    const level = urgencyLevels[urgency];
    if (!level) return 'text-gray-600 bg-gray-100';
    
    switch (level.color) {
      case 'red': return 'text-red-700 bg-red-100 border-red-200';
      case 'orange': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'yellow': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'green': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Add symptom to log
  const addSymptomToLog = () => {
    if (!newSymptom.symptom?.trim()) return;

    const logEntry: SymptomLog = {
      id: Date.now().toString(),
      symptom: newSymptom.symptom || '',
      severity: newSymptom.severity || 'mild',
      duration: newSymptom.duration || '',
      notes: newSymptom.notes || '',
      timestamp: new Date(),
      urgency: 'Next visit', // Default urgency
      action: 'Monitor and discuss with provider'
    };

    setSymptomLog(prev => [logEntry, ...prev]);
    setNewSymptom({ symptom: '', severity: 'mild', duration: '', notes: '' });
    setShowLogForm(false);
  };

  // Remove symptom from log
  const removeSymptomFromLog = (id: string) => {
    setSymptomLog(prev => prev.filter(log => log.id !== id));
  };

  // Render symptom card
  const renderSymptomCard = (symptom: Symptom, isSearchResult = false) => {
    const urgency = urgencyLevels[symptom.urgency];

    return (
      <div 
        key={`${symptom.sign}-${symptom.category || 'unknown'}`}
        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{symptom.sign}</h3>
            {symptom.category && (
              <p className="text-sm text-purple-600 mb-2">Category: {symptom.category}</p>
            )}
          </div>
          
          {urgency && (
            <div className={`flex items-center px-3 py-1 rounded-full border ${getUrgencyColorClass(symptom.urgency)}`}>
              {urgency.icon}
              <span className="ml-1 text-sm font-medium">{urgency.level}</span>
            </div>
          )}
        </div>

        {urgency && (
          <div className={`p-3 rounded-lg border mb-3 ${getUrgencyColorClass(symptom.urgency)}`}>
            <p className="text-sm font-medium mb-1">{urgency.description}</p>
            <p className="text-xs">{urgency.timeframe}</p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
          <h4 className="font-semibold text-blue-900 mb-1">Recommended Action:</h4>
          <p className="text-sm text-blue-800">{symptom.action}</p>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Severity: {symptom.severity}</span>
          <button
            onClick={() => setNewSymptom(prev => ({ ...prev, symptom: symptom.sign }))}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Add to Log
          </button>
        </div>
      </div>
    );
  };

  // Render symptom log entry
  const renderLogEntry = (logEntry: SymptomLog) => {
    const severityColors = {
      mild: 'text-green-700 bg-green-100',
      moderate: 'text-yellow-700 bg-yellow-100',
      severe: 'text-red-700 bg-red-100'
    };

    return (
      <div key={logEntry.id} className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{logEntry.symptom}</h4>
            <p className="text-sm text-gray-600">
              {logEntry.timestamp.toLocaleDateString()} at {logEntry.timestamp.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[logEntry.severity]}`}>
              {logEntry.severity}
            </span>
            <button
              onClick={() => removeSymptomFromLog(logEntry.id)}
              className="text-red-600 hover:text-red-800"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {logEntry.duration && (
          <p className="text-sm text-gray-600 mb-2">Duration: {logEntry.duration}</p>
        )}

        {logEntry.notes && (
          <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-2">
            <p className="text-sm text-gray-700">Notes: {logEntry.notes}</p>
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
          <Activity className="w-8 h-8 mr-2 text-purple-600" />
          Enhanced Symptom Tracker
        </h2>
        <p className="text-gray-600">
          Track your pregnancy symptoms, understand when to seek care, and maintain a log for your healthcare provider.
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center mb-4">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold">Search Symptoms</h3>
        </div>
        
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Enter symptom (e.g., nausea, headache, bleeding)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
        </div>

        {searchTerm && searchResults.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Search Results for "{searchTerm}":</h4>
            {searchResults.map(symptom => renderSymptomCard(symptom, true))}
          </div>
        )}

        {searchTerm && searchResults.length === 0 && (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-600">No symptoms found for "{searchTerm}"</p>
            <p className="text-sm text-gray-500 mt-2">
              Try different keywords or browse symptoms by category below.
            </p>
          </div>
        )}
      </div>

      {/* Personal Symptom Log */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-500" />
            Personal Symptom Log
          </h3>
          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {showLogForm ? 'Cancel' : 'Add Symptom'}
          </button>
        </div>

        {showLogForm && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold mb-3">Log New Symptom</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Symptom description"
                value={newSymptom.symptom || ''}
                onChange={(e) => setNewSymptom(prev => ({ ...prev, symptom: e.target.value }))}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={newSymptom.severity || 'mild'}
                onChange={(e) => setNewSymptom(prev => ({ ...prev, severity: e.target.value as 'mild' | 'moderate' | 'severe' }))}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
              >
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
              <input
                type="text"
                placeholder="Duration (e.g., 2 hours, all day)"
                value={newSymptom.duration || ''}
                onChange={(e) => setNewSymptom(prev => ({ ...prev, duration: e.target.value }))}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Additional notes"
                value={newSymptom.notes || ''}
                onChange={(e) => setNewSymptom(prev => ({ ...prev, notes: e.target.value }))}
                className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={addSymptomToLog}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Add to Log
            </button>
          </div>
        )}

        <div className="space-y-3">
          {symptomLog.length > 0 ? (
            symptomLog.map(logEntry => renderLogEntry(logEntry))
          ) : (
            <div className="text-center py-8">
              <Thermometer className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No symptoms logged yet</p>
              <p className="text-sm text-gray-500">Start tracking your symptoms to share with your healthcare provider</p>
            </div>
          )}
        </div>
      </div>

      {/* Browse by Category */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Browse Symptoms by Category</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {getCategories().map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {getFilteredSymptoms().map(symptom => renderSymptomCard(symptom))}
        </div>

        {getFilteredSymptoms().length === 0 && (
          <div className="text-center py-8">
            <Info className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">No symptoms found for the selected category.</p>
          </div>
        )}
      </div>

      {/* Urgency Guidelines */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-500" />
          When to Seek Care
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.values(urgencyLevels).map(level => (
            <div key={level.level} className={`p-4 rounded-lg border ${getUrgencyColorClass(level.level)}`}>
              <div className="flex items-center mb-2">
                {level.icon}
                <span className="ml-2 font-semibold">{level.level}</span>
              </div>
              <p className="text-sm mb-2">{level.description}</p>
              <p className="text-xs font-medium">{level.timeframe}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
            <Info className="w-4 h-4 mr-2" />
            Important Reminders
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Trust your instincts - if something feels wrong, contact your provider</li>
            <li>• Keep a record of symptoms to discuss at appointments</li>
            <li>• Don't hesitate to call with questions or concerns</li>
            <li>• Some symptoms are normal but should still be monitored</li>
            <li>• Always mention new or worsening symptoms to your healthcare team</li>
          </ul>
        </div>
      </div>

      {/* Emergency Warning */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Emergency Symptoms - Seek Immediate Care
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-red-800">
          <ul className="space-y-2">
            <li>• Severe bleeding or gushing fluid</li>
            <li>• Severe abdominal or pelvic pain</li>
            <li>• Persistent vomiting with inability to keep fluids down</li>
            <li>• High fever (102°F or higher)</li>
            <li>• Severe headache with vision changes</li>
          </ul>
          <ul className="space-y-2">
            <li>• Difficulty breathing or chest pain</li>
            <li>• Fainting or dizziness with bleeding</li>
            <li>• Sudden swelling of face, hands, or feet</li>
            <li>• Decreased fetal movement (after 28 weeks)</li>
            <li>• Thoughts of harming yourself or baby</li>
          </ul>
        </div>
        <div className="mt-4 p-3 bg-red-100 rounded border border-red-300">
          <p className="text-red-900 font-semibold">
            If you experience any of these symptoms, call 911 or go to the nearest emergency room immediately.
          </p>
        </div>
      </div>
    </div>
  );
};