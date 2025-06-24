import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { Symptom } from '../../types';

interface EmergencyGuideProps {
  emergencySymptoms: Symptom[];
}

export const EmergencyGuide: React.FC<EmergencyGuideProps> = ({ emergencySymptoms }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center">
          <AlertTriangle className="w-8 h-8 mr-2" />
          Emergency Symptoms Guide
        </h2>
        
        <div className="bg-red-50 p-4 rounded-lg mb-6 border border-red-200">
          <p className="text-red-800 font-semibold mb-2">
            Seek immediate medical attention for any of these symptoms:
          </p>
        </div>

        <div className="space-y-3">
          {emergencySymptoms.map((symptom, i) => (
            <div key={i} className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900">{symptom.sign}</h4>
                  <p className="text-sm text-red-700 mt-1">Category: {symptom.category}</p>
                  <p className="text-sm text-red-700">Action: {symptom.action}</p>
                  <p className="font-medium text-red-800 mt-2">
                    Contact provider: {symptom.urgency}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Emergency Contacts</h3>
          <p className="text-sm text-blue-800">Keep these numbers handy:</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Your OB/GYN: _______________</li>
            <li>• Hospital L&D: _______________</li>
            <li>• Emergency: 911</li>
          </ul>
        </div>
      </div>
    </div>
  );
};