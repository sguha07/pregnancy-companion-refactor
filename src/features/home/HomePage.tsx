import React from 'react';
import { Baby, Calendar, Pill, Activity, Apple, AlertTriangle } from 'lucide-react';
import { Tab, WeekInfo, Symptom } from '../../types';

interface HomePageProps {
  currentWeek: number;
  dueDate: string;
  weekInfo: WeekInfo | null;
  emergencySymptoms: Symptom[];
  isKbLoaded: boolean;
  setActiveTab: (tab: Tab) => void;
  setShowDueDateModal: (show: boolean) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentWeek,
  dueDate,
  weekInfo,
  emergencySymptoms,
  isKbLoaded,
  setActiveTab,
  setShowDueDateModal
}) => {
  // CRITICAL FIX: Ensure emergencySymptoms is always an array
  const safeEmergencySymptoms = Array.isArray(emergencySymptoms) ? emergencySymptoms : [];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-2">Welcome to Your Pregnancy Journey</h2>
        <p className="text-gray-700">Currently tracking: Week {currentWeek}</p>
        {dueDate && (
          <p className="text-sm text-gray-600 mt-1">
            Due Date: {new Date(dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Baby className="w-8 h-8 text-purple-600" />
            <div>
              <p className="font-semibold">{weekInfo?.title || 'Your Pregnancy Progress'}</p>
              <p className="text-sm text-gray-600">{weekInfo?.trimester || 'First'} Trimester</p>
            </div>
          </div>
          <button
            onClick={() => setShowDueDateModal(true)}
            className="px-3 py-1 text-sm text-purple-600 hover:text-purple-800 underline cursor-pointer"
            type="button"
          >
            Update Due Date
          </button>
        </div>
      </div>

      {!isKbLoaded && (
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <p className="text-sm text-yellow-800">Loading pregnancy knowledge base...</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab('tracker')}
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Calendar className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="font-semibold">Week Tracker</h3>
          <p className="text-sm text-gray-600">Track your progress</p>
        </button>

        <button
          onClick={() => setActiveTab('medications')}
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Pill className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="font-semibold">Medications</h3>
          <p className="text-sm text-gray-600">Check safety</p>
        </button>

        <button
          onClick={() => setActiveTab('symptoms')}
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Activity className="w-8 h-8 text-orange-500 mb-2" />
          <h3 className="font-semibold">Symptoms</h3>
          <p className="text-sm text-gray-600">Track & understand</p>
        </button>

        <button
          onClick={() => setActiveTab('nutrition')}
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Apple className="w-8 h-8 text-red-500 mb-2" />
          <h3 className="font-semibold">Nutrition</h3>
          <p className="text-sm text-gray-600">Daily requirements</p>
        </button>
      </div>

      <div className="bg-red-50 p-4 rounded-xl border border-red-200">
        <h3 className="font-semibold text-red-800 mb-2 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Quick Emergency Reference
        </h3>
        <p className="text-sm text-red-700 mb-2">Seek immediate help for:</p>
        <ul className="text-sm space-y-1">
          {/* CRITICAL FIX: Safe array slicing */}
          {safeEmergencySymptoms.slice(0, 3).map((s, i) => (
            <li key={i} className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>{s.sign}</span>
            </li>
          ))}
          {/* Fallback content when no emergency symptoms are loaded */}
          {safeEmergencySymptoms.length === 0 && (
            <>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Heavy bleeding with clots</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Severe headache with vision changes</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Sudden severe abdominal pain</span>
              </li>
            </>
          )}
        </ul>
        <button 
          onClick={() => setActiveTab('emergency')}
          className="text-red-600 text-sm mt-2 underline"
        >
          View all emergency symptoms →
        </button>
      </div>

      {weekInfo && (
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">This Week: {weekInfo.title}</h3>
          
          {weekInfo.commonSymptoms && weekInfo.commonSymptoms.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">What to Expect:</h4>
              <ul className="space-y-1">
                {weekInfo.commonSymptoms.slice(0, 3).map((symptom: any, i: number) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>{symptom.symptom} - {symptom.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {weekInfo.exercise && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-1">Recommended Exercise:</h4>
              <p className="text-sm text-blue-700">{weekInfo.exercise.name}</p>
              <p className="text-xs text-blue-600 mt-1">{weekInfo.exercise.benefits}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};