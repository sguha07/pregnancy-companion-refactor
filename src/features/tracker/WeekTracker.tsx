import React from 'react';
import { Baby, Heart } from 'lucide-react';
import { WeekInfo } from '../../types';
import { EnhancedWeek40Plus } from './EnhancedWeek40Plus';

interface WeekTrackerProps {
  currentWeek: number;
  dueDate: string;
  weekInfo: WeekInfo | null;
  kb: any; // KnowledgeBaseService type
}

export const WeekTracker: React.FC<WeekTrackerProps> = ({
  currentWeek,
  dueDate,
  weekInfo,
  kb
}) => {
  // Handle Week 40+ with enhanced component
  if (currentWeek >= 40) {
    return <EnhancedWeek40Plus kb={kb} currentWeek={currentWeek} />;
  }

  // Safely get symptoms array
  const symptoms = weekInfo?.commonSymptoms || [];
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Pregnancy Week Tracker</h2>
        
        <div className="mb-6">
          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <p className="text-purple-900 font-medium">
              Based on your due date: {dueDate ? new Date(dueDate).toLocaleDateString() : 'Not set'}
            </p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              You are currently in Week {currentWeek}
            </p>
          </div>
        </div>

        {weekInfo ? (
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">{weekInfo.title}</h3>
              <p className="text-purple-700">{weekInfo.trimester} Trimester</p>
            </div>

            {symptoms.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Common Symptoms This Week</h4>
                <div className="space-y-2">
                  {symptoms.map((symptom, i) => (
                    <div key={i} className="flex items-start bg-gray-50 p-3 rounded-lg">
                      <Heart className="w-5 h-5 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{symptom.symptom}</p>
                        <p className="text-sm text-gray-600">{symptom.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {weekInfo.exercise && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Recommended Exercise: {weekInfo.exercise.name}
                </h4>
                <p className="text-sm text-blue-700 mb-2">{weekInfo.exercise.benefits}</p>
                {weekInfo.exercise.instructions && (
                  <div>
                    <h5 className="font-medium text-blue-900 mb-2">How to do it:</h5>
                    <ul className="text-sm space-y-1">
                      {weekInfo.exercise.instructions.map((inst, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {inst}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Additional week-specific guidance */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">This Week's Focus</h4>
              <div className="text-sm text-green-800 space-y-1">
                {currentWeek <= 12 && (
                  <>
                    <p>• Focus on prenatal vitamins and healthy eating</p>
                    <p>• Schedule your first prenatal appointment if you haven't already</p>
                    <p>• Begin thinking about lifestyle adjustments</p>
                  </>
                )}
                {currentWeek > 12 && currentWeek <= 24 && (
                  <>
                    <p>• Consider announcing your pregnancy to family and friends</p>
                    <p>• Schedule your anatomy scan (usually around 18-20 weeks)</p>
                    <p>• Start thinking about baby names and nursery planning</p>
                  </>
                )}
                {currentWeek > 24 && currentWeek <= 32 && (
                  <>
                    <p>• Begin childbirth education classes</p>
                    <p>• Start thinking about your birth plan</p>
                    <p>• Consider baby gear research and registry creation</p>
                  </>
                )}
                {currentWeek > 32 && currentWeek < 40 && (
                  <>
                    <p>• Pack your hospital bag</p>
                    <p>• Install the car seat and have it checked</p>
                    <p>• Practice relaxation and breathing techniques</p>
                    <p>• Finalize your birth plan and discuss with your provider</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Baby className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Detailed information for week {currentWeek} coming soon!</p>
            <p className="text-sm mt-2">Check back as we continue to expand our week-by-week guidance.</p>
          </div>
        )}
      </div>
    </div>
  );
};