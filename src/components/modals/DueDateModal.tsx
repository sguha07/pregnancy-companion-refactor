import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

interface DueDateModalProps {
  onClose: () => void;
  onDueDateSet: (date: string) => void;
  currentDueDate: string;
}

export const DueDateModal: React.FC<DueDateModalProps> = ({ 
  onClose, 
  onDueDateSet, 
  currentDueDate 
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(currentDueDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      onDueDateSet(selectedDate);
    }
  };

  // Get today's date for validation (minimum date)
  const today = new Date().toISOString().split('T')[0];
  
  // Get max date (about 10 months from now for reasonable due dates)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 10);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-purple-600" />
            {currentDueDate ? 'Update Due Date' : 'Set Your Due Date'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              When is your baby due?
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              max={maxDateString}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
            <p className="text-xs text-gray-500 mt-2">
              Select your estimated due date to track your pregnancy progress
            </p>
          </div>
          
          {currentDueDate && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Current due date:</strong> {new Date(currentDueDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              {currentDueDate ? 'Update Date' : 'Set Due Date'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};