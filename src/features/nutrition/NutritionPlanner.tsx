import React from 'react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';

interface NutritionPlannerProps {
  kb: KnowledgeBaseService;
}

export const NutritionPlanner: React.FC<NutritionPlannerProps> = ({ kb }) => {
  const nutritionalReqs = kb.getNutritionalRequirements();
  const knowledgeBase = kb.getKnowledgeBase();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Nutrition Planner</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Daily Nutritional Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {nutritionalReqs.dailyMacros.map((nutrient, i) => (
              <div key={i} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{nutrient.nutrient}</h4>
                    <p className="text-sm text-gray-600 capitalize">{nutrient.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">{nutrient.amount}</p>
                    <p className="text-sm text-gray-600">{nutrient.unit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {knowledgeBase && (
          <>
            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-red-900 mb-2">Foods to Avoid</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-red-800 mb-1">Unsafe Seafood (High Mercury)</h4>
                  <p className="text-sm text-red-700">
                    {knowledgeBase.foodSafety.seafoodGuidelines.unsafe.join(', ')}
                  </p>
                </div>
                <div className="space-y-2">
                  {knowledgeBase.foodSafety.avoidFoods.map((food: any, i: number) => (
                    <div key={i} className="text-sm">
                      <span className="font-medium text-red-800">{food.item}</span>
                      {food.includes && (
                        <span className="text-red-700"> - includes {food.includes.join(', ')}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Morning Sickness Tips</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-green-800">What to Eat:</p>
                  <p className="text-green-700">{knowledgeBase.morningSicknessManagement.whatToEat.join(', ')}</p>
                </div>
                <div>
                  <p className="font-medium text-green-800">Foods to Avoid:</p>
                  <p className="text-green-700">{knowledgeBase.morningSicknessManagement.avoidFoods.join(', ')}</p>
                </div>
                <div>
                  <p className="font-medium text-green-800">Eating Tips:</p>
                  <ul className="text-green-700 ml-4">
                    {knowledgeBase.morningSicknessManagement.eatingTips.map((tip: string, i: number) => (
                      <li key={i} className="list-disc">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};